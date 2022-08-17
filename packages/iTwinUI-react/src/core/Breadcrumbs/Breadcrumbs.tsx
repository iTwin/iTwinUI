/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme, CommonProps, useMergedRefs, useOverflow } from '../utils';
import SvgChevronRight from '@itwin/itwinui-icons-react/cjs/icons/ChevronRight';
import '@itwin/itwinui-css/css/breadcrumbs.css';

export type BreadcrumbsProps = {
  /**
   * Index of the currently active breadcrumb.
   * Defaults to the index of the last breadcrumb item.
   */
  currentIndex?: number;
  /**
   * Breadcrumb items.
   */
  children: React.ReactNode[];
  /**
   * Specify a custom separator element to show between breadcrumb items.
   * Defaults to the `SvgChevronRight` icon.
   */
  separator?: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * A breadcrumb trail is used as a navigational aid to help users keep track
 * of their place in the application. It is often placed before a page's main content.
 *
 * Breadcrumb items can use `Button` or `a` or any custom component (passed as `children`).
 *
 * For accessibility, make sure to provide an aria-label describing the type of navigation.
 *
 * @example
 * <Breadcrumbs aria-label='Primary'>
 *   <Button onClick={() => {}}>Root</Button>
 *   <Button onClick={() => {}}>Item 1</Button>
 *   <Button onClick={() => {}}>Item 2</Button>
 * </Breadcrumbs>
 *
 * @example
 * <Breadcrumbs aria-label='Secondary'>
 *   <a href='/'>Root</a>
 *   <a href='/level1/'>Level 1</a>
 *   <span>Current level</span>
 * </Breadcrumbs>
 */
export const Breadcrumbs = React.forwardRef(
  (props: BreadcrumbsProps, ref: React.RefObject<HTMLElement>) => {
    const {
      children: items,
      currentIndex = items.length - 1,
      separator,
      className,
      ...rest
    } = props;

    useTheme();

    const [overflowRef, visibleCount] = useOverflow(items);
    const refs = useMergedRefs(overflowRef, ref);

    return (
      <nav
        className={cx('iui-breadcrumbs', className)}
        ref={refs}
        aria-label='Breadcrumb'
        {...rest}
      >
        <ol className='iui-breadcrumbs-list'>
          {visibleCount > 1 && (
            <>
              <ListItem item={items[0]} isActive={currentIndex === 0} />
              <Separator separator={separator} />
            </>
          )}
          {items.length - visibleCount > 0 && (
            <>
              <li className='iui-breadcrumbs-item iui-breadcrumbs-item-overrides'>
                <span className='iui-breadcrumbs-text'>…</span>
              </li>
              <Separator separator={separator} />
            </>
          )}
          {items
            .slice(
              visibleCount > 1
                ? items.length - visibleCount + 1
                : items.length - 1,
            )
            .map((_, _index) => {
              const index =
                visibleCount > 1
                  ? 1 + (items.length - visibleCount) + _index
                  : items.length - 1;
              return (
                <React.Fragment key={index}>
                  <ListItem
                    item={items[index]}
                    isActive={currentIndex === index}
                  />
                  {index < items.length - 1 && (
                    <Separator separator={separator} />
                  )}
                </React.Fragment>
              );
            })}
        </ol>
      </nav>
    );
  },
);

const ListItem = ({
  item,
  isActive,
}: {
  item: React.ReactNode;
  isActive: boolean;
}) => {
  return (
    <li className={'iui-breadcrumbs-item iui-breadcrumbs-item-overrides'}>
      {React.isValidElement(item)
        ? React.cloneElement(item, {
            'aria-current':
              item.props['aria-current'] ?? isActive ? 'location' : undefined,
          })
        : item}
    </li>
  );
};

const Separator = ({ separator }: Pick<BreadcrumbsProps, 'separator'>) => (
  <li className='iui-breadcrumbs-separator' aria-hidden>
    {separator ?? <SvgChevronRight />}
  </li>
);

export default Breadcrumbs;

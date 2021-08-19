/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme } from '../utils/hooks/useTheme';
import { CommonProps } from '../utils/props';
import SvgChevronRight from '@itwin/itwinui-icons-react/cjs/icons/ChevronRight';
import '@itwin/itwinui-css/css/breadcrumbs.css';
import { useMergedRefs } from '../utils/hooks/useMergedRefs';
import { useOverflow } from '../utils/hooks/useOverflow';

export type BreadcrumbsProps = {
  /**
   * Index of the currently active breadcrumb.
   * Defaults to the index of the last breadcrumb item.
   */
  currentIndex?: number;
  /**
   * Breadcrumb items.
   */
  children: React.ReactNodeArray;
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

    const Separator = () => (
      <li className='iui-breadcrumbs-separator' aria-hidden>
        {separator ?? <SvgChevronRight />}
      </li>
    );

    const ListItem = ({ index }: { index: number }) => {
      const item = items[index];
      return (
        <li
          className={cx('iui-breadcrumbs-item', {
            'iui-current': currentIndex === index,
          })}
        >
          {React.isValidElement(item)
            ? React.cloneElement(item, {
                'aria-current':
                  item.props['aria-current'] ?? currentIndex === index
                    ? 'location'
                    : undefined,
              })
            : item}
        </li>
      );
    };

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
              <ListItem index={0} />
              <Separator />
            </>
          )}
          {items.length - visibleCount > 0 && (
            <>
              <li className='iui-breadcrumbs-item'>
                <span className='iui-ellipsis'>…</span>
              </li>
              <Separator />
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
                  <ListItem index={index} />
                  {index < items.length - 1 && <Separator />}
                </React.Fragment>
              );
            })}
        </ol>
      </nav>
    );
  },
);

export default Breadcrumbs;

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  useTheme,
  CommonProps,
  useMergedRefs,
  useOverflow,
  SvgChevronRight,
} from '../utils';
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
  /**
   * If specified, this prop will be used to show a custom button when overflow happens,
   * i.e. when there is not enough space to fit all the breadcrumbs.
   *
   * Expects a function that takes the number of items that are visible
   * and returns the `ReactNode` to render.
   *
   * @example <caption>Uses the overflow button to redirect to the previous breadcrumb</caption>
   *  <Breadcrumbs
   *    overflowButton={(visibleCount: number) => {
   *      const previousBreadcrumb = visibleCount > 1 ? items.length - visibleCount : items.length - 2;
   *      return (
   *        <Tooltip content={`Item ${previousBreadcrumb}`} placement='bottom'>
   *          <IconButton
   *            onClick={() => {
   *              // click on "previousBreadcrumb"
   *            }}
   *          >
   *            <SvgMoreSmall />
   *          </IconButton>
   *        </Tooltip>
   *      );
   *    }}
   *  >
   *    {items}
   *  </Breadcrumbs>
   *
   * @example <caption>Uses the overflow button to add a dropdown that contains hidden breadcrumbs</caption>
   *  <Breadcrumbs
   *    overflowButton={(visibleCount) => (
   *      <DropdownMenu
   *        menuItems={(close) =>
   *          Array(items.length - visibleCount)
   *            .fill(null)
   *            .map((_, _index) => {
   *              const index = visibleCount > 1 ? _index + 1 : _index;
   *              const onClick = () => {
   *                // click on "index" breadcrumb
   *                close();
   *              };
   *              return (
   *                <MenuItem key={index} onClick={onClick}>
   *                  Item {index}
   *                </MenuItem>
   *              );
   *            })
   *        }
   *      >
   *        <IconButton>
   *          <SvgMoreSmall />
   *        </IconButton>
   *      </DropdownMenu>
   *    )}
   *  >
   *    {items}
   *  </Breadcrumbs>
   */
  overflowButton?: (visibleCount: number) => React.ReactNode;
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
      overflowButton,
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
                {overflowButton ? (
                  overflowButton(visibleCount)
                ) : (
                  <span className='iui-breadcrumbs-text'>…</span>
                )}
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

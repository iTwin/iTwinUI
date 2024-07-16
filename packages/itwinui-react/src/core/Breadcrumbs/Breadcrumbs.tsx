/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import {
  useMergedRefs,
  useOverflow,
  SvgChevronRight,
  Box,
  createWarningLogger,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Button } from '../Buttons/Button.js';
import { Anchor } from '../Typography/Anchor.js';

const logWarning = createWarningLogger();

type BreadcrumbsProps = {
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
};

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
const BreadcrumbsComponent = React.forwardRef((props, ref) => {
  const {
    children: items,
    currentIndex = items.length - 1,
    separator,
    overflowButton,
    className,
    ...rest
  } = props;

  const [overflowRef, visibleCount] = useOverflow(items);
  const refs = useMergedRefs(overflowRef, ref);

  return (
    <Box
      as='nav'
      className={cx('iui-breadcrumbs', className)}
      ref={refs}
      aria-label='Breadcrumb'
      {...rest}
    >
      <Box as='ol' className='iui-breadcrumbs-list'>
        {visibleCount > 1 && (
          <>
            <ListItem item={items[0]} isActive={currentIndex === 0} />
            <Separator separator={separator} />
          </>
        )}
        {items.length - visibleCount > 0 && (
          <>
            <Box as='li' className='iui-breadcrumbs-item'>
              {overflowButton ? (
                overflowButton(visibleCount)
              ) : (
                <Box as='span' className='iui-breadcrumbs-content'>
                  …
                </Box>
              )}
            </Box>
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
      </Box>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'nav', BreadcrumbsProps>;
if (process.env.NODE_ENV === 'development') {
  BreadcrumbsComponent.displayName = 'Breadcrumbs';
}

// ----------------------------------------------------------------------------

const ListItem = ({
  item,
  isActive,
}: {
  item: React.ReactNode;
  isActive: boolean;
}) => {
  let children = item as any;

  if (
    children?.type === 'span' ||
    children?.type === 'a' ||
    children?.type === Button
  ) {
    if (process.env.NODE_ENV === 'development') {
      logWarning(
        'Directly using Button/a/span as Breadcrumbs children is deprecated, please use `Breadcrumbs.Item` instead.',
      );
    }
    children = <BreadcrumbsItem {...children.props} />;
  }

  return (
    <Box as='li' className={'iui-breadcrumbs-item'}>
      {children &&
        React.cloneElement(children, {
          'aria-current':
            children.props['aria-current'] ?? isActive ? 'location' : undefined,
        })}
    </Box>
  );
};

// ----------------------------------------------------------------------------

const Separator = ({ separator }: Pick<BreadcrumbsProps, 'separator'>) => (
  <Box as='li' className='iui-breadcrumbs-separator' aria-hidden>
    {separator ?? <SvgChevronRight />}
  </Box>
);

// ----------------------------------------------------------------------------

const BreadcrumbsItem = React.forwardRef((props, forwardedRef) => {
  const { as: asProp, ...rest } = props;

  const commonProps = {
    ...rest,
    className: cx('iui-breadcrumbs-content', props.className),
    ref: forwardedRef,
  };

  if (
    String(asProp) === 'span' ||
    (props.href == null && props.onClick == null && asProp == null)
  ) {
    return <Box as='span' {...commonProps} />;
  }

  return (
    <Button
      as={
        (asProp === 'a' || (asProp == null && !!props.href)
          ? Anchor
          : asProp) as any
      }
      styleType='borderless'
      {...commonProps}
    />
  );
}) as PolymorphicForwardRefComponent<'a'>;
if (process.env.NODE_ENV === 'development') {
  BreadcrumbsItem.displayName = 'Breadcrumbs.Item';
}

// ----------------------------------------------------------------------------

export const Breadcrumbs = Object.assign(BreadcrumbsComponent, {
  /**
   * Breadcrumbs item subcomponent
   *
   * @example
   * <Breadcrumbs.Item>Breadcrumb Item Title</Breadcrumbs.Item>
   *
   * @example
   * <Breadcrumbs.Item href='https://www.example.com/'>Breadcrumb Anchor Title</Breadcrumbs.Item>
   *
   * @example
   * <Breadcrumbs.Item onClick={() => {}}><SvgCalendar /></Breadcrumbs.Item>
   */
  Item: BreadcrumbsItem,
});

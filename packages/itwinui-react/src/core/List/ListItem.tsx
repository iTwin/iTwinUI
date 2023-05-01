/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme } from '../utils';
import type {
  PolymorphicForwardRefComponent,
  PolymorphicComponentProps,
} from '../utils';
import '@itwin/itwinui-css/css/menu.css';

const ListItemComponent = React.forwardRef((props, ref) => {
  const {
    as: Element = 'li',
    size = 'default',
    disabled = false,
    active = false,
    actionable = false,
    focused = false,
    className,
    ...rest
  } = props;

  useTheme();

  return (
    <Element
      className={cx('iui-list-item', className)}
      data-iui-active={active ? 'true' : undefined}
      data-iui-disabled={disabled ? 'true' : undefined}
      data-iui-size={size === 'large' ? 'large' : undefined}
      data-iui-actionable={actionable ? 'true' : undefined}
      data-iui-focused={focused ? 'true' : undefined}
      tabIndex={disabled ? undefined : -1}
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'li', ListItemOwnProps>;

type ListItemOwnProps = {
  /**
   * Size of the ListItem. Can be explicitly specified to be 'large',
   * but if a description is included in addition to the label, then
   * it will automatically become large.
   */
  size?: 'default' | 'large';
  /**
   * If true, the ListItem has disabled (dimmed) styling.
   */
  disabled?: boolean;
  /**
   * If true, the ListItem has active (selected) styling.
   */
  active?: boolean;
  /**
   * If true, the ListItem will get actionable styling, such as hover styling and cursor.
   */
  actionable?: boolean;
  /**
   * If true, the ListItem has focus styling.
   *
   * By default, focus styling is automatically applied if the item is
   * focused, or if the item contains a `LinkAction` and it is focused.
   * This prop is useful for custom focus management (e.g. using `aria-activedescendant`).
   */
  focused?: boolean;
  /**
   * Callback function that handles click and keyboard actions.
   */
  onClick?: (value?: unknown) => void;
};

// ----------------------------------------------------------------------------

const ListItemIcon = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, ...rest } = props;

  return (
    <Element
      className={cx('iui-list-item-icon', className)}
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', ListItemIconOwnProps>;

type ListItemIconOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

// ----------------------------------------------------------------------------

const ListItemContent = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, ...rest } = props;

  return (
    <Element
      className={cx('iui-list-item-content', className)}
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', ListItemContentOwnProps>;

type ListItemContentOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

// ----------------------------------------------------------------------------

const ListItemDescription = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, ...rest } = props;

  return (
    <Element
      className={cx('iui-list-item-description', className)}
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', ListItemDescriptionOwnProps>;

type ListItemDescriptionOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

// ----------------------------------------------------------------------------
// Exported compound component

/**
 * A generic ListItem component that can be used simply for displaying data, or as a base
 * for the list items in a more complex component (e.g. a custom Select).
 *
 * Includes support for left/right icons, multiple lines of text, and hover/focus/active/disabled styling.
 *
 * @example
 * <List>
 *   <ListItem>item 1</ListItem>
 *   <ListItem>item 2</ListItem>
 *   <ListItem>item 3</ListItem>
 * </List>
 */
export const ListItem = Object.assign(ListItemComponent, {
  /**
   * Icon to be placed at the beginning or end of the ListItem.
   */
  Icon: ListItemIcon,
  /**
   * Wrapper for the main content of the ListItem.
   *
   * For basic list items, this wrapper is not needed, but it can be useful for two cases:
   * - When using an end icon. The `ListItem.Content` will fill the available space
   *   and push the icon to the end
   * - When using `ListItem.Description`.
   */
  Content: ListItemContent,
  /**
   * Description to be used in addition to the main label of the ListItem.
   * Should be used as a child of `ListItem.Content`.
   *
   * @example
   * <ListItem>
   *  <ListItem.Content>
   *   <div>some list item</div>
   *   <ListItem.Description>description for this item</ListItem.Description>
   *  </ListItem.Content>
   * </ListItem>
   */
  Description: ListItemDescription,
});

export type ListItemProps = PolymorphicComponentProps<'li', ListItemOwnProps>;
export type ListItemIconProps = PolymorphicComponentProps<
  'li',
  ListItemIconOwnProps
>;
export type ListItemContentProps = PolymorphicComponentProps<
  'li',
  ListItemContentOwnProps
>;
export type ListItemDescriptionProps = PolymorphicComponentProps<
  'li',
  ListItemDescriptionOwnProps
>;

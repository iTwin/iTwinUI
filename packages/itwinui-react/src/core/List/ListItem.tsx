/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { useTheme, Box } from '../utils/index.js';
import type {
  PolymorphicForwardRefComponent,
  PolymorphicComponentProps,
} from '../utils/index.js';
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
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'li', ListItemOwnProps>;
ListItemComponent.displayName = 'ListItem';

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
};

// ----------------------------------------------------------------------------

const ListItemIcon = Box('iui-list-item-icon');

// ----------------------------------------------------------------------------

const ListItemContent = Box('iui-list-item-content');

// ----------------------------------------------------------------------------

const ListItemDescription = Box('iui-list-item-description');

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

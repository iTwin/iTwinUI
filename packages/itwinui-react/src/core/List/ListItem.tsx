/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { polymorphic, Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { LinkAction } from '../LinkAction/LinkAction.js';

const ListItemComponent = React.forwardRef((props, ref) => {
  const {
    size = 'default',
    disabled = false,
    active = false,
    actionable = false,
    focused = false,
    className,
    ...rest
  } = props;

  return (
    <Box
      role='listitem'
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
}) as PolymorphicForwardRefComponent<'div', ListItemOwnProps>;
if (process.env.NODE_ENV === 'development') {
  ListItemComponent.displayName = 'ListItem';
}

export type ListItemOwnProps = {
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

const ListItemIcon = polymorphic.div('iui-list-item-icon');
if (process.env.NODE_ENV === 'development') {
  ListItemIcon.displayName = 'ListItem.Icon';
}

// ----------------------------------------------------------------------------

const ListItemContent = polymorphic.div('iui-list-item-content');
if (process.env.NODE_ENV === 'development') {
  ListItemContent.displayName = 'ListItem.Content';
}

// ----------------------------------------------------------------------------

const ListItemDescription = polymorphic.div('iui-list-item-description');
if (process.env.NODE_ENV === 'development') {
  ListItemDescription.displayName = 'ListItem.Description';
}

// ----------------------------------------------------------------------------

const ListItemAction = LinkAction;
if (process.env.NODE_ENV === 'development') {
  ListItemAction.displayName = 'ListItem.Action';
}

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
  /**
   * Wrapper over [LinkAction](https://itwinui.bentley.com/docs/linkaction) which allows rendering a link inside a ListItem.
   * This ensures that clicking anywhere on the ListItem will trigger the link.
   *
   * @example
   * <ListItem>
   *  <ListItem.Action href='https://example.com'>Example link</ListItem.Action>
   * </ListItem>
   */
  Action: ListItemAction,
});

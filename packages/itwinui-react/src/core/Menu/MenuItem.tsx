/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Popover, useMergedRefs, SvgCaretRightSmall } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { Menu } from './Menu.js';
import { ListItem } from '../List/ListItem.js';
import type { ListItemOwnProps } from '../List/ListItem.js';

/**
 * Context used to provide menu item ref to sub-menu items.
 */
const MenuItemContext = React.createContext<{
  ref: React.RefObject<HTMLElement> | undefined;
}>({ ref: undefined });

export type MenuItemProps = {
  /**
   * Item is selected.
   */
  isSelected?: boolean;
  /**
   * Item is disabled.
   */
  disabled?: boolean;
  /**
   * Value of the item.
   */
  value?: unknown;
  /**
   * Callback function that handles click and keyboard submit actions.
   */
  onClick?: (value?: unknown) => void;
  /**
   * Modify height of the item.
   * Use 'large' when any of the sibling items have `sublabel`.
   *
   * Defaults to 'large' if `sublabel` provided, otherwise 'default'.
   */
  size?: 'default' | 'large';
  /**
   * Sub label shown below the main content of the item.
   */
  sublabel?: React.ReactNode;
  /**
   * SVG icon component shown on the left.
   */
  startIcon?: JSX.Element;
  /**
   * @deprecated Use startIcon.
   * SVG icon component shown on the left.
   */
  icon?: JSX.Element;
  /**
   * SVG icon component shown on the right.
   */
  endIcon?: JSX.Element;
  /**
   * @deprecated Use endIcon
   * SVG icon component shown on the right.
   */
  badge?: JSX.Element;
  /**
   * ARIA role. For menu item use 'menuitem', for select item use 'option'.
   * @default 'menuitem'
   */
  role?: string;
  /**
   * Items to be shown in the submenu when hovered over the item.
   */
  subMenuItems?: JSX.Element[];
  /**
   * Content of the menu item.
   */
  children?: React.ReactNode;
} & Pick<ListItemOwnProps, 'focused'>;

/**
 * Basic menu item component. Should be used inside `Menu` component for each item.
 */
export const MenuItem = React.forwardRef((props, ref) => {
  const {
    children,
    isSelected,
    disabled,
    value,
    onClick,
    sublabel,
    size = !!sublabel ? 'large' : 'default',
    startIcon: startIconProp,
    icon,
    endIcon: endIconProp,
    badge,
    role = 'menuitem',
    subMenuItems = [],
    ...rest
  } = props;

  const menuItemRef = React.useRef<HTMLElement>(null);
  const refs = useMergedRefs(menuItemRef, ref);

  const { ref: parentMenuItemRef } = React.useContext(MenuItemContext);

  const subMenuRef = React.useRef<HTMLDivElement>(null);

  const [isSubmenuVisible, setIsSubmenuVisible] = React.useState(false);

  const startIcon = startIconProp ?? icon;
  const endIcon = endIconProp ?? badge;

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.altKey) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'Spacebar': {
        !disabled && onClick?.(value);
        event.preventDefault();
        break;
      }
      case 'ArrowRight': {
        if (subMenuItems.length > 0) {
          setIsSubmenuVisible(true);
          event.preventDefault();
          event.stopPropagation();
        }
        break;
      }
      case 'ArrowLeft': {
        parentMenuItemRef?.current?.focus();
        event.stopPropagation();
        event.preventDefault();
        break;
      }
      default:
        break;
    }
  };

  const listItem = (
    <ListItem
      as='div'
      actionable
      size={size}
      active={isSelected}
      disabled={disabled}
      onClick={() => !disabled && onClick?.(value)}
      ref={refs}
      role={role}
      tabIndex={disabled || role === 'presentation' ? undefined : -1}
      aria-selected={isSelected}
      aria-haspopup={subMenuItems.length > 0}
      aria-disabled={disabled}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsSubmenuVisible(true)}
      onMouseLeave={(e) => {
        if (
          !(e.relatedTarget instanceof Node) ||
          !subMenuRef.current?.contains(e.relatedTarget as Node)
        ) {
          setIsSubmenuVisible(false);
        }
      }}
      {...rest}
    >
      {startIcon && (
        <ListItem.Icon as='span' aria-hidden>
          {startIcon}
        </ListItem.Icon>
      )}
      <ListItem.Content>
        <div>{children}</div>
        {sublabel && <ListItem.Description>{sublabel}</ListItem.Description>}
      </ListItem.Content>
      {!endIcon && subMenuItems.length > 0 && (
        <ListItem.Icon as='span' aria-hidden>
          <SvgCaretRightSmall />
        </ListItem.Icon>
      )}
      {endIcon && (
        <ListItem.Icon as='span' aria-hidden>
          {endIcon}
        </ListItem.Icon>
      )}
    </ListItem>
  );

  return subMenuItems.length === 0 ? (
    listItem
  ) : (
    <MenuItemContext.Provider value={{ ref: menuItemRef }}>
      <Popover
        placement='right-start'
        visible={isSubmenuVisible}
        appendTo='parent'
        content={
          <div
            onMouseLeave={() => setIsSubmenuVisible(false)}
            onBlur={(e) => {
              !!(e.relatedTarget instanceof Node) &&
                !subMenuRef.current?.contains(e.relatedTarget as Node) &&
                !subMenuRef.current?.isEqualNode(e.relatedTarget as Node) &&
                setIsSubmenuVisible(false);
            }}
          >
            <Menu ref={subMenuRef}>{subMenuItems}</Menu>
          </div>
        }
      >
        {listItem}
      </Popover>
    </MenuItemContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', MenuItemProps>;

export default MenuItem;

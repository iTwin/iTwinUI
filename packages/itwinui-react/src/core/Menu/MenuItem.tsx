/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  CommonProps,
  useTheme,
  Popover,
  useMergedRefs,
  SvgCaretRightSmall,
} from '../utils';
import '@itwin/itwinui-css/css/menu.css';
import { Menu } from './Menu';

/**
 * Context used to provide menu item ref to sub-menu items.
 */
const MenuItemContext = React.createContext<{
  ref: React.RefObject<HTMLLIElement> | undefined;
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
  icon?: JSX.Element;
  /**
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
} & CommonProps;

/**
 * Basic menu item component. Should be used inside `Menu` component for each item.
 */
export const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(
  (props, ref) => {
    const {
      children,
      isSelected,
      disabled,
      value,
      onClick,
      sublabel,
      size = !!sublabel ? 'large' : 'default',
      icon,
      badge,
      className,
      style,
      role = 'menuitem',
      subMenuItems = [],
      ...rest
    } = props;

    useTheme();

    const menuItemRef = React.useRef<HTMLLIElement>(null);
    const refs = useMergedRefs(menuItemRef, ref);

    const { ref: parentMenuItemRef } = React.useContext(MenuItemContext);

    const subMenuRef = React.useRef<HTMLUListElement>(null);

    const [isSubmenuVisible, setIsSubmenuVisible] = React.useState(false);

    const onKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
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
      <li
        className={cx(
          'iui-menu-item',
          {
            'iui-large': size === 'large',
            'iui-active': isSelected,
            'iui-disabled': disabled,
          },
          className,
        )}
        onClick={() => !disabled && onClick?.(value)}
        ref={refs}
        style={style}
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
        {icon &&
          React.cloneElement(icon, {
            className: cx(icon.props.className, 'iui-icon'),
          })}
        <span className='iui-content'>
          <div className='iui-menu-label'>{children}</div>
          {sublabel && <div className='iui-menu-description'>{sublabel}</div>}
        </span>
        {!badge && subMenuItems.length > 0 && (
          <SvgCaretRightSmall className='iui-icon' />
        )}
        {badge &&
          React.cloneElement(badge, {
            className: cx(badge.props.className, 'iui-icon'),
          })}
      </li>
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
  },
);

export default MenuItem;

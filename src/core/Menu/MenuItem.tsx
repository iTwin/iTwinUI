/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { CommonProps } from '../utils/props';
import { useTheme } from '../utils/hooks/useTheme';
import '@itwin/itwinui-css/css/menu.css';

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
      ...rest
    } = props;

    useTheme();

    const onKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
      switch (event.key) {
        case 'Enter':
        case ' ':
        case 'Spacebar':
          !disabled && onClick?.(value);
          event.preventDefault();
          break;
        default:
          break;
      }
    };

    return (
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
        ref={ref}
        style={style}
        role={role}
        tabIndex={disabled ? undefined : -1}
        aria-selected={isSelected}
        onKeyDown={onKeyDown}
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
        {badge &&
          React.cloneElement(badge, {
            className: cx(badge.props.className, 'iui-icon'),
          })}
      </li>
    );
  },
);

export default MenuItem;

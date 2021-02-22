// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import cx from 'classnames';
import { CommonProps } from '../utils/props';
import { useTheme } from '../utils/hooks/useTheme';
import '@bentley/itwinui/css/menu.css';

export type MenuItemProps = {
  /**
   * Item is selected.
   */
  isSelected?: boolean;
  /**
   * Value of the item.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  /**
   * Callback function that handles click and keyboard submit actions.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (value?: any) => void;
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
      value,
      onClick,
      icon,
      badge,
      className,
      style,
      role = 'menuitem',
    } = props;

    useTheme();

    const onKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
      switch (event.key) {
        case 'Enter':
        case ' ':
        case 'Spacebar':
          onClick?.(value);
          event.preventDefault();
          break;
        default:
          break;
      }
    };

    return (
      <li
        className={cx({ 'iui-active': isSelected }, className)}
        onClick={() => onClick?.(value)}
        ref={ref}
        style={style}
        role={role}
        tabIndex={isSelected ? 0 : -1}
        aria-selected={isSelected}
        onKeyDown={onKeyDown}
      >
        {icon &&
          React.cloneElement(icon, {
            className: cx(icon.props.className, 'iui-menu-icon'),
          })}
        <span className='iui-content'>{children}</span>
        {badge &&
          React.cloneElement(badge, {
            className: cx(badge.props.className, 'iui-menu-icon', 'iui-right'),
          })}
      </li>
    );
  },
);

export default MenuItem;

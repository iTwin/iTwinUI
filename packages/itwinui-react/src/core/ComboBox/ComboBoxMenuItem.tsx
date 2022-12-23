/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { MenuItemProps } from '../Menu';
import { useSafeContext, useMergedRefs } from '../utils';
import { ComboBoxStateContext } from './helpers';

type ComboBoxMenuItemProps = MenuItemProps & { index: number };

export const ComboBoxMenuItem = React.memo(
  React.forwardRef(
    (props: ComboBoxMenuItemProps, forwardedRef: React.Ref<HTMLLIElement>) => {
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
        role = 'option',
        index,
        ...rest
      } = props;

      const { focusedIndex, enableVirtualization } =
        useSafeContext(ComboBoxStateContext);

      const focusRef = (el: HTMLLIElement | null) => {
        if (!enableVirtualization && focusedIndex === index) {
          el?.scrollIntoView({ block: 'nearest' });
        }
      };

      const refs = useMergedRefs(forwardedRef, focusRef);

      return (
        <li
          className={cx(
            'iui-menu-item',
            {
              'iui-large': size === 'large',
              'iui-active': isSelected,
              'iui-disabled': disabled,
              'iui-focused': focusedIndex === index,
            },
            className,
          )}
          ref={refs}
          onClick={() => !disabled && onClick?.(value)}
          role={role}
          tabIndex={disabled || role === 'presentation' ? undefined : -1}
          aria-selected={isSelected}
          aria-disabled={disabled}
          data-iui-index={index}
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
  ),
);
ComboBoxMenuItem.displayName = 'ComboBoxMenuItem';

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import type { MenuItemProps } from '../Menu/index.js';
import { useSafeContext, useMergedRefs, Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { ComboBoxStateContext } from './helpers.js';

type ComboBoxMenuItemProps = MenuItemProps & { index: number };

export const ComboBoxMenuItem = React.memo(
  React.forwardRef((props, forwardedRef) => {
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
      <Box
        as='li'
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
        onClick={() => onClick?.(value)}
        role={role}
        tabIndex={role === 'presentation' ? undefined : -1}
        aria-selected={isSelected}
        aria-disabled={disabled}
        data-iui-index={index}
        {...rest}
      >
        {icon &&
          React.cloneElement(icon, {
            className: cx(icon.props.className, 'iui-icon'),
          })}
        <Box className='iui-content'>
          <Box className='iui-menu-label'>{children}</Box>
          {sublabel && <Box className='iui-menu-description'>{sublabel}</Box>}
        </Box>
        {badge &&
          React.cloneElement(badge, {
            className: cx(badge.props.className, 'iui-icon'),
          })}
      </Box>
    );
  }) as PolymorphicForwardRefComponent<'li', ComboBoxMenuItemProps>,
);
ComboBoxMenuItem.displayName = 'ComboBoxMenuItem';

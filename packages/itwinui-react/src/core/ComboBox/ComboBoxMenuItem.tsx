/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { MenuItemProps } from '../Menu/MenuItem.js';
import { useSafeContext, useMergedRefs } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { ComboBoxStateContext } from './helpers.js';
import { ListItem } from '../List/ListItem.js';

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
      startIcon,
      endIcon,
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
      <ListItem
        actionable
        size={size}
        active={isSelected}
        disabled={disabled}
        focused={focusedIndex === index}
        ref={refs}
        onClick={() => onClick?.(value)}
        role={role}
        tabIndex={role === 'presentation' ? undefined : -1}
        aria-selected={isSelected}
        aria-disabled={disabled}
        data-iui-index={index}
        {...rest}
      >
        {startIcon && (
          <ListItem.Icon as='span' aria-hidden>
            {startIcon}
          </ListItem.Icon>
        )}
        <ListItem.Content>
          {children}
          {sublabel && <ListItem.Description>{sublabel}</ListItem.Description>}
        </ListItem.Content>
        {endIcon && (
          <ListItem.Icon as='span' aria-hidden>
            {endIcon}
          </ListItem.Icon>
        )}
      </ListItem>
    );
  }) as PolymorphicForwardRefComponent<'li', ComboBoxMenuItemProps>,
);
ComboBoxMenuItem.displayName = 'ComboBoxMenuItem';

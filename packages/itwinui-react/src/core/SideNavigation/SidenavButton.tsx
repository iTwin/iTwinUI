/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import cx from 'classnames';
import * as React from 'react';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Button } from '../Buttons/Button.js';
import type { ButtonProps } from '../Buttons/Button.js';
import { Tooltip } from '../Tooltip/Tooltip.js';
import { SidenavExpandedContext } from './SideNavigation.js';

type SidenavButtonProps = {
  /**
   * Whether the sidenav button is active,
   * i.e. the current page corresponds to this button.
   */
  isActive?: boolean;
  /**
   * Whether the sidenav button only has submenu open,
   * i.e. submenu is open but the current page does not correspond to this button.
   */
  isSubmenuOpen?: boolean;
} & Omit<ButtonProps, 'styleType' | 'size'>;

/**
 * Wrapper around Button to be used as SideNavigation items.
 * Label is hidden when sidenav is collapsed.
 */
export const SidenavButton = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    isActive = false,
    disabled = false,
    isSubmenuOpen = false,
    ...rest
  } = props;

  const isExpanded = React.useContext(SidenavExpandedContext) === true;

  const sidenavButton = (
    <Button
      className={cx(
        'iui-sidenav-button',
        { 'iui-submenu-open': isSubmenuOpen },
        className,
      )}
      data-iui-active={isActive}
      size='large'
      disabled={disabled}
      ref={ref}
      {...rest}
    >
      {children}
    </Button>
  );

  return !isExpanded ? (
    <Tooltip content={children} placement='right' ariaStrategy='none'>
      {sidenavButton}
    </Tooltip>
  ) : (
    sidenavButton
  );
}) as PolymorphicForwardRefComponent<'button', SidenavButtonProps>;
if (process.env.NODE_ENV === 'development') {
  SidenavButton.displayName = 'SidenavButton';
}

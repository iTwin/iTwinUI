/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import cx from 'classnames';
import React from 'react';

import { useTheme } from '../utils/hooks/useTheme';
import { Button, ButtonProps } from '../Buttons';
import '@itwin/itwinui-css/css/side-navigation.css';

export type SidenavButtonProps = {
  /**
   * Whether the sidenav button is active.
   */
  isActive?: boolean;
} & Omit<ButtonProps, 'styleType' | 'size'>;

/**
 * Wrapper around Button to be used as SideNavigation items.
 * Label is hidden when sidenav is collapsed.
 */
export const SidenavButton = React.forwardRef<
  HTMLButtonElement,
  SidenavButtonProps
>((props, ref) => {
  const {
    className,
    children,
    isActive = false,
    disabled = false,
    ...rest
  } = props;

  useTheme();

  return (
    <Button
      className={cx(
        'iui-sidenav-button',
        { 'iui-active': isActive },
        className,
      )}
      size='large'
      disabled={disabled}
      ref={ref}
      {...rest}
    >
      {children}
    </Button>
  );
});

export default SidenavButton;

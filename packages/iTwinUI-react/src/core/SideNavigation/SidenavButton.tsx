/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import cx from 'classnames';
import React from 'react';

import { PolymorphicForwardRefComponent, useTheme } from '../utils';
import { Button, ButtonProps } from '../Buttons';
import '@itwin/itwinui-css/css/side-navigation.css';

export type SidenavButtonProps = {
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

type SideNavButtonComponent = PolymorphicForwardRefComponent<
  'button',
  SidenavButtonProps
>;

/**
 * Wrapper around Button to be used as SideNavigation items.
 * Label is hidden when sidenav is collapsed.
 */
export const SidenavButton: SideNavButtonComponent = React.forwardRef(
  (props, ref) => {
    const {
      className,
      children,
      isActive = false,
      disabled = false,
      isSubmenuOpen = false,
      ...rest
    } = props;

    useTheme();

    return (
      <Button
        className={cx(
          'iui-sidenav-button',
          {
            'iui-submenu-open': isSubmenuOpen,
          },
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
  },
);

export default SidenavButton;

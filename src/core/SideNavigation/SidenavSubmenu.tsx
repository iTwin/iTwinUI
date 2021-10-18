/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { CommonProps, useTheme } from '../utils';
import '@itwin/itwinui-css/css/side-navigation.css';

export type SidenavSubmenuProps = {
  /**
   * Content of the submenu.
   */
  children: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * Subcomponent to be used in the `submenu` prop of `SideNavigation`.
 * @example
 * <SidenavSubmenu>
 *   <SidenavSubmenuHeader>Documents</SidenavSubmenuHeader>
 *   <div> ... </div>
 * </SidenavSubmenu>
 */
export const SidenavSubmenu = React.forwardRef<
  HTMLDivElement,
  SidenavSubmenuProps
>((props, ref) => {
  const { children, className, ...rest } = props;

  useTheme();

  return (
    <div
      className={cx('iui-side-navigation-submenu', className)}
      ref={ref}
      {...rest}
    >
      <div className='iui-side-navigation-submenu-content'>{children}</div>
    </div>
  );
});

export default SidenavSubmenu;

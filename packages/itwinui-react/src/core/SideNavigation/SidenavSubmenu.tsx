/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { useGlobals } from '../utils/index.js';
import type { CommonProps } from '../utils/index.js';
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

  useGlobals();

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

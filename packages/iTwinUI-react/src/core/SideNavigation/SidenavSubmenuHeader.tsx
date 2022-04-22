/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { CommonProps, useTheme } from '../utils';
import '@itwin/itwinui-css/css/side-navigation.css';

export type SidenavSubmenuHeaderProps = {
  /**
   * Content of the submenu header (e.g. label)
   */
  children?: React.ReactNode;
  /**
   * Actions shown at the end of the submenu label.
   */
  actions?: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * Header content for `SidenavSubmenu`. Supports truncated label and actions buttons.
 * @example
 * <SidenavSubmenuHeader actions={
 *   <IconButton styleType='borderless' onClick={() => {}} aria-label='Settings'>
 *     <SvgSettings />
 *   </IconButton>
 * }>
 *   <IconButton styleType='borderless' onClick={() => {}} aria-label='Back'>
 *     <SvgCaretLeft />
 *   </IconButton>
 *   <span>Documents</span>
 * </SidenavSubmenuHeader>
 */
export const SidenavSubmenuHeader = (props: SidenavSubmenuHeaderProps) => {
  const { children, actions, className, ...rest } = props;

  useTheme();

  return (
    <div
      className={cx('iui-side-navigation-submenu-header', className)}
      {...rest}
    >
      <div className='iui-side-navigation-submenu-header-label'>{children}</div>
      {actions && (
        <div className='iui-side-navigation-submenu-header-actions'>
          {actions}
        </div>
      )}
    </div>
  );
};

export default SidenavSubmenuHeader;

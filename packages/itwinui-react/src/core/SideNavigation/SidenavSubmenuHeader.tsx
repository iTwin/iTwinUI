/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type SidenavSubmenuHeaderProps = {
  /**
   * Actions shown at the end of the submenu label.
   */
  actions?: React.ReactNode;
};

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
export const SidenavSubmenuHeader = React.forwardRef((props, forwardedRef) => {
  const { children, actions, className, ...rest } = props;

  return (
    <Box
      className={cx('iui-side-navigation-submenu-header', className)}
      ref={forwardedRef}
      {...rest}
    >
      <Box className='iui-side-navigation-submenu-header-label'>{children}</Box>
      {actions && (
        <Box className='iui-side-navigation-submenu-header-actions'>
          {actions}
        </Box>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', SidenavSubmenuHeaderProps>;
if (process.env.NODE_ENV === 'development') {
  SidenavSubmenuHeader.displayName = 'SidenavSubmenuHeader';
}

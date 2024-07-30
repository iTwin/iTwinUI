/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

/**
 * Subcomponent to be used in the `submenu` prop of `SideNavigation`.
 * @example
 * <SidenavSubmenu>
 *   <SidenavSubmenuHeader>Documents</SidenavSubmenuHeader>
 *   <div> ... </div>
 * </SidenavSubmenu>
 */
export const SidenavSubmenu = React.forwardRef((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <Box
      className={cx('iui-side-navigation-submenu', className)}
      ref={ref}
      {...rest}
    >
      <Box className='iui-side-navigation-submenu-content'>{children}</Box>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;
if (process.env.NODE_ENV === 'development') {
  SidenavSubmenu.displayName = 'SidenavSubmenu';
}

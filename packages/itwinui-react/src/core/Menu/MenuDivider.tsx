/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { CommonProps, useTheme } from '../utils';
import '@itwin/itwinui-css/css/menu.css';

export type MenuDividerProps = Omit<CommonProps, 'title'>;

/**
 * Divider between menu items. Should be used inside `Menu`.
 * @example
 * <Menu>
 *   {(close) => [
 *     <MenuItem key={0} onClick={() => {}}>
 *       Item #1
 *     </MenuItem>,
 *     <MenuDivider key={1} />,
 *     <MenuItem key={2} onClick={() => {}}>
 *       Item #2
 *     </MenuItem>,
 *   ]}
 * </Menu>
 */
export const MenuDivider = (props: MenuDividerProps) => {
  const { className, ...rest } = props;
  useTheme();
  return (
    <li
      role='separator'
      className={cx('iui-menu-divider', className)}
      {...rest}
    />
  );
};

export default MenuDivider;

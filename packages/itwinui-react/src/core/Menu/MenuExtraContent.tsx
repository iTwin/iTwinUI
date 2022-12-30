/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { CommonProps, useTheme } from '../utils';
import '@itwin/itwinui-css/css/menu.css';

export type MenuExtraContentProps = {
  children: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * Component that allows to have any additional content inside `Menu`.
 * @example
 * <Menu>
 *   {(close) => [
 *     <MenuExtraContent key={0}>
 *       <>
 *         <Text variant='leading'>Terry Rivers</Text>
 *           terry.rivers@email.com
 *         </Text>
 *         <Select options={someOptions} />
 *       </>
 *     </MenuExtraContent>,
 *     <MenuDivider key={1} />,
 *     <MenuItem key={2} onClick={() => {}}>
 *       Sign out
 *     </MenuItem>,
 *   ]}
 * </Menu>
 */
export const MenuExtraContent = (props: MenuExtraContentProps) => {
  const { children, className, ...rest } = props;
  useTheme();
  return (
    <li
      className={cx('iui-menu-content', className)}
      role='presentation'
      {...rest}
    >
      {children}
    </li>
  );
};

export default MenuExtraContent;

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useTheme } from '../utils';
import '@itwin/itwinui-css/css/menu.css';

export const MenuDivider = () => {
  useTheme();
  return <li role='separator' className='iui-menu-divider' />;
};

export default MenuDivider;

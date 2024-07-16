/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../../utils/index.js';

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
export const MenuDivider = polymorphic('iui-menu-divider', {
  role: 'separator',
});
if (process.env.NODE_ENV === 'development') {
  MenuDivider.displayName = 'MenuDivider';
}

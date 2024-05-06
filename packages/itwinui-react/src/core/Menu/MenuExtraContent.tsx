/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../../utils/index.js';

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
export const MenuExtraContent = polymorphic.li('iui-menu-content', {
  role: 'presentation',
});

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { MenuItem, DropdownMenu, IconButton } from '@itwin/itwinui-react';
import { SvgMore } from '@itwin/itwinui-icons-react';

export default () => {
  const dropdownMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={() => close()}>
      Item #1
    </MenuItem>,
    <MenuItem key={2} onClick={() => close()}>
      Item #2
    </MenuItem>,
    <MenuItem
      key={3}
      subMenuItems={[
        <MenuItem
          key={4}
          subMenuItems={[
            <MenuItem key={7} onClick={() => close()}>
              Item #7
            </MenuItem>,
            <MenuItem key={8} onClick={() => close()}>
              Item #8
            </MenuItem>,
          ]}
        >
          Item #4
        </MenuItem>,
        <MenuItem key={5} onClick={() => close()}>
          Item #5
        </MenuItem>,
        <MenuItem
          key={6}
          subMenuItems={[
            <MenuItem key={9} onClick={() => close()}>
              Item #9
            </MenuItem>,
            <MenuItem key={10} onClick={() => close()}>
              Item #10
            </MenuItem>,
          ]}
        >
          Item #6
        </MenuItem>,
      ]}
    >
      Item #3
    </MenuItem>,
  ];

  return (
    <>
      <DropdownMenu menuItems={dropdownMenuItems}>
        <IconButton>
          <SvgMore />
        </IconButton>
      </DropdownMenu>
    </>
  );
};

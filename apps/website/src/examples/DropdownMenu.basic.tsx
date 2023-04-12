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
    <MenuItem key={3} onClick={() => close()} disabled>
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

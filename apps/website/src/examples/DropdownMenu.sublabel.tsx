/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { MenuItem, DropdownMenu, IconButton } from '@itwin/itwinui-react';
import { SvgMore, SvgPlaceholder } from '@itwin/itwinui-icons-react';

export default () => {
  const dropdownMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={() => close()} icon={<SvgPlaceholder />} sublabel='Sublabel #1'>
      Item #1
    </MenuItem>,
    <MenuItem key={2} onClick={() => close()} icon={<SvgPlaceholder />} sublabel='Sublabel #2'>
      Item #2
    </MenuItem>,
    <MenuItem key={3} onClick={() => close()} icon={<SvgPlaceholder />} sublabel='Sublabel #3'>
      Item #3
    </MenuItem>,
  ];

  return (
    <>
      <DropdownMenu menuItems={dropdownMenuItems}>
        <IconButton aria-label='More options'>
          <SvgMore />
        </IconButton>
      </DropdownMenu>
    </>
  );
};

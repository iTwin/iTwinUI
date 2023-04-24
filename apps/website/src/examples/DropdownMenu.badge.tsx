/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { MenuItem, DropdownMenu, IconButton } from '@itwin/itwinui-react';
import { SvgMore, SvgCrop, SvgClipboard, SvgMove } from '@itwin/itwinui-icons-react';

export default () => {
  const dropdownMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={() => close()} badge={<SvgCrop />}>
      Crop
    </MenuItem>,
    <MenuItem key={2} onClick={() => close()} badge={<SvgClipboard />}>
      Paste
    </MenuItem>,
    <MenuItem key={3} onClick={() => close()} badge={<SvgMove />}>
      Move
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

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { MenuItem, DropdownMenu, IconButton } from '@itwin/itwinui-react';
import { SvgMore } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <>
      <DropdownMenu
        menuItems={
          <>
            <MenuItem>Item #1</MenuItem>
            <MenuItem>Item #2</MenuItem>
            <MenuItem disabled>Item #3</MenuItem>
          </>
        }
      >
        <IconButton label='More options'>
          <SvgMore />
        </IconButton>
      </DropdownMenu>
    </>
  );
};

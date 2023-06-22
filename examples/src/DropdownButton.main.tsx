/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { MenuItem, DropdownButton } from '@itwin/itwinui-react';

export default () => {
  const buttonMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={() => close()}>
      Item #1
    </MenuItem>,
    <MenuItem key={2} onClick={() => close()}>
      Item #2
    </MenuItem>,
    <MenuItem key={3} onClick={() => close()}>
      Item #3
    </MenuItem>,
  ];

  return (
    <DropdownButton menuItems={buttonMenuItems} styleType='default'>
      Default
    </DropdownButton>
  );
};

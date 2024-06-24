/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { MenuItem, DropdownButton } from '@itwin/itwinui-react';

export default {
  title: 'DropdownButton',
};

export const Basic = () => {
  const onClick = (index: number, close: () => void) => () => {
    console.log(`Item #${index} clicked!`);
    close();
  };

  const buttonMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={onClick(1, close)}>
      Item #1
    </MenuItem>,
    <MenuItem key={2} onClick={onClick(2, close)}>
      Item #2
    </MenuItem>,
    <MenuItem key={3} onClick={onClick(3, close)}>
      Item #3
    </MenuItem>,
  ];

  return <DropdownButton menuItems={buttonMenuItems}>Default</DropdownButton>;
};

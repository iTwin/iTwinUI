/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Text,
  MenuExtraContent,
  MenuDivider,
  MenuItem,
  DropdownMenu,
  IconButton,
  Select,
} from '@itwin/itwinui-react';
import { SvgMore } from '@itwin/itwinui-icons-react';

export default () => {
  const [userType, setUserType] = React.useState('User');
  const dropdownMenuItems = (close) => [
    <MenuExtraContent key={0}>
      <>
        <Text variant='leading'>Terry Rivers</Text>
        <Text isMuted>terry.rivers@email.com</Text>
        <Select
          options={[
            { value: 'User', label: 'User' },
            { value: 'Moderator', label: 'Moderator' },
            { value: 'Administrator', label: 'Administrator' },
          ]}
          value={userType}
          onChange={(type) => setUserType(type)}
        />
      </>
    </MenuExtraContent>,
    <MenuDivider key={1} />,
    <MenuItem key={2} onClick={() => close()}>
      View profile
    </MenuItem>,
    <MenuItem key={3} onClick={() => close()}>
      Sign out
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

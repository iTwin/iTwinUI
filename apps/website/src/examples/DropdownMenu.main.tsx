/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Text,
  MenuExtraContent,
  Select,
  MenuDivider,
  MenuItem,
  DropdownMenu,
  IconButton,
  ButtonGroup,
} from '@itwin/itwinui-react';
import { SvgPlaceholder, SvgMore } from '@itwin/itwinui-icons-react';

export default () => {
  const [userType, setUserType] = React.useState('User');

  const dropdownMenuItems = (close) => [
    <MenuExtraContent key={0}>
      <>
        <Text variant='leading'>Terry Rivers</Text>
        <Text isMuted style={{ marginBottom: 8 }}>
          terry.rivers@email.com
        </Text>
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
    <MenuItem key={2} onClick={close}>
      View profile
    </MenuItem>,
    <MenuItem key={3} onClick={close}>
      Sign out
    </MenuItem>,
  ];
  return (
    <div style={{ height: '70%', width: '50%', display: 'flex', alignItems: 'flex-start' }}>
      <ButtonGroup>
        <IconButton disabled>
          <SvgPlaceholder />
        </IconButton>
        <IconButton disabled>
          <SvgPlaceholder />
        </IconButton>
        <DropdownMenu menuItems={dropdownMenuItems}>
          <IconButton>
            <SvgMore />
          </IconButton>
        </DropdownMenu>
      </ButtonGroup>
    </div>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import {
  DropdownMenu,
  IconButton,
  MenuExtraContent,
  MenuDivider,
  MenuItem,
  Select,
  Text,
  Surface,
  List,
  ListItem,
} from '@itwin/itwinui-react';
import {
  SvgClipboard,
  SvgCrop,
  SvgMore,
  SvgMove,
  SvgPlaceholder,
} from '@itwin/itwinui-icons-react';
import { StoryDecorator } from '@ladle/react';

export default {
  title: 'DropdownMenu',
};

export const Basic = () => {
  const onClick = (index: number, close: () => void) => () => {
    console.log(`Item #${index} clicked!`);
    close();
  };
  const dropdownMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={onClick(1, close)}>
      Item #1
    </MenuItem>,
    <MenuItem key={2} onClick={onClick(2, close)}>
      Item #2
    </MenuItem>,
    <MenuItem key={3} onClick={onClick(3, close)} disabled>
      Item #3
    </MenuItem>,
  ];
  return (
    <DropdownMenu menuItems={dropdownMenuItems}>
      <IconButton>
        <SvgMore />
      </IconButton>
    </DropdownMenu>
  );
};

// Body height is the same as Select component height therefore clicking outside would not close dropdown.
Basic.decorators = [
  (Story) => (
    <div style={{ minHeight: 150 }}>
      <Story />
    </div>
  ),
] satisfies StoryDecorator[];

export const WithStartIcons = () => {
  const onClick = (actionName: string, close: () => void) => () => {
    console.log(`${actionName} clicked!`);
    close();
  };
  const dropdownMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={onClick('Crop', close)} startIcon={<SvgCrop />}>
      Crop
    </MenuItem>,
    <MenuItem
      key={2}
      onClick={onClick('Paste', close)}
      startIcon={<SvgClipboard />}
    >
      Paste
    </MenuItem>,
    <MenuItem key={3} onClick={onClick('Move', close)} startIcon={<SvgMove />}>
      Move
    </MenuItem>,
  ];
  return (
    <DropdownMenu menuItems={dropdownMenuItems}>
      <IconButton>
        <SvgMore />
      </IconButton>
    </DropdownMenu>
  );
};

WithStartIcons.decorators = [
  (Story) => (
    <div style={{ minHeight: 150 }}>
      <Story />
    </div>
  ),
] satisfies StoryDecorator[];

export const WithEndIcons = () => {
  const onClick = (actionName: string, close: () => void) => () => {
    console.log(`${actionName} clicked!`);
    close();
  };
  const dropdownMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={onClick('Crop', close)} endIcon={<SvgCrop />}>
      Crop
    </MenuItem>,
    <MenuItem
      key={2}
      onClick={onClick('Paste', close)}
      endIcon={<SvgClipboard />}
    >
      Paste
    </MenuItem>,
    <MenuItem key={3} onClick={onClick('Move', close)} endIcon={<SvgMove />}>
      Move
    </MenuItem>,
  ];
  return (
    <DropdownMenu menuItems={dropdownMenuItems}>
      <IconButton>
        <SvgMore />
      </IconButton>
    </DropdownMenu>
  );
};

WithEndIcons.decorators = [
  (Story) => (
    <div style={{ minHeight: 150 }}>
      <Story />
    </div>
  ),
] satisfies StoryDecorator[];

export const WithSublabels = () => {
  const onClick = (index: number, close: () => void) => () => {
    console.log(`Item #${index} clicked!`);
    close();
  };
  const dropdownMenuItems = (close: () => void) => [
    <MenuItem
      key={1}
      onClick={onClick(1, close)}
      startIcon={<SvgPlaceholder />}
      sublabel='Sublabel #1'
    >
      Item #1
    </MenuItem>,
    <MenuItem
      key={2}
      onClick={onClick(2, close)}
      startIcon={<SvgPlaceholder />}
      sublabel='Sublabel #2'
    >
      Item #2
    </MenuItem>,
    <MenuItem
      key={3}
      onClick={onClick(3, close)}
      startIcon={<SvgPlaceholder />}
      sublabel='Sublabel #3'
    >
      Item #3
    </MenuItem>,
  ];
  return (
    <div style={{ minHeight: 200 }}>
      <DropdownMenu menuItems={dropdownMenuItems}>
        <IconButton>
          <SvgMore />
        </IconButton>
      </DropdownMenu>
    </div>
  );
};

WithSublabels.decorators = [
  (Story) => (
    <div style={{ minHeight: 150 }}>
      <Story />
    </div>
  ),
] satisfies StoryDecorator[];

export const Submenu = () => {
  const onClick = (index: number, close: () => void) => () => {
    console.log(`Item #${index} clicked!`);
    close();
  };
  const dropdownMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={onClick(1, close)}>
      Item #1
    </MenuItem>,
    <MenuItem key={2} onClick={onClick(2, close)}>
      Item #2
    </MenuItem>,
    <MenuItem
      key={3}
      subMenuItems={[
        <MenuItem
          key={4}
          subMenuItems={[
            <MenuItem key={7} onClick={onClick(7, close)}>
              Item #7
            </MenuItem>,
            <MenuItem key={8} onClick={onClick(8, close)}>
              Item #8
            </MenuItem>,
          ]}
        >
          Item #4
        </MenuItem>,
        <MenuItem key={5} onClick={onClick(5, close)}>
          Item #5
        </MenuItem>,
        <MenuItem
          key={6}
          subMenuItems={[
            <MenuItem key={9} onClick={onClick(9, close)}>
              Item #9
            </MenuItem>,
            <MenuItem key={10} onClick={onClick(10, close)}>
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
    <DropdownMenu menuItems={dropdownMenuItems}>
      <IconButton>
        <SvgMore />
      </IconButton>
    </DropdownMenu>
  );
};

Submenu.decorators = [
  (Story) => (
    <div style={{ minHeight: 150 }}>
      <Story />
    </div>
  ),
] satisfies StoryDecorator[];

export const WithSeparator = () => {
  const onClick = (index: number, close: () => void) => () => {
    console.log(`Item #${index} clicked!`);
    close();
  };
  const dropdownMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={onClick(1, close)}>
      Item #1
    </MenuItem>,
    <MenuItem key={2} onClick={onClick(2, close)}>
      Item #2
    </MenuItem>,
    <MenuDivider key={3} />,
    <MenuItem key={4} onClick={onClick(3, close)} disabled>
      Item #3
    </MenuItem>,
    <MenuItem key={5} onClick={onClick(4, close)}>
      Item #4
    </MenuItem>,
  ];
  return (
    <DropdownMenu menuItems={dropdownMenuItems}>
      <IconButton>
        <SvgMore />
      </IconButton>
    </DropdownMenu>
  );
};

WithSeparator.decorators = [
  (Story) => (
    <div style={{ minHeight: 200 }}>
      <Story />
    </div>
  ),
] satisfies StoryDecorator[];

export const WithContent = () => {
  const onClick = (item: string, close: () => void) => () => {
    console.log(`'${item}' clicked!`);
    close();
  };

  const [userType, setUserType] = React.useState('User');

  const dropdownMenuItems = (close: () => void) => [
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
    <MenuItem key={2} onClick={onClick('View profile', close)}>
      View profile
    </MenuItem>,
    <MenuItem key={3} onClick={onClick('Sign out', close)}>
      Sign out
    </MenuItem>,
  ];
  return (
    <DropdownMenu menuItems={dropdownMenuItems}>
      <IconButton>
        <SvgMore />
      </IconButton>
    </DropdownMenu>
  );
};

WithContent.decorators = [
  (Story) => (
    <div style={{ minHeight: 250 }}>
      <Story />
    </div>
  ),
] satisfies StoryDecorator[];

export const HideMenuWhenTriggerHidden = () => {
  const onClick = (index: number, close: () => void) => () => {
    console.log(`Item #${index} clicked!`);
    close();
  };

  const dropdownMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={onClick(1, close)}>
      Option #1
    </MenuItem>,
    <MenuItem key={2} onClick={onClick(2, close)}>
      Option #2
    </MenuItem>,
    <MenuItem key={3} onClick={onClick(3, close)} disabled>
      Option #3
    </MenuItem>,
  ];

  const items = new Array(30).fill(0);

  return (
    <Surface
      style={{
        width: 'min(200px, 20%)',
      }}
    >
      <Surface.Body
        as={List}
        style={{
          overflowY: 'auto',
          maxHeight: '200px',
        }}
      >
        {items.map((_, i) => (
          <ListItem key={i}>
            <ListItem.Content>Item {i}</ListItem.Content>
            <DropdownMenu
              menuItems={dropdownMenuItems}
              middleware={{
                hide: false,
              }}
            >
              <IconButton
                styleType='borderless'
                label='More options'
                size='small'
              >
                <SvgMore />
              </IconButton>
            </DropdownMenu>
          </ListItem>
        ))}
      </Surface.Body>
    </Surface>
  );
};

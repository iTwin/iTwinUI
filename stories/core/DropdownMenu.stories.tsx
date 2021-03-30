/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { DropdownMenuProps } from '../../src/core/DropdownMenu/DropdownMenu';
import { DropdownMenu, IconButton, MenuItem } from '../../src/core';
import { action } from '@storybook/addon-actions';
import { Position } from '../../src/utils';
import SvgClipboard from '@bentley/icons-generic-react/cjs/icons/Clipboard';
import SvgCrop from '@bentley/icons-generic-react/cjs/icons/Crop';
import SvgMore2 from '@bentley/icons-generic-react/cjs/icons/More2';
import SvgMove from '@bentley/icons-generic-react/cjs/icons/Move';

export default {
  title: 'Core/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    docs: { description: { component: 'Basic dropdown component' } },
  },
  argTypes: {
    position: {
      control: {
        type: 'select',
        options: Object.values(Position),
      },
      defaultValue: Position.BOTTOM_LEFT,
    },
    style: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} as Meta<DropdownMenuProps>;

export const Basic: Story<DropdownMenuProps> = (args) => {
  const { menuItems, ...rest } = args;
  const onClick = (index: number, close: () => void) => () => {
    action(`Item #${index} clicked!`)();
    close();
  };
  const dropdownMenuItems = (close: () => void) => [
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
  return (
    // Body height is the same as Select component height therefore clicking outside would not close dropdown.
    <div style={{ minHeight: 150 }}>
      <DropdownMenu menuItems={menuItems || dropdownMenuItems} {...rest}>
        <IconButton>
          <SvgMore2 />
        </IconButton>
      </DropdownMenu>
    </div>
  );
};

export const WithIcons: Story<DropdownMenuProps> = (args) => {
  const { menuItems, ...rest } = args;
  const onClick = (actionName: string, close: () => void) => () => {
    action(`${actionName} clicked!`)();
    close();
  };
  const dropdownMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={onClick('Crop', close)} icon={<SvgCrop />}>
      Crop
    </MenuItem>,
    <MenuItem key={2} onClick={onClick('Paste', close)} icon={<SvgClipboard />}>
      Paste
    </MenuItem>,
    <MenuItem key={3} onClick={onClick('Move', close)} icon={<SvgMove />}>
      Move
    </MenuItem>,
  ];
  return (
    <div style={{ minHeight: 150 }}>
      <DropdownMenu menuItems={menuItems || dropdownMenuItems} {...rest}>
        <IconButton>
          <SvgMore2 />
        </IconButton>
      </DropdownMenu>
    </div>
  );
};

export const WithBadges: Story<DropdownMenuProps> = (args) => {
  const { menuItems, ...rest } = args;
  const onClick = (actionName: string, close: () => void) => () => {
    action(`${actionName} clicked!`)();
    close();
  };
  const dropdownMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={onClick('Crop', close)} badge={<SvgCrop />}>
      Crop
    </MenuItem>,
    <MenuItem
      key={2}
      onClick={onClick('Paste', close)}
      badge={<SvgClipboard />}
    >
      Paste
    </MenuItem>,
    <MenuItem key={3} onClick={onClick('Move', close)} badge={<SvgMove />}>
      Move
    </MenuItem>,
  ];
  return (
    <div style={{ minHeight: 150 }}>
      <DropdownMenu menuItems={menuItems || dropdownMenuItems} {...rest}>
        <IconButton>
          <SvgMore2 />
        </IconButton>
      </DropdownMenu>
    </div>
  );
};

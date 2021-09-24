/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  DropdownMenu,
  DropdownMenuProps,
  IconButton,
  MenuDivider,
  MenuItem,
} from '../../src/core';
import {
  SvgClipboard,
  SvgCrop,
  SvgMore,
  SvgMove,
  SvgPlaceholder,
} from '@itwin/itwinui-icons-react';
import { CreeveyMeta, CreeveyStoryParams } from 'creevey';

export default {
  title: 'Core/DropdownMenu',
  component: DropdownMenu,
  subcomponents: { MenuItem },
  argTypes: {
    style: { control: { disable: true } },
    className: { control: { disable: true } },
    id: { control: { disable: true } },
  },
  parameters: {
    creevey: {
      tests: {
        async open() {
          const button = await this.browser.findElement({
            css: '.iui-button',
          });
          const closed = await this.takeScreenshot();

          await button.sendKeys(' ');
          const opened = await this.takeScreenshot();
          await this.expect({ closed, opened }).to.matchImages();
        },
      },
    },
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
  },
} as Meta<DropdownMenuProps> & CreeveyMeta;

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
    <MenuItem key={3} onClick={onClick(3, close)} disabled>
      Item #3
    </MenuItem>,
  ];
  return (
    <DropdownMenu menuItems={menuItems || dropdownMenuItems} {...rest}>
      <IconButton>
        <SvgMore />
      </IconButton>
    </DropdownMenu>
  );
};

// Body height is the same as Select component height therefore clicking outside would not close dropdown.
Basic.decorators = [(Story) => <div style={{ minHeight: 150 }}>{Story()}</div>];

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
    <DropdownMenu menuItems={menuItems || dropdownMenuItems} {...rest}>
      <IconButton>
        <SvgMore />
      </IconButton>
    </DropdownMenu>
  );
};

WithIcons.decorators = [
  (Story) => <div style={{ minHeight: 150 }}>{Story()}</div>,
];

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
    <DropdownMenu menuItems={menuItems || dropdownMenuItems} {...rest}>
      <IconButton>
        <SvgMore />
      </IconButton>
    </DropdownMenu>
  );
};

WithBadges.decorators = [
  (Story) => <div style={{ minHeight: 150 }}>{Story()}</div>,
];

export const WithSublabels: Story<DropdownMenuProps> = (args) => {
  const { menuItems, ...rest } = args;
  const onClick = (index: number, close: () => void) => () => {
    action(`Item #${index} clicked!`)();
    close();
  };
  const dropdownMenuItems = (close: () => void) => [
    <MenuItem
      key={1}
      onClick={onClick(1, close)}
      icon={<SvgPlaceholder />}
      sublabel='Sublabel #1'
    >
      Item #1
    </MenuItem>,
    <MenuItem
      key={2}
      onClick={onClick(2, close)}
      icon={<SvgPlaceholder />}
      sublabel='Sublabel #2'
    >
      Item #2
    </MenuItem>,
    <MenuItem
      key={3}
      onClick={onClick(3, close)}
      icon={<SvgPlaceholder />}
      sublabel='Sublabel #3'
    >
      Item #3
    </MenuItem>,
  ];
  return (
    <div style={{ minHeight: 200 }}>
      <DropdownMenu menuItems={menuItems || dropdownMenuItems} {...rest}>
        <IconButton>
          <SvgMore />
        </IconButton>
      </DropdownMenu>
    </div>
  );
};

WithSublabels.decorators = [
  (Story) => <div style={{ minHeight: 150 }}>{Story()}</div>,
];

export const Submenu: Story<DropdownMenuProps> = (args) => {
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
    <DropdownMenu menuItems={menuItems || dropdownMenuItems} {...rest}>
      <IconButton>
        <SvgMore />
      </IconButton>
    </DropdownMenu>
  );
};

Submenu.parameters = {
  creevey: {
    captureElement: null,
    tests: {
      async open() {
        const closed = await this.takeScreenshot();

        const button = await this.browser.findElement({
          css: '.iui-button',
        });
        await button.sendKeys(' ');
        const opened = await this.takeScreenshot();

        const menuItem = await this.browser.findElement({
          css: '.iui-menu-item:last-child',
        });
        await this.browser.actions().move({ origin: menuItem }).perform();
        const hovered = await this.takeScreenshot();

        await this.expect({ closed, opened, hovered }).to.matchImages();
      },
    },
  } as CreeveyStoryParams,
};

Submenu.decorators = [
  (Story) => <div style={{ minHeight: 150 }}>{Story()}</div>,
];

export const WithSeparator: Story<DropdownMenuProps> = (args) => {
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
    <MenuDivider key={3} />,
    <MenuItem key={4} onClick={onClick(3, close)} disabled>
      Item #3
    </MenuItem>,
    <MenuItem key={5} onClick={onClick(4, close)}>
      Item #4
    </MenuItem>,
  ];
  return (
    <DropdownMenu menuItems={menuItems || dropdownMenuItems} {...rest}>
      <IconButton>
        <SvgMore />
      </IconButton>
    </DropdownMenu>
  );
};

WithSeparator.decorators = [
  (Story) => <div style={{ minHeight: 200 }}>{Story()}</div>,
];

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react';
import {
  MenuItem,
  DropdownButton,
  DropdownButtonProps,
} from '@itwin/itwinui-react';

export default {
  title: 'Buttons/DropdownButton',
  component: DropdownButton,
  argTypes: {
    style: { control: { disable: true } },
    className: { control: { disable: true } },
  },
} as Meta<DropdownButtonProps>;

export const Basic: Story<DropdownButtonProps> = (args) => {
  const { menuItems, children, ...rest } = args;
  const onClick = (index: number, close: () => void) => () => {
    action(`Item #${index} clicked!`)();
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

  return (
    <DropdownButton menuItems={menuItems || buttonMenuItems} {...rest}>
      {children}
    </DropdownButton>
  );
};

Basic.args = {
  children: 'Default',
};

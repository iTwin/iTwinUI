// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react';
import { MenuItem, SplitButton, SplitButtonProps } from '../../../src/core';
import { Position } from '../../../src/utils';

export default {
  title: 'Buttons/SplitButton',
  component: SplitButton,
  parameters: {
    docs: { description: { component: 'Generic SplitButton component' } },
  },
  argTypes: {
    menuPosition: {
      control: { type: 'select', options: Position },
      defaultValue: Position.BOTTOM_RIGHT,
    },
    style: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} as Meta<SplitButtonProps>;

export const Basic: Story<SplitButtonProps> = (args) => {
  const onClick = (index: number, close: () => void) => () => {
    action(`Item #${index} clicked!`)();
    close();
  };

  const menuItems = (close: () => void) => [
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
    <SplitButton
      onClick={action('Primary button clicked!')}
      menuItems={menuItems}
      styleType='default'
      {...args}
    >
      {args.children}
    </SplitButton>
  );
};

Basic.args = {
  children: 'Default',
  styleType: 'default',
};

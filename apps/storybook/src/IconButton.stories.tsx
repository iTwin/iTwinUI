/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { action } from '@storybook/addon-actions';
import { IconButton, IconButtonProps } from '@itwin/itwinui-react';
import { Story, Meta } from '@storybook/react';
import { SvgAdd } from '@itwin/itwinui-icons-react';

export default {
  title: 'Buttons/IconButton',
  component: IconButton,
  argTypes: {
    onClick: { control: { disable: true } },
    as: { type: { name: 'string', required: false } },
    styleType: {
      control: 'select',
    },
  },
} as Meta<IconButtonProps>;

export const Add: Story<IconButtonProps> = (args) => {
  return (
    <IconButton label='Add' onClick={action('clicked')} {...args}>
      <SvgAdd />
    </IconButton>
  );
};

Add.args = {
  label: 'Add',
  isActive: false,
};

export const SmallActiveAdd: Story<IconButtonProps> = (args) => {
  return (
    <IconButton label='Add' onClick={action('clicked')} isActive {...args}>
      <SvgAdd />
    </IconButton>
  );
};

SmallActiveAdd.args = {
  label: 'Add',
  size: 'small',
  isActive: true,
};

export const HighVisibilityAdd: Story<IconButtonProps> = (args) => {
  return (
    <IconButton label='Add' onClick={action('clicked')} {...args}>
      <SvgAdd />
    </IconButton>
  );
};

HighVisibilityAdd.args = {
  label: 'Add',
  isActive: false,
  styleType: 'high-visibility',
};

export const Borderless: Story<IconButtonProps> = ({ styleType, ...rest }) => {
  return (
    <IconButton
      label='Add'
      styleType={styleType}
      onClick={action('clicked')}
      {...rest}
    >
      <SvgAdd />
    </IconButton>
  );
};

Borderless.args = {
  label: 'Add',
  styleType: 'borderless',
};

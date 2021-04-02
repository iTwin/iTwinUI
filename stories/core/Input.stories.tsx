/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Input } from '../../src/core';
import { InputProps } from '../../src/core/Input/Input';

export default {
  title: 'Input/Input',
  component: Input,
} as Meta<InputProps>;

export const Basic: Story<InputProps> = (args) => {
  return <Input placeholder='Basic Input' {...args} />;
};

Basic.args = {
  placeholder: 'Basic Input',
  disabled: false,
};

export const Disabled: Story<InputProps> = (args) => {
  return <Input placeholder='Disabled Input' disabled={true} {...args} />;
};

Disabled.args = {
  placeholder: 'Disabled Input',
  disabled: true,
};

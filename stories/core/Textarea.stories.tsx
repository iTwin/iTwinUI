/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Textarea } from '../../src/core';
import { TextareaProps } from '../../src/core/Textarea/Textarea';

export default {
  title: 'Input/Textarea',
  component: Textarea,
  argTypes: {
    placeholder: { defaultValue: 'This is a textarea', type: 'string' },
  },
} as Meta<TextareaProps>;

export const Basic: Story<TextareaProps> = (args) => {
  return <Textarea placeholder={'This is a textarea'} {...args} />;
};

export const Disabled: Story<TextareaProps> = (args) => {
  return (
    <Textarea disabled={true} placeholder='This is a textarea' {...args} />
  );
};

Disabled.argTypes = {
  disabled: { defaultValue: true, type: 'boolean' },
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgCamera from '@bentley/icons-generic-react/cjs/icons/Camera';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { LabeledInput } from '../../src/core';
import { LabeledInputProps } from '../../src/core/LabeledInput/LabeledInput';

export default {
  title: 'Input/LabeledInput',
  component: LabeledInput,
  parameters: {
    docs: {
      description: {
        component:
          'Text input wrapper that provides additional styling and labeling',
      },
    },
  },
  argTypes: {
    label: { defaultValue: 'This is a label' },
    inputClassName: { table: { disable: true } },
    inputStyle: { table: { disable: true } },
    svgIcon: { table: { disable: true } },
    placeholder: { defaultValue: 'Enter text here...', type: 'string' },
    disabled: { type: 'boolean' },
  },
} as Meta<LabeledInputProps>;

export const Basic: Story<LabeledInputProps> = (args) => {
  return (
    <LabeledInput
      placeholder='Enter text here'
      label='This is a label'
      {...args}
    />
  );
};

export const WithMessage: Story<LabeledInputProps> = (args) => {
  return (
    <LabeledInput
      placeholder='Enter text here'
      message='This is a message'
      label='This is a label'
      {...args}
    />
  );
};

WithMessage.argTypes = {
  message: { defaultValue: 'This is a message' },
};

export const Disabled: Story<LabeledInputProps> = (args) => {
  return (
    <LabeledInput
      placeholder='Enter text here'
      message='This is a message'
      label='This is a label'
      disabled
      {...args}
    />
  );
};

Disabled.argTypes = {
  message: { defaultValue: 'This is a message' },
  disabled: { defaultValue: true },
};

export const Positive: Story<LabeledInputProps> = (args) => {
  return (
    <LabeledInput
      placeholder='Enter text here'
      label='This is a label'
      message='This is a message'
      status='positive'
      {...args}
    />
  );
};

Positive.argTypes = {
  status: { defaultValue: 'positive' },
  message: { defaultValue: 'This is a message' },
};

export const Warning: Story<LabeledInputProps> = (args) => {
  return (
    <LabeledInput
      placeholder='Enter text here'
      label='This is a label'
      message='This is a message'
      status='warning'
      {...args}
    />
  );
};

Warning.argTypes = {
  status: { defaultValue: 'warning' },
  message: { defaultValue: 'This is a message' },
};

export const Negative: Story<LabeledInputProps> = (args) => {
  return (
    <LabeledInput
      placeholder='Enter text here'
      label='This is a label'
      message='This is a message'
      status='negative'
      {...args}
    />
  );
};

Negative.argTypes = {
  status: { defaultValue: 'negative' },
  message: { defaultValue: 'This is a message' },
};

export const WithCustomIcon: Story<LabeledInputProps> = (args) => {
  return (
    <LabeledInput
      placeholder='Enter text here'
      label='This is a label'
      svgIcon={<SvgCamera />}
      {...args}
    />
  );
};

export const Inline: Story<LabeledInputProps> = (args) => {
  return (
    <LabeledInput
      placeholder='Enter text here'
      status='negative'
      label='This is a label'
      displayStyle='inline'
      {...args}
    />
  );
};

Inline.argTypes = {
  status: { defaultValue: 'negative' },
  displayStyle: { defaultValue: 'inline' },
};

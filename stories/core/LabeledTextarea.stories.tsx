import { SvgCamera } from '@bentley/icons-generic-react';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { LabeledTextarea } from '../../src/core';
import { LabeledTextareaProps } from '../../src/core/LabeledTextarea/LabeledTextarea';

export default {
  title: 'Input/LabeledTextarea',
  component: LabeledTextarea,
  parameters: {
    docs: {
      description: {
        component:
          'Textarea wrapper that allows for additional styling and labelling',
      },
    },
  },
  argTypes: {
    label: {
      defaultValue: 'Textarea Label',
    },
    placeholder: {
      defaultValue: 'This is a textarea',
      type: 'string',
    },
    message: {
      defaultValue: 'Display Message',
    },
    disabled: {
      defaultValue: false,
      type: 'boolean',
    },
  },
} as Meta<LabeledTextareaProps>;

export const Basic: Story<LabeledTextareaProps> = (args) => {
  return (
    <LabeledTextarea
      label='Textarea Label'
      message='Display Message'
      placeholder='This is a textarea'
      {...args}
    />
  );
};

export const Disabled: Story<LabeledTextareaProps> = (args) => {
  return (
    <LabeledTextarea
      label='Textarea Label'
      message='Display Message'
      placeholder='This is a textarea'
      disabled={true}
      {...args}
    />
  );
};

Disabled.argTypes = {
  disabled: { defaultValue: true },
};

export const Positive: Story<LabeledTextareaProps> = (args) => {
  return (
    <LabeledTextarea
      label='Textarea Label'
      message='Display Message'
      placeholder='This is a textarea'
      status='positive'
      {...args}
    />
  );
};

Positive.argTypes = {
  status: {
    defaultValue: 'positive',
  },
};

export const Warning: Story<LabeledTextareaProps> = (args) => {
  return (
    <LabeledTextarea
      label='Textarea Label'
      message='Display Message'
      placeholder='This is a textarea'
      status='warning'
      {...args}
    />
  );
};

Warning.argTypes = {
  status: {
    defaultValue: 'warning',
  },
};

export const Negative: Story<LabeledTextareaProps> = (args) => {
  return (
    <LabeledTextarea
      label='Textarea Label'
      message='Display Message'
      placeholder='This is a textarea'
      status='negative'
      {...args}
    />
  );
};

Negative.argTypes = {
  status: {
    defaultValue: 'negative',
  },
};

export const WithCustomIcon: Story<LabeledTextareaProps> = (args) => {
  return (
    <LabeledTextarea
      placeholder='Enter text here'
      label='This is a label'
      svgIcon={<SvgCamera />}
      {...args}
    />
  );
};

export const Inline: Story<LabeledTextareaProps> = (args) => {
  return (
    <LabeledTextarea
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

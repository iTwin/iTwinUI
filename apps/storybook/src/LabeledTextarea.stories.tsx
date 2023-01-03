/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgCamera from '@itwin/itwinui-icons-react/cjs/icons/Camera';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { LabeledTextarea, LabeledTextareaProps } from '@itwin/itwinui-react';

export default {
  title: 'Input/LabeledTextarea',
  component: LabeledTextarea,
  argTypes: {
    textareaClassName: { control: { disable: true } },
    textareaStyle: { control: { disable: true } },
    svgIcon: { control: { disable: true } },
  },
  args: {
    placeholder: 'This is a textarea',
    label: 'Textarea Label',
    message: 'Display Message',
    displayStyle: 'default',
    disabled: false,
  },
} as Meta<LabeledTextareaProps>;

export const Basic: Story<Partial<LabeledTextareaProps>> = (args) => {
  return (
    <LabeledTextarea
      label='Textarea Label'
      message='Display Message'
      placeholder='This is a textarea'
      {...args}
    />
  );
};

export const Disabled: Story<Partial<LabeledTextareaProps>> = (args) => {
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

Disabled.args = {
  disabled: true,
};

export const Positive: Story<Partial<LabeledTextareaProps>> = (args) => {
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

Positive.args = {
  status: 'positive',
};

export const Warning: Story<Partial<LabeledTextareaProps>> = (args) => {
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

Warning.args = {
  status: 'warning',
};

export const Negative: Story<Partial<LabeledTextareaProps>> = (args) => {
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

Negative.args = {
  status: 'negative',
};

export const WithCustomIcon: Story<Partial<LabeledTextareaProps>> = (args) => {
  return (
    <LabeledTextarea
      placeholder='Enter text here'
      label='This is a label'
      svgIcon={<SvgCamera />}
      {...args}
    />
  );
};

export const Inline: Story<Partial<LabeledTextareaProps>> = (args) => {
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

Inline.args = {
  status: 'negative',
  displayStyle: 'inline',
  message: undefined,
};

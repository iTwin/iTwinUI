/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { SvgCloseSmall, SvgPlaceholder } from '@itwin/itwinui-icons-react';
import SvgCamera from '@itwin/itwinui-icons-react/cjs/icons/Camera';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import {
  LabeledInput,
  Tooltip,
  IconButton,
  LabeledInputProps,
} from '@itwin/itwinui-react';

export default {
  title: 'Input/LabeledInput',
  component: LabeledInput,
  argTypes: {
    inputClassName: { control: { disable: true } },
    inputStyle: { control: { disable: true } },
    svgIcon: { control: { disable: true } },
    required: { type: 'boolean' },
  },
  args: {
    label: 'This is a label',
    placeholder: 'Enter text here...',
    displayStyle: 'default',
    disabled: false,
  },
} as Meta<LabeledInputProps>;

export const Basic: Story<LabeledInputProps> = (args) => {
  return (
    <LabeledInput
      placeholder='Enter text here...'
      label='This is a label'
      {...args}
    />
  );
};

export const WithMessage: Story<LabeledInputProps> = (args) => {
  return (
    <LabeledInput
      placeholder='Enter text here...'
      message='This is a message'
      label='This is a label'
      {...args}
    />
  );
};

WithMessage.args = {
  message: 'This is a message',
};

export const Disabled: Story<LabeledInputProps> = (args) => {
  return (
    <LabeledInput
      placeholder='Enter text here...'
      message='This is a message'
      label='This is a label'
      disabled
      {...args}
    />
  );
};

Disabled.args = {
  message: 'This is a message',
  disabled: true,
};

export const Positive: Story<LabeledInputProps> = (args) => {
  return (
    <LabeledInput
      placeholder='Enter text here...'
      label='This is a label'
      message='This is a message'
      status='positive'
      {...args}
    />
  );
};

Positive.args = {
  status: 'positive',
  message: 'This is a message',
};

export const Warning: Story<LabeledInputProps> = (args) => {
  return (
    <LabeledInput
      placeholder='Enter text here...'
      label='This is a label'
      message='This is a message'
      status='warning'
      {...args}
    />
  );
};

Warning.args = {
  status: 'warning',
  message: 'This is a message',
};

export const Negative: Story<LabeledInputProps> = (args) => {
  return (
    <LabeledInput
      placeholder='Enter text here...'
      label='This is a label'
      message='This is a message'
      status='negative'
      {...args}
    />
  );
};

Negative.args = {
  status: 'negative',
  message: 'This is a message',
};

export const WithCustomIcon: Story<LabeledInputProps> = (args) => {
  return (
    <LabeledInput
      placeholder='Enter text here...'
      label='This is a label'
      message='⬅ This is a custom icon'
      svgIcon={<SvgCamera />}
      {...args}
    />
  );
};

export const Inline: Story<LabeledInputProps> = (args) => {
  return (
    <LabeledInput
      placeholder='Enter text here...'
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
};

export const HybridLayout: Story<LabeledInputProps> = (args) => {
  const ref = React.useRef(null);
  return (
    <>
      <LabeledInput
        placeholder='Enter text here...'
        label='This is a label'
        svgIcon={
          <div ref={ref}>
            <SvgPlaceholder />
          </div>
        }
        message='Block layout with inline icon'
        iconDisplayStyle='inline'
        {...args}
      />
      <Tooltip reference={ref} content='Placeholder' />
    </>
  );
};

HybridLayout.args = {
  iconDisplayStyle: 'inline',
  message: 'Block layout with inline icon',
};

export const HybridLayoutWithButton: Story<LabeledInputProps> = (args) => {
  return (
    <LabeledInput
      placeholder='Enter text here...'
      label='This is a label'
      svgIcon={
        <IconButton styleType='borderless'>
          <SvgCloseSmall />
        </IconButton>
      }
      message='Block layout with inline borderless button'
      iconDisplayStyle='inline'
      {...args}
    />
  );
};

HybridLayoutWithButton.args = {
  message: 'Block layout with inline borderless button',
  iconDisplayStyle: 'inline',
};

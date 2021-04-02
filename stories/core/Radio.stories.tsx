/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Radio } from '../../src/core';
import { RadioProps } from '../../src/core/Radio/Radio';
export default {
  title: 'Input/Radio',
  component: Radio,
  argTypes: {
    checkmarkClassName: { control: { disable: true } },
    checkmarkStyle: { control: { disable: true } },
  },
} as Meta<RadioProps>;

export const Basic: Story<RadioProps> = (args) => {
  const { label = 'Choose me!', ...rest } = args;
  return <Radio label={label} {...rest} />;
};

Basic.argTypes = {
  label: { defaultValue: 'Choose me!' },
};

export const Disabled: Story<RadioProps> = (args) => {
  const { label = 'Cannot choose me!', disabled = true, ...rest } = args;
  return <Radio disabled={disabled} label={label} {...rest} />;
};

Disabled.argTypes = {
  label: { defaultValue: 'Cannot choose me!' },
  disabled: { defaultValue: true, type: 'boolean' },
};

export const Positive: Story<RadioProps> = (args) => {
  const { label = 'Positive!', status = 'positive', ...rest } = args;
  return <Radio status={status} label={label} {...rest} />;
};

Positive.argTypes = {
  label: { defaultValue: 'Positive!' },
  status: { defaultValue: 'positive' },
};

export const Warning: Story<RadioProps> = (args) => {
  const { label = 'Careful!', status = 'warning', ...rest } = args;
  return <Radio status={status} label={label} {...rest} />;
};

Warning.argTypes = {
  label: { defaultValue: 'Careful!' },
  status: { defaultValue: 'warning' },
};

export const Negative: Story<RadioProps> = (args) => {
  const { label = 'Bad idea...', status = 'negative', ...rest } = args;
  return <Radio status={status} label={label} {...rest} />;
};

Negative.argTypes = {
  label: { defaultValue: 'Bad idea...' },
  status: { defaultValue: 'negative' },
};

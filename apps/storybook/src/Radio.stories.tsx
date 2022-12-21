/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Radio, RadioProps } from '@itwin/itwinui-react';
export default {
  title: 'Input/Radio',
  component: Radio,
} as Meta<RadioProps>;

export const Basic: Story<RadioProps> = (args) => {
  const { label = 'Choose me!', defaultChecked = true, ...rest } = args;
  return <Radio label={label} defaultChecked={defaultChecked} {...rest} />;
};

Basic.args = {
  label: 'Choose me!',
  defaultChecked: true,
};

export const Disabled: Story<RadioProps> = (args) => {
  const { label = 'Cannot choose me!', disabled = true, ...rest } = args;
  return <Radio disabled={disabled} label={label} {...rest} />;
};

Disabled.args = {
  label: 'Cannot choose me!',
  disabled: true,
};

export const Positive: Story<RadioProps> = (args) => {
  const { label = 'Positive!', status = 'positive', ...rest } = args;
  return <Radio status={status} label={label} {...rest} />;
};

Positive.args = {
  label: 'Positive!',
  status: 'positive',
};

export const Warning: Story<RadioProps> = (args) => {
  const { label = 'Careful!', status = 'warning', ...rest } = args;
  return <Radio status={status} label={label} {...rest} />;
};

Warning.args = {
  label: 'Careful!',
  status: 'warning',
};

export const Negative: Story<RadioProps> = (args) => {
  const { label = 'Bad idea...', status = 'negative', ...rest } = args;
  return <Radio status={status} label={label} {...rest} />;
};

Negative.args = {
  label: 'Bad idea...',
  status: 'negative',
};

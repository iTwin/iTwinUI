/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Checkbox, CheckboxProps } from '@itwin/itwinui-react';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'Input/Checkbox',
  component: Checkbox,
} as Meta<CheckboxProps>;

export const Basic: Story<CheckboxProps> = (args) => {
  const { label = 'Basic Checkbox', defaultChecked = true, ...rest } = args;
  return <Checkbox label={label} defaultChecked={defaultChecked} {...rest} />;
};

Basic.args = {
  label: 'Basic Checkbox',
  defaultChecked: true,
};

export const Disabled: Story<CheckboxProps> = (args) => {
  const { label = 'Disabled Checkbox', disabled = true, ...rest } = args;
  return <Checkbox label={label} disabled={disabled} {...rest} />;
};

Disabled.args = {
  label: 'Disabled Checkbox',
  disabled: true,
};

export const Indeterminate: Story<CheckboxProps> = (args) => {
  const {
    label = 'Indeterminate Checkbox',
    indeterminate = true,
    ...rest
  } = args;
  return <Checkbox label={label} indeterminate={indeterminate} {...rest} />;
};

Indeterminate.args = {
  label: 'Indeterminate Checkbox',
  indeterminate: true,
};

export const Positive: Story<CheckboxProps> = (args) => {
  const { label = 'Positive Checkbox', status = 'positive', ...rest } = args;
  return <Checkbox label={label} status={status} {...rest} />;
};

Positive.args = {
  label: 'Positive Checkbox',
  status: 'positive',
};

export const Warning: Story<CheckboxProps> = (args) => {
  const { label = 'Warning Checkbox', status = 'warning', ...rest } = args;
  return <Checkbox label={label} status={status} {...rest} />;
};

Warning.args = {
  label: 'Warning Checkbox',
  status: 'warning',
};

export const Negative: Story<CheckboxProps> = (args) => {
  const { label = 'Negative Checkbox', status = 'negative', ...rest } = args;
  return <Checkbox label={label} status={status} {...rest} />;
};

Negative.args = {
  label: 'Negative Checkbox',
  status: 'negative',
};

export const Loading: Story<CheckboxProps> = (args) => {
  const { label = 'Loading Checkbox', isLoading = true, ...rest } = args;
  return <Checkbox label={label} isLoading={isLoading} {...rest} />;
};

Loading.args = {
  label: 'Loading Checkbox',
  isLoading: true,
};

export const Visibility: Story<CheckboxProps> = (args) => {
  const { label = 'Visibility Checkbox', variant = 'eyeball', ...rest } = args;
  return <Checkbox label={label} variant={variant} {...rest} />;
};

Visibility.args = {
  label: 'Visibility Checkbox',
  variant: 'eyeball',
};

import React from 'react';
import { Checkbox } from '../../src/core';
import { CheckboxProps } from '../../src/core/Checkbox/Checkbox';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'Input/Checkbox',
  component: Checkbox,
  parameters: { docs: { description: { component: 'Simple input checkbox' } } },
  argTypes: {
    checkmarkClassName: { table: { disable: true } },
    checkmarkStyle: { table: { disable: true } },
  },
} as Meta<CheckboxProps>;

export const Basic: Story<CheckboxProps> = (args) => {
  const { label = 'Basic Checkbox', ...rest } = args;
  return <Checkbox label={label} {...rest} />;
};

Basic.args = {
  label: 'Basic Checkbox',
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

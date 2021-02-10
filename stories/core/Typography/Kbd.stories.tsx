// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Kbd, KbdKeys, KbdProps } from '../../../src/core';

export default {
  title: 'Typography/Keyboard Key',
  component: Kbd,
  parameters: {
    docs: { description: { component: 'Basic inline Kbd component' } },
  },
  argTypes: {
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    title: { table: { disable: true } },
    children: {
      defaultValue: 'A',
      type: 'string',
    },
  },
} as Meta<KbdProps>;

export const Basic: Story<KbdProps> = ({ children, ...rest }) => {
  return <Kbd {...rest}>{children}</Kbd>;
};

export const PredefinedKey: Story<KbdProps> = ({ children, ...rest }) => {
  return <Kbd {...rest}>{children}</Kbd>;
};

PredefinedKey.argTypes = {
  children: {
    defaultValue: KbdKeys.Enter,
    control: { type: 'select', options: KbdKeys },
  },
};

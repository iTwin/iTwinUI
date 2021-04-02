/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Kbd, KbdKeys, KbdProps } from '../../../src/core';

export default {
  title: 'Typography/Keyboard Key',
  component: Kbd,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    title: { control: { disable: true } },
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

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Kbd, KbdKeys } from '@itwin/itwinui-react';

type KbdProps = React.ComponentProps<typeof Kbd>;

export default {
  title: 'Typography/Keyboard Key',
  component: Kbd,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    title: { control: { disable: true } },
  },
  args: {
    children: 'A',
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
    control: { type: 'select', options: KbdKeys },
  },
};
PredefinedKey.args = { children: KbdKeys.Enter };

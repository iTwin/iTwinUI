/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Textarea } from '@itwin/itwinui-react';

type TextareaProps = React.ComponentProps<typeof Textarea>;

export default {
  title: 'Input/Textarea',
  component: Textarea,
  args: {
    placeholder: 'This is a textarea',
  },
} as Meta<TextareaProps>;

export const Basic: Story<TextareaProps> = (args) => {
  return <Textarea placeholder={'This is a textarea'} {...args} />;
};

export const Disabled: Story<TextareaProps> = (args) => {
  return (
    <Textarea disabled={true} placeholder='This is a textarea' {...args} />
  );
};

Disabled.args = {
  disabled: true,
};

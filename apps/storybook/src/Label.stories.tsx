/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { Input, Label, LabelProps, Text } from '@itwin/itwinui-react';

export default {
  component: Label,
  args: {
    children: 'Name',
    displayStyle: 'block',
    required: false,
    as: 'label',
  },
  title: 'Typography/Label',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 'clamp(300px, 50%, 100%)' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<LabelProps>;

export const Basic: Story<LabelProps> = (args) => {
  return (
    <>
      <Label htmlFor='text-input' {...args}>
        Name
      </Label>
      <Input id='text-input' placeholder='Enter name' />
    </>
  );
};
Basic.args = {};

export const Inline: Story<LabelProps> = (args) => {
  return (
    <div style={{ display: 'flex' }}>
      <Label htmlFor='text-input' displayStyle='inline' required {...args}>
        Name
      </Label>
      <Input id='text-input' defaultValue='James Bond' required />
    </div>
  );
};
Inline.args = {
  displayStyle: 'inline',
  required: true,
};

export const Polymorphic: Story<LabelProps<'div'>> = (args) => {
  return (
    <div style={{ display: 'flex' }}>
      <Label displayStyle='inline' as='div' {...args}>
        <Text isMuted>Name:</Text>
      </Label>
      <Text>James Bond</Text>
    </div>
  );
};
Polymorphic.args = {
  displayStyle: 'inline',
  as: 'div',
} as LabelProps<'div'>;

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Anchor } from '@itwin/itwinui-react';
import { AnchorProps } from '@itwin/itwinui-react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Typography/Anchor',
  component: Anchor,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  argTypes: {},
} as Meta;

export const Basic: Story<AnchorProps> = (args) => {
  return (
    <Anchor href='https://www.example.com/' {...args}>
      www.example.com
    </Anchor>
  );
};
Basic.args = {
  href: 'https://www.example.com/',
  children: 'www.example.com',
};

export const AsButton: Story<AnchorProps<'button'>> = (args) => {
  return (
    <Anchor as='button' onClick={action('clicked')} {...args}>
      perform action
    </Anchor>
  );
};
AsButton.args = {
  as: 'button',
  children: 'perform action',
} as AnchorProps<'button'>;

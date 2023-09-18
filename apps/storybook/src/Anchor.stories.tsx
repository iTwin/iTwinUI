/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Anchor } from '@itwin/itwinui-react';
import { action } from '@storybook/addon-actions';

type AnchorProps = React.ComponentProps<typeof Anchor>;

export default {
  title: 'Typography/Anchor',
  component: Anchor,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  argTypes: {},
} as Meta;

export const Basic: Story<AnchorProps> = () => {
  return <Anchor href='https://www.example.com/'>www.example.com</Anchor>;
};

export const AsButton: Story<AnchorProps> = () => {
  return (
    <Anchor as='button' onClick={action('clicked')}>
      Perform action
    </Anchor>
  );
};

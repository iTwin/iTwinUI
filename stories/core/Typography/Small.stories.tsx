/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Small } from '../../../src/core/Typography/Small';
import { SmallProps } from '../../../src/core/Typography/Small/Small';

export default {
  title: 'Typography/Small',
  component: Small,
  parameters: { docs: { description: { component: 'Small component' } } },
  args: {
    children: "I'm a Small",
    isMuted: false,
  },
} as Meta<SmallProps>;

const SmallStory: Story<SmallProps> = (args) => {
  const { children, ...rest } = args;
  return <Small {...rest}>{children}</Small>;
};

export const Base: Story<SmallProps> = SmallStory.bind({});
Base.args = {} as SmallProps;

export const Muted: Story<SmallProps> = SmallStory.bind({});
Muted.args = { isMuted: true } as SmallProps;

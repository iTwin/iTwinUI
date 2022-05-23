/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Small, SmallProps } from '@itwin/itwinui-react';
import { Meta, Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'Typography/Small',
  component: Small,
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

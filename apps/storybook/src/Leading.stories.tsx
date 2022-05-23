/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Leading, LeadingProps } from '@itwin/itwinui-react';
import { Meta, Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'Typography/Leading',
  component: Leading,
  args: {
    children: "I'm a Leading",
    isMuted: false,
  },
} as Meta<LeadingProps>;

const LeadingStory: Story<LeadingProps> = (args) => {
  const { children, ...rest } = args;
  return <Leading {...rest}>{children}</Leading>;
};

export const Base: Story<LeadingProps> = LeadingStory.bind({});
Base.args = {} as LeadingProps;

export const Muted: Story<LeadingProps> = LeadingStory.bind({});
Muted.args = { isMuted: true } as LeadingProps;

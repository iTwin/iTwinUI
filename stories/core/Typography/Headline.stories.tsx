// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Headline } from '../../../src/core';
import { HeadlineProps } from '../../../src/core/Typography/Headline/Headline';

export default {
  title: 'Typography/Headline',
  component: Headline,
  parameters: { docs: { description: { component: 'Headline component' } } },
  args: {
    children: "I'm a Headline",
    isMuted: false,
  },
} as Meta<HeadlineProps>;

const HeadlineStory: Story<HeadlineProps> = (args) => {
  const { children, ...rest } = args;
  return <Headline {...rest}>{children}</Headline>;
};

export const Base: Story<HeadlineProps> = HeadlineStory.bind({});
Base.args = {} as HeadlineProps;

export const Muted: Story<HeadlineProps> = HeadlineStory.bind({});
Muted.args = { isMuted: true } as HeadlineProps;

// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Body } from '../../../src/core/Typography/Body';
import { BodyProps } from '../../../src/core/Typography/Body/Body';

export default {
  title: 'Typography/Body',
  component: Body,
  parameters: { docs: { description: { component: 'Body component' } } },
  args: {
    children: "I'm a Body",
    isMuted: false,
    isSkeleton: false,
  },
} as Meta<BodyProps>;

const BodyStory: Story<BodyProps> = (args) => {
  const { children, ...rest } = args;
  return <Body {...rest}>{children}</Body>;
};

export const Basic: Story<BodyProps> = BodyStory.bind({});
Basic.args = {} as BodyProps;

export const Muted: Story<BodyProps> = BodyStory.bind({});
Muted.args = { isMuted: true } as BodyProps;

export const Skeleton: Story<BodyProps> = BodyStory.bind({});
Skeleton.args = { isSkeleton: true } as BodyProps;

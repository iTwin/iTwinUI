/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Subheading } from '../../../src/core/Typography/Subheading';
import { SubheadingProps } from '../../../src/core/Typography/Subheading/Subheading';

export default {
  title: 'Typography/Subheading',
  component: Subheading,
  args: {
    children: "I'm a Subheading",
    isMuted: false,
  },
} as Meta<SubheadingProps>;

const SubheadingStory: Story<SubheadingProps> = (args) => {
  const { children, ...rest } = args;
  return <Subheading {...rest}>{children}</Subheading>;
};

export const Base: Story<SubheadingProps> = SubheadingStory.bind({});
Base.args = {} as SubheadingProps;

export const Muted: Story<SubheadingProps> = SubheadingStory.bind({});
Muted.args = { isMuted: true } as SubheadingProps;

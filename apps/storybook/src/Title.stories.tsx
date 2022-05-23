/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Title, TitleProps } from '@itwin/itwinui-react';
import { Meta, Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'Typography/Title',
  component: Title,
  args: {
    children: "I'm a Title",
    isMuted: false,
  },
} as Meta<TitleProps>;

const TitleStory: Story<TitleProps> = (args) => {
  const { children, ...rest } = args;
  return <Title {...rest}>{children}</Title>;
};
export const Base: Story<TitleProps> = TitleStory.bind({});
Base.args = {} as TitleProps;

export const Muted: Story<TitleProps> = TitleStory.bind({});
Muted.args = { isMuted: true } as TitleProps;

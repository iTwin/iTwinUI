/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Blockquote, BlockquoteProps } from '@itwin/itwinui-react';

export default {
  title: 'Typography/Blockquote',
  component: Blockquote,
  args: {
    children: 'This is a quote',
    cite: '',
  },
} as Meta<BlockquoteProps>;

export const Basic: Story<BlockquoteProps> = (args) => {
  return <Blockquote {...args}>{args.children}</Blockquote>;
};

export const WithFooter: Story<BlockquoteProps> = (args) => {
  const { children, cite, footer, ...rest } = args;
  return (
    <Blockquote cite={cite} footer={footer} {...rest}>
      {children}
    </Blockquote>
  );
};

WithFooter.args = {
  children: (
    <p>
      For 36 years we have served engineers with our software, passionately
      believing that better performing and more resilient infrastructure is
      essential to improve the quality of life for people everywhere, sustain
      our environment, and grow our economies.
    </p>
  ),
  cite: 'https://www.bentley.com/en',
  footer: (
    <>
      — Greg Bentley, <cite>NasdaqListed</cite>
    </>
  ),
};

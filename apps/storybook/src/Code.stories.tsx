/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Code, CodeProps } from '@itwin/itwinui-react';

export default {
  title: 'Typography/Code',
  component: Code,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    title: { control: { disable: true } },
  },
  args: {
    children: 'push()',
  },
} as Meta<CodeProps>;

export const Basic: Story<CodeProps> = ({ children }) => {
  return (
    <p>
      The <Code>{children}</Code> method adds one or more elements to the end of
      an array and returns the new length of the array.
    </p>
  );
};

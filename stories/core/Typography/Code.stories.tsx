import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Code, CodeProps } from '../../../src/core';

export default {
  title: 'Typography/Code',
  component: Code,
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: { description: { component: 'Basic inline code component' } },
  },
  argTypes: {
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    title: { table: { disable: true } },
    children: { defaultValue: 'push()', type: 'string' },
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

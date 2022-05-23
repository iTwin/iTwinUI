/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { ProgressRadial, ProgressRadialProps } from '@itwin/itwinui-react';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'ProgressIndicators/ProgressRadial',
  component: ProgressRadial,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    title: { control: { disable: true } },
    id: { control: { disable: true } },
  },
  args: {
    value: 50,
  },
} as Meta<ProgressRadialProps>;

export const Determinate: Story<ProgressRadialProps> = (args) => {
  const { value = 50, ...rest } = args;
  return <ProgressRadial value={value} {...rest} />;
};

export const Indeterminate: Story<ProgressRadialProps> = (args) => {
  const { indeterminate = true, ...rest } = args;
  return <ProgressRadial indeterminate={indeterminate} {...rest} />;
};

Indeterminate.args = {
  indeterminate: true,
};

export const Positive: Story<ProgressRadialProps> = (args) => {
  const { status = 'positive', ...rest } = args;
  return <ProgressRadial status={status} {...rest} />;
};

Positive.args = {
  status: 'positive',
};

export const Negative: Story<ProgressRadialProps> = (args) => {
  const { status = 'negative', ...rest } = args;
  return <ProgressRadial status={status} {...rest} />;
};

Negative.args = {
  status: 'negative',
};

export const DeterminateWithContent: Story<ProgressRadialProps> = (args) => {
  const { value = 50, ...rest } = args;
  return (
    <ProgressRadial value={value} {...rest}>
      {args.children}
    </ProgressRadial>
  );
};

DeterminateWithContent.args = {
  children: '50',
};

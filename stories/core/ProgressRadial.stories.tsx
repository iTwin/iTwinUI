import React from 'react';
import { ProgressRadial } from '../../src/core';
import { Story, Meta } from '@storybook/react';
import { ProgressRadialProps } from '../../src/core/ProgressIndicators/ProgressRadial/ProgressRadial';

export default {
  title: 'ProgressIndicators/ProgressRadial',
  component: ProgressRadial,
  parameters: {
    docs: { description: { component: 'Circular Progress Indicator' } },
  },
  argTypes: {
    value: { defaultValue: 50 },
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

Indeterminate.argTypes = {
  indeterminate: { defaultValue: true },
};

export const Positive: Story<ProgressRadialProps> = (args) => {
  const { status = 'positive', ...rest } = args;
  return <ProgressRadial status={status} {...rest} />;
};

Positive.argTypes = {
  status: { defaultValue: 'positive' },
};

export const Negative: Story<ProgressRadialProps> = (args) => {
  const { status = 'negative', ...rest } = args;
  return <ProgressRadial status={status} {...rest} />;
};

Negative.argTypes = {
  status: { defaultValue: 'negative' },
};

export const DeterminateWithContent: Story<
  React.PropsWithChildren<ProgressRadialProps>
> = (args) => {
  const { value = 50, ...rest } = args;
  return (
    <ProgressRadial value={value} {...rest}>
      {args.children}
    </ProgressRadial>
  );
};

DeterminateWithContent.argTypes = {
  children: { defaultValue: '50', type: 'string' },
};

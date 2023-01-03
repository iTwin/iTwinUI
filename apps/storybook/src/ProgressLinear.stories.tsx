/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable react/jsx-key */
import SvgStatusErrorHollow from '@itwin/itwinui-icons-react/cjs/icons/StatusErrorHollow';
import SvgStatusSuccessHollow from '@itwin/itwinui-icons-react/cjs/icons/StatusSuccessHollow';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { ProgressLinear, ProgressLinearProps } from '@itwin/itwinui-react';

export default {
  title: 'ProgressIndicators/ProgressLinear',
  component: ProgressLinear,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    title: { control: { disable: true } },
    id: { control: { disable: true } },
  },
} as Meta<ProgressLinearProps>;

export const Determinate: Story<ProgressLinearProps> = (args) => {
  const { value = 50, ...rest } = args;
  return <ProgressLinear value={value} {...rest} />;
};

Determinate.args = {
  value: 50,
};

export const DeterminateAnimated: Story<ProgressLinearProps> = (args) => {
  const { value = 50, isAnimated = true, ...rest } = args;
  return <ProgressLinear value={value} isAnimated={isAnimated} {...rest} />;
};

DeterminateAnimated.args = {
  isAnimated: true,
  value: 50,
};

export const Indeterminate: Story<ProgressLinearProps> = (args) => {
  const { indeterminate = true, ...rest } = args;
  return <ProgressLinear indeterminate={indeterminate} {...rest} />;
};

Indeterminate.args = {
  indeterminate: true,
};

export const LabeledCenter: Story<ProgressLinearProps> = (args) => {
  const { value = 50, labels = ['Centered Label'], ...rest } = args;
  return <ProgressLinear value={value} labels={labels} {...rest} />;
};

LabeledCenter.args = {
  labels: ['Centered Label'],
  value: 50,
};

export const LabeledLeftRight: Story<ProgressLinearProps> = (args) => {
  const { value = 50, labels = ['Loading...', '50%'], ...rest } = args;
  return <ProgressLinear value={value} labels={labels} {...rest} />;
};

LabeledLeftRight.args = {
  labels: ['Loading...', '50%'],
  value: 50,
};

export const Positive: Story<ProgressLinearProps> = (args) => {
  const {
    value = 100,
    labels = ['Upload done!', <SvgStatusSuccessHollow />],
    status = 'positive',
    ...rest
  } = args;
  return (
    <ProgressLinear value={value} labels={labels} status={status} {...rest} />
  );
};

Positive.args = {
  labels: ['Upload done!', <SvgStatusSuccessHollow />],
  status: 'positive',
  value: 100,
};

export const Negative: Story<ProgressLinearProps> = (args) => {
  const {
    value = 45,
    labels = ['Upload failed', <SvgStatusErrorHollow />],
    status = 'negative',
    ...rest
  } = args;
  return (
    <ProgressLinear value={value} labels={labels} status={status} {...rest} />
  );
};

Negative.args = {
  labels: ['Upload failed', <SvgStatusErrorHollow />],
  status: 'negative',
  value: 45,
};

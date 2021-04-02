/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable react/jsx-key */
import SvgErrorHollow from '@bentley/icons-generic-react/cjs/icons/status/ErrorHollow';
import SvgSuccessHollow from '@bentley/icons-generic-react/cjs/icons/status/SuccessHollow';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { ProgressLinear } from '../../src/core';
import { ProgressLinearProps } from '../../src/core/ProgressIndicators/ProgressLinear/ProgressLinear';

export default {
  title: 'ProgressIndicators/ProgressLinear',
  component: ProgressLinear,
} as Meta<ProgressLinearProps>;

export const Determinate: Story<ProgressLinearProps> = (args) => {
  const { value = 50, ...rest } = args;
  return <ProgressLinear value={value} {...rest} />;
};

Determinate.argTypes = {
  value: { defaultValue: 50 },
};

export const DeterminateAnimated: Story<ProgressLinearProps> = (args) => {
  const { value = 50, isAnimated = true, ...rest } = args;
  return <ProgressLinear value={value} isAnimated={isAnimated} {...rest} />;
};

DeterminateAnimated.argTypes = {
  isAnimated: { defaultValue: true },
  value: { defaultValue: 50 },
};

export const Indeterminate: Story<ProgressLinearProps> = (args) => {
  const { indeterminate = true, ...rest } = args;
  return <ProgressLinear indeterminate={indeterminate} {...rest} />;
};

Indeterminate.argTypes = {
  indeterminate: { defaultValue: true },
};

export const LabeledCenter: Story<ProgressLinearProps> = (args) => {
  const { value = 50, labels = ['Centered Label'], ...rest } = args;
  return <ProgressLinear value={value} labels={labels} {...rest} />;
};

LabeledCenter.argTypes = {
  labels: { defaultValue: ['Centered Label'] },
  value: { defaultValue: 50 },
};

export const LabeledLeftRight: Story<ProgressLinearProps> = (args) => {
  const { value = 50, labels = ['Loading...', '50%'], ...rest } = args;
  return <ProgressLinear value={value} labels={labels} {...rest} />;
};

LabeledLeftRight.argTypes = {
  labels: ['Loading...', '50%'],
  value: { defaultValue: 50 },
};

export const Positive: Story<ProgressLinearProps> = (args) => {
  const {
    value = 100,
    labels = ['Upload done!', <SvgSuccessHollow className='iui-icon' />],
    status = 'positive',
    ...rest
  } = args;
  return (
    <ProgressLinear value={value} labels={labels} status={status} {...rest} />
  );
};

Positive.argTypes = {
  labels: {
    defaultValue: ['Upload done!', <SvgSuccessHollow className='iui-icon' />],
  },
  status: { defaultValue: 'positive' },
  value: { defaultValue: 100 },
};

export const Negative: Story<ProgressLinearProps> = (args) => {
  const {
    value = 45,
    labels = ['Upload failed', <SvgErrorHollow className='iui-icon' />],
    status = 'negative',
    ...rest
  } = args;
  return (
    <ProgressLinear value={value} labels={labels} status={status} {...rest} />
  );
};

Negative.argTypes = {
  labels: {
    defaultValue: ['Upload failed', <SvgErrorHollow className='iui-icon' />],
  },
  status: { defaultValue: 'negative' },
  value: { defaultValue: 45 },
};

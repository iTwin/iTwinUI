/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Alert } from '../../src/core';
import { AlertProps } from '../../src/core/Alert/Alert';

export default {
  title: 'Core/Alert',
  component: Alert,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    onClick: { control: { disable: true } },
    onClose: { control: { disable: true } },
    clickableText: { type: 'string' },
  },
} as Meta<AlertProps>;

export const Informational: Story<AlertProps> = (args) => {
  return (
    <Alert
      type='informational'
      clickableText='More Info.'
      onClose={action('Close!')}
      onClick={action('Clicked more info!')}
      {...args}
    >
      {args.children}
    </Alert>
  );
};

Informational.args = {
  children: 'This is an informational message.',
  clickableText: 'More Info.',
  type: 'informational',
};

export const Positive: Story<AlertProps> = (args) => {
  return (
    <Alert
      type='positive'
      clickableText='More Info.'
      onClose={action('Close!')}
      onClick={action('Clicked more info!')}
      {...args}
    >
      {args.children}
    </Alert>
  );
};

Positive.args = {
  children: 'This is a positive message.',
  clickableText: 'More Info.',
  type: 'positive',
};

export const Warning: Story<AlertProps> = (args) => {
  return (
    <Alert
      type='warning'
      clickableText='More Info.'
      onClose={action('Close!')}
      onClick={action('Clicked more info!')}
      {...args}
    >
      {args.children}
    </Alert>
  );
};

Warning.args = {
  children: 'This is a warning message.',
  clickableText: 'More Info.',
  type: 'warning',
};

export const Negative: Story<AlertProps> = (args) => {
  return (
    <Alert
      type='negative'
      clickableText='More Info.'
      onClose={action('Close!')}
      onClick={action('Clicked more info!')}
      {...args}
    >
      {args.children}
    </Alert>
  );
};

Negative.args = {
  children: 'This is a negative message.',
  clickableText: 'More Info.',
  type: 'negative',
};

export const Sticky: Story<AlertProps> = (args) => {
  return (
    <Alert
      clickableText='More Info.'
      onClose={action('Close!')}
      onClick={action('Clicked more info!')}
      {...args}
    >
      {args.children}
    </Alert>
  );
};

Sticky.args = {
  children: 'This is sticky!',
  clickableText: 'More Info.',
  type: 'informational',
  isSticky: true,
};

export const Empty: Story<AlertProps> = (args) => {
  return (
    <Alert type='informational' {...args}>
      {args.children}
    </Alert>
  );
};

Empty.args = {
  children: 'This is empty info message.',
  type: 'informational',
};

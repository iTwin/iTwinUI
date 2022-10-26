/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Alert, AlertProps } from '@itwin/itwinui-react';

export default {
  title: 'Core/Alert',
  component: Alert,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    id: { control: { disable: true } },
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
      clickableTextProps={{ onClick: action('Clicked more info!') }}
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
      clickableTextProps={{ onClick: action('Clicked more info!') }}
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
      clickableTextProps={{ onClick: action('Clicked more info!') }}
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
      clickableTextProps={{ onClick: action('Clicked more info!') }}
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
    <div
      style={{
        height: '150px',
        overflow: 'overlay',
        textAlign: 'justify',
        border: 'solid 0.5px',
      }}
    >
      <Alert
        clickableText='More Info.'
        onClose={action('Close!')}
        clickableTextProps={{ onClick: action('Clicked more info!') }}
        {...args}
      >
        {args.children}
      </Alert>
      <p style={{ margin: 0, padding: '8px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
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

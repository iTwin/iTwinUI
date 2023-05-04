/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Alert, AlertProps } from '@itwin/itwinui-react';
import { SvgCollapse, SvgSmileyHappy } from '@itwin/itwinui-icons-react';

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
    <Alert type='informational' {...args}>
      <Alert.Icon type='informational' />
      <Alert.Message>
        This is an informational message.
        <Alert.ClickableText onClick={() => action('Clicked more info!')}>
          More Info.
        </Alert.ClickableText>
      </Alert.Message>
      <Alert.CloseButton onClose={action('Close!')} />
    </Alert>
  );
};

Informational.args = {
  children: 'This is an informational message.',
  type: 'informational',
};

export const Positive: Story<AlertProps> = (args) => {
  return (
    <Alert type='positive' {...args}>
      <Alert.Icon type='positive' />
      <Alert.Message>
        This is a positive message.
        <Alert.ClickableText onClick={() => action('Clicked more info!')}>
          More Info.
        </Alert.ClickableText>
      </Alert.Message>
      <Alert.CloseButton onClose={action('Close!')} />
    </Alert>
  );
};

Positive.args = {
  children: 'This is a positive message.',
  type: 'positive',
};

export const Warning: Story<AlertProps> = (args) => {
  return (
    <Alert type='warning' {...args}>
      <Alert.Icon type='warning' />
      <Alert.Message>
        This is a warning message.
        <Alert.ClickableText onClick={() => action('Clicked more info!')}>
          More Info.
        </Alert.ClickableText>
      </Alert.Message>
      <Alert.CloseButton onClose={action('Close!')} />
    </Alert>
  );
};

Warning.args = {
  children: 'This is a warning message.',
  type: 'warning',
};

export const Negative: Story<AlertProps> = (args) => {
  return (
    <Alert type='negative' {...args}>
      <Alert.Icon type='negative' />
      <Alert.Message>
        This is a negative message.
        <Alert.ClickableText onClick={() => action('Clicked more info!')}>
          More Info.
        </Alert.ClickableText>
      </Alert.Message>
      <Alert.CloseButton onClose={action('Close!')} />
    </Alert>
  );
};

Negative.args = {
  children: 'This is a negative message.',
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
      <Alert type='informational' isSticky={true} {...args}>
        <Alert.Icon type='informational' />
        <Alert.Message>
          This is sticky!
          <Alert.ClickableText onClick={() => action('Clicked more info!')}>
            More Info.
          </Alert.ClickableText>
        </Alert.Message>
        <Alert.CloseButton onClose={action('Close!')} />
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
  type: 'informational',
  isSticky: true,
};

export const Empty: Story<AlertProps> = (args) => {
  return (
    <Alert type='informational' {...args}>
      <Alert.Icon type='informational' />
      <Alert.Message>This is an empty info message.</Alert.Message>
    </Alert>
  );
};

Empty.args = {
  children: 'This is empty info message.',
  type: 'informational',
};

export const CustomIcon: Story<AlertProps> = (args) => {
  return (
    <Alert type='informational' {...args}>
      <Alert.Icon>
        <SvgSmileyHappy />
      </Alert.Icon>
      <Alert.Message>This is an info message with a custom icon.</Alert.Message>
      <Alert.CloseButton onClose={action('Close!')}>
        <Alert.CloseButtonIcon>
          <SvgCollapse />
        </Alert.CloseButtonIcon>
      </Alert.CloseButton>
    </Alert>
  );
};

Empty.args = {
  children: 'This is empty info message.',
  type: 'informational',
};

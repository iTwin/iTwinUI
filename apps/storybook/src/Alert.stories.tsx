/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Alert } from '@itwin/itwinui-react';
import { SvgPlaceholder, SvgSmileyHappy } from '@itwin/itwinui-icons-react';
type AlertProps = React.ComponentProps<typeof Alert>;

export default {
  title: 'Core/Alert',
  component: Alert,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    id: { control: { disable: true } },
  },
} as Meta<AlertProps>;

export const Informational: Story<AlertProps> = (args) => {
  return (
    <Alert.Wrapper type='informational' {...args}>
      <Alert.Icon />
      <Alert.Message>
        This is an informational message.
        <Alert.Action onClick={() => action('Clicked more info!')}>
          More Info.
        </Alert.Action>
      </Alert.Message>
      <Alert.CloseButton onClick={action('Close!')} />
    </Alert.Wrapper>
  );
};

Informational.args = {
  children: 'This is an informational message.',
  type: 'informational',
};

export const Positive: Story<AlertProps> = (args) => {
  return (
    <Alert.Wrapper type='positive' {...args}>
      <Alert.Icon />
      <Alert.Message>
        This is a positive message.
        <Alert.Action onClick={() => action('Clicked more info!')}>
          More Info.
        </Alert.Action>
      </Alert.Message>
      <Alert.CloseButton onClick={action('Close!')} />
    </Alert.Wrapper>
  );
};

Positive.args = {
  children: 'This is a positive message.',
  type: 'positive',
};

export const Warning: Story<AlertProps> = (args) => {
  return (
    <Alert.Wrapper type='warning' {...args}>
      <Alert.Icon />
      <Alert.Message>
        This is a warning message.
        <Alert.Action onClick={() => action('Clicked more info!')}>
          More Info.
        </Alert.Action>
      </Alert.Message>
      <Alert.CloseButton onClick={action('Close!')} />
    </Alert.Wrapper>
  );
};

Warning.args = {
  children: 'This is a warning message.',
  type: 'warning',
};

export const Negative: Story<AlertProps> = (args) => {
  return (
    <Alert.Wrapper type='negative' {...args}>
      <Alert.Icon />
      <Alert.Message>
        This is a negative message.
        <Alert.Action onClick={() => action('Clicked more info!')}>
          More Info.
        </Alert.Action>
      </Alert.Message>
      <Alert.CloseButton onClick={action('Close!')} />
    </Alert.Wrapper>
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
      <Alert.Wrapper type='informational' isSticky={true} {...args}>
        <Alert.Icon />
        <Alert.Message>
          This is sticky!
          <Alert.Action onClick={() => action('Clicked more info!')}>
            More Info.
          </Alert.Action>
        </Alert.Message>
        <Alert.CloseButton onClick={action('Close!')} />
      </Alert.Wrapper>
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
    <Alert.Wrapper type='informational' {...args}>
      <Alert.Icon />
      <Alert.Message>This is an empty info message.</Alert.Message>
    </Alert.Wrapper>
  );
};

Empty.args = {
  children: 'This is empty info message.',
  type: 'informational',
};

export const CustomIcon: Story<AlertProps> = (args) => {
  return (
    <Alert.Wrapper type='informational' {...args}>
      <Alert.Icon>
        <SvgSmileyHappy />
      </Alert.Icon>
      <Alert.Message>This is an info message with a custom icon.</Alert.Message>
      <Alert.CloseButton onClick={action('Close!')}>
        <SvgPlaceholder />
      </Alert.CloseButton>
    </Alert.Wrapper>
  );
};

CustomIcon.args = {
  children: 'This is an info message with a custom icon.',
  type: 'informational',
};

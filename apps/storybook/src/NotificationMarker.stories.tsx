/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import {
  Text,
  NotificationMarker,
  NotificationMarkerProps,
  Button,
  IconButton,
} from '@itwin/itwinui-react';
import { SvgNotification } from '@itwin/itwinui-icons-react';

export default {
  component: NotificationMarker,
  args: {
    enabled: true,
    pulsing: false,
  },
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    status: {
      control: 'radio',
      options: ['primary', 'positive', 'warning', 'negative', 'white'],
    },
  },
  title: 'Core/NotificationMarker',
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          placeItems: 'start',
          gap: '20px',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta<NotificationMarkerProps>;

export const Basic: Story<NotificationMarkerProps> = (args) => {
  return (
    <>
      <NotificationMarker {...args}>
        <SvgNotification width={16} height={16} fill='currentColor' />
      </NotificationMarker>
      <NotificationMarker {...args}>Normal</NotificationMarker>
    </>
  );
};

Basic.args = {
  status: 'primary',
};

export const WithButtons: Story<NotificationMarkerProps> = (args) => {
  return (
    <>
      <IconButton styleType='borderless'>
        <NotificationMarker {...args}>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <Button styleType='borderless'>
        <NotificationMarker {...args}>Inbox</NotificationMarker>
      </Button>
    </>
  );
};

WithButtons.args = {
  status: 'primary',
};

export const Pulsing: Story<NotificationMarkerProps> = (args) => {
  return (
    <>
      <IconButton styleType='borderless'>
        <NotificationMarker status='primary' {...args}>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <NotificationMarker status='primary' {...args}>
        <Text style={{ fontWeight: '700' }}>URGENT</Text>
      </NotificationMarker>
    </>
  );
};

Pulsing.args = {
  status: 'negative',
  pulsing: true,
};

export const Status: Story<NotificationMarkerProps> = (args) => {
  return (
    <>
      <NotificationMarker status='primary' {...args}>
        Primary
      </NotificationMarker>
      <IconButton styleType='borderless'>
        <NotificationMarker status='primary' {...args}>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <NotificationMarker status='positive' {...args}>
        Positive
      </NotificationMarker>
      <IconButton styleType='borderless'>
        <NotificationMarker status='positive' {...args}>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <NotificationMarker status='warning' {...args}>
        Warning
      </NotificationMarker>
      <IconButton styleType='borderless'>
        <NotificationMarker status='warning' {...args}>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <NotificationMarker status='negative' {...args}>
        Negative
      </NotificationMarker>
      <IconButton styleType='borderless'>
        <NotificationMarker status='negative' {...args}>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <NotificationMarker status='white' {...args}>
        White
      </NotificationMarker>
      <div style={{ display: 'flex', columnGap: '10px' }}>
        <IconButton styleType='high-visibility'>
          <NotificationMarker status='white' {...args}>
            <SvgNotification />
          </NotificationMarker>
        </IconButton>
        <IconButton styleType='cta'>
          <NotificationMarker status='white' {...args}>
            <SvgNotification />
          </NotificationMarker>
        </IconButton>
      </div>
    </>
  );
};

Status.argTypes = {
  status: {
    control: false,
  },
};

Status.decorators = [
  (Story) => (
    <div
      style={{
        display: 'grid',
        placeItems: 'start',
        rowGap: '20px',
        columnGap: '30px',
        gridTemplateColumns: 'fit-content(1px) auto',
        alignItems: 'center',
      }}
    >
      <Story />
    </div>
  ),
];

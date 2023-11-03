/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import {
  Text,
  NotificationMarker,
  Button,
  IconButton,
} from '@itwin/itwinui-react';
import { SvgNotification } from '@itwin/itwinui-icons-react';
import type { StoryDefault } from '@ladle/react';

export default {
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
} satisfies StoryDefault;

export const Basic = () => {
  return (
    <>
      <NotificationMarker status='primary'>
        <SvgNotification width={16} height={16} fill='currentColor' />
      </NotificationMarker>
      <NotificationMarker status='primary'>Normal</NotificationMarker>
    </>
  );
};

export const WithButtons = () => {
  return (
    <>
      <IconButton styleType='borderless'>
        <NotificationMarker status='primary'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <Button styleType='borderless'>
        <NotificationMarker status='primary'>Inbox</NotificationMarker>
      </Button>
    </>
  );
};

export const Pulsing = () => {
  return (
    <>
      <IconButton styleType='borderless'>
        <NotificationMarker status='negative' pulsing>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <NotificationMarker status='negative' pulsing>
        <Text style={{ fontWeight: '700' }}>URGENT</Text>
      </NotificationMarker>
    </>
  );
};

export const Status = () => {
  return (
    <>
      <NotificationMarker status='primary'>Primary</NotificationMarker>
      <IconButton styleType='borderless'>
        <NotificationMarker status='primary'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <NotificationMarker status='positive'>Positive</NotificationMarker>
      <IconButton styleType='borderless'>
        <NotificationMarker status='positive'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <NotificationMarker status='warning'>Warning</NotificationMarker>
      <IconButton styleType='borderless'>
        <NotificationMarker status='warning'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <NotificationMarker status='negative'>Negative</NotificationMarker>
      <IconButton styleType='borderless'>
        <NotificationMarker status='negative'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <NotificationMarker status='white'>White</NotificationMarker>
      <div style={{ display: 'flex', columnGap: '10px' }}>
        <IconButton styleType='high-visibility'>
          <NotificationMarker status='white'>
            <SvgNotification />
          </NotificationMarker>
        </IconButton>
        <IconButton styleType='cta'>
          <NotificationMarker status='white'>
            <SvgNotification />
          </NotificationMarker>
        </IconButton>
      </div>
    </>
  );
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

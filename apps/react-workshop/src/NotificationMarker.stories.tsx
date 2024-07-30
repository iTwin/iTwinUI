/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  Text,
  NotificationMarker,
  Button,
  IconButton,
} from '@itwin/itwinui-react';
import { SvgNotification } from '@itwin/itwinui-icons-react';
import type { StoryDecorator, StoryDefault } from '@ladle/react';

export default {
  title: 'NotificationMarker',
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
        <SvgNotification fill='currentColor' />
      </NotificationMarker>
    </>
  );
};

export const WithButtons = () => {
  return (
    <>
      <IconButton label='Notifications' styleType='borderless'>
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
      <IconButton label='Notifications' styleType='borderless'>
        <NotificationMarker status='negative' pulsing>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>
    </>
  );
};

export const Status = () => {
  return (
    <>
      <Text>Primary</Text>
      <IconButton label='Notifications' styleType='borderless'>
        <NotificationMarker status='primary'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <Text>Positive</Text>
      <IconButton label='Notifications' styleType='borderless'>
        <NotificationMarker status='positive'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <Text>Warning</Text>
      <IconButton label='Notifications' styleType='borderless'>
        <NotificationMarker status='warning'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <Text>Negative</Text>
      <IconButton label='Notifications' styleType='borderless'>
        <NotificationMarker status='negative'>
          <SvgNotification />
        </NotificationMarker>
      </IconButton>

      <Text>White</Text>
      <div style={{ display: 'flex', columnGap: '10px' }}>
        <IconButton label='Notifications' styleType='high-visibility'>
          <NotificationMarker status='white'>
            <SvgNotification />
          </NotificationMarker>
        </IconButton>
        <IconButton label='Notifications' styleType='cta'>
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
] satisfies StoryDecorator[];

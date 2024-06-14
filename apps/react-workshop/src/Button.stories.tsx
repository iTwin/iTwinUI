/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, NotificationMarker } from '@itwin/itwinui-react';
import { SvgAdd, SvgEmail, SvgPlaceholder } from '@itwin/itwinui-icons-react';

export default {
  title: 'Button',
};

export const CallToAction = () => {
  return (
    <Button onClick={() => console.log('clicked')} styleType='cta'>
      Call To Action Button
    </Button>
  );
};

export const HighVisibility = () => {
  return (
    <Button onClick={() => console.log('clicked')} styleType='high-visibility'>
      High Visibility Button
    </Button>
  );
};

export const Default = () => {
  return (
    <Button onClick={() => console.log('clicked')} styleType='default'>
      Default Button
    </Button>
  );
};

export const WithIcon = () => {
  return (
    <Button
      onClick={() => console.log('clicked')}
      startIcon={<SvgAdd />}
      styleType='high-visibility'
    >
      New
    </Button>
  );
};

export const WithNotification = () => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button
        onClick={() => console.log('clicked')}
        startIcon={
          <NotificationMarker status='white'>
            <SvgEmail />
          </NotificationMarker>
        }
        styleType='high-visibility'
      >
        Inbox
      </Button>
      <Button
        onClick={() => console.log('clicked')}
        startIcon={
          <NotificationMarker status='white'>
            <SvgEmail />
          </NotificationMarker>
        }
        styleType='cta'
      >
        Inbox
      </Button>
      <Button
        onClick={() => console.log('clicked')}
        startIcon={
          <NotificationMarker>
            <SvgEmail />
          </NotificationMarker>
        }
        styleType='default'
      >
        Inbox
      </Button>
      <Button
        onClick={() => console.log('clicked')}
        startIcon={
          <NotificationMarker>
            <SvgEmail />
          </NotificationMarker>
        }
        styleType='borderless'
      >
        Inbox
      </Button>
    </div>
  );
};

export const AsLink = () => {
  return (
    <Button
      as='a'
      href={window.location.href}
      target='_blank'
      startIcon={
        <svg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' aria-hidden>
          <path d='m16 0v5.4l-1.9-2-8.4 8.4-1.5-1.5 8.3-8.4-1.9-1.9m5.4 16v-9h-1v8h-14v-14h8v-1h-9v16z' />
        </svg>
      }
    >
      Open in new tab
    </Button>
  );
};

export const Stretch = () => {
  return <Button stretched>Sign in</Button>;
};
Stretch.decorators = [
  (Story: () => React.ReactNode) => (
    <div style={{ width: 300, outline: '1px solid', padding: 8 }}>
      <Story />
    </div>
  ),
];

export const Loading = () => {
  return (
    <Button loading startIcon={<SvgPlaceholder />}>
      Click me
    </Button>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { Button, NotificationMarker } from '@itwin/itwinui-react';
import SvgAdd from '@itwin/itwinui-icons-react/cjs/icons/Add';
import { SvgEmail } from '@itwin/itwinui-icons-react';

type ButtonProps = React.ComponentProps<typeof Button>;

export default {
  title: 'Buttons/Button',
  component: Button,
  argTypes: {
    onClick: { control: { disable: true } },
    startIcon: { control: { disable: true } },
    endIcon: { control: { disable: true } },
    style: { control: { disable: true } },
    className: { control: { disable: true } },
    type: { control: { disable: true } },
    as: { type: { name: 'string', required: false } },
  },
} as Meta<ButtonProps>;

export const CallToAction = () => {
  return (
    <Button onClick={action('clicked')} styleType='cta'>
      Call To Action Button
    </Button>
  );
};

export const HighVisibility = () => {
  return (
    <Button onClick={action('clicked')} styleType='high-visibility'>
      High Visibility Button
    </Button>
  );
};

export const Default = () => {
  return (
    <Button onClick={action('clicked')} styleType='default'>
      Default Button
    </Button>
  );
};

export const WithIcon = () => {
  return (
    <Button
      onClick={action('clicked')}
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
        onClick={action('clicked')}
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
        onClick={action('clicked')}
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
        onClick={action('clicked')}
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
        onClick={action('clicked')}
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

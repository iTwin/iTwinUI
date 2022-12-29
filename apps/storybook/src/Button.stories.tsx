/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react';
import { Button, ButtonProps, NotificationMarker } from '@itwin/itwinui-react';
import SvgAdd from '@itwin/itwinui-icons-react/cjs/icons/Add';
import { SvgEmail } from '@itwin/itwinui-icons-react';

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
  args: {
    as: 'button',
  },
} as Meta<ButtonProps>;

export const CallToAction: Story<ButtonProps> = (args) => {
  return (
    <Button onClick={action('clicked')} styleType='cta' {...args}>
      {args.children}
    </Button>
  );
};

CallToAction.args = {
  children: 'Call To Action Button',
  styleType: 'cta',
};

export const HighVisibility: Story<ButtonProps> = (args) => {
  return (
    <Button onClick={action('clicked')} styleType='high-visibility' {...args}>
      {args.children}
    </Button>
  );
};

HighVisibility.args = {
  children: 'High Visibility Button',
  styleType: 'high-visibility',
};

export const Default: Story<ButtonProps> = (args) => {
  return (
    <Button onClick={action('clicked')} styleType='default' {...args}>
      {args.children}
    </Button>
  );
};

Default.args = {
  children: 'Default Button',
  styleType: 'default',
};

export const WithIcon: Story<ButtonProps> = (args) => {
  return (
    <Button
      onClick={action('clicked')}
      startIcon={<SvgAdd />}
      styleType='high-visibility'
      {...args}
    >
      {args.children}
    </Button>
  );
};

WithIcon.argTypes = {
  children: { control: { disable: true } },
};

WithIcon.args = {
  children: 'New',
  styleType: 'high-visibility',
  startIcon: <SvgAdd />,
};

export const WithNotification: Story<ButtonProps> = (args) => {
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
        {...args}
      >
        {args.children}
      </Button>
      <Button
        onClick={action('clicked')}
        startIcon={
          <NotificationMarker status='white'>
            <SvgEmail />
          </NotificationMarker>
        }
        styleType='cta'
        {...args}
      >
        {args.children}
      </Button>
      <Button
        onClick={action('clicked')}
        startIcon={
          <NotificationMarker>
            <SvgEmail />
          </NotificationMarker>
        }
        styleType='default'
        {...args}
      >
        {args.children}
      </Button>
      <Button
        onClick={action('clicked')}
        startIcon={
          <NotificationMarker>
            <SvgEmail />
          </NotificationMarker>
        }
        styleType='borderless'
        {...args}
      >
        {args.children}
      </Button>
    </div>
  );
};

WithNotification.args = {
  children: 'Inbox',
};

WithNotification.argTypes = {
  styleType: { control: false },
};

export const AsLink: Story<ButtonProps<'a'>> = (args) => {
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
      {...args}
    >
      Open in new tab
    </Button>
  );
};
AsLink.args = {
  styleType: 'default',
  as: 'a',
} as Record<string, unknown>;

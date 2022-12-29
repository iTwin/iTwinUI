/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { NotificationMarker } from './NotificationMarker';
import { SvgNotification } from '@itwin/itwinui-icons-react';
import Anchor from '../Typography/Anchor/Anchor';

it('should render in its most basic state', () => {
  const { container } = render(<NotificationMarker>Demo</NotificationMarker>);
  const notificationMarker = container.querySelector('span');

  expect(notificationMarker).toBeTruthy();
  expect(notificationMarker).toHaveClass('iui-notification-marker');
  expect(notificationMarker).toHaveAttribute('data-iui-variant', 'primary');
  expect(notificationMarker).toHaveAttribute('data-iui-urgent', 'false');
  expect(notificationMarker).toHaveTextContent('Demo');
});

it('should propagate pertinent props', () => {
  const { container } = render(
    <NotificationMarker status='positive' pulsing={true}>
      Demo
    </NotificationMarker>,
  );
  const notificationMarker = container.querySelector('span');
  expect(notificationMarker).toBeTruthy();
  expect(notificationMarker).toHaveClass('iui-notification-marker');
  expect(notificationMarker).toHaveAttribute('data-iui-variant', 'positive');
  expect(notificationMarker).toHaveAttribute('data-iui-urgent', 'true');
  expect(notificationMarker).toHaveTextContent('Demo');
});

it('should propagate misc props', () => {
  const { container } = render(
    <NotificationMarker
      className='test-class'
      style={{ color: 'rebeccapurple' }}
      aria-label='Home'
    >
      🔔
    </NotificationMarker>,
  );
  const notificationMarker = container.querySelector('span');
  expect(notificationMarker).toHaveClass('test-class');
  expect(notificationMarker).toHaveStyle('color: rebeccapurple');
  expect(notificationMarker).toHaveTextContent('🔔');
  expect(notificationMarker).toHaveAttribute('aria-label', 'Home');
});

it('should display notification circle only when enabled', () => {
  const { container } = render(
    <NotificationMarker enabled={false} status='negative' pulsing={true}>
      🔔
    </NotificationMarker>,
  );
  const notificationMarker = container.querySelector('span');
  expect(notificationMarker).not.toHaveClass('iui-notification-marker');
  expect(notificationMarker).not.toHaveAttribute('data-iui-variant');
  expect(notificationMarker).not.toHaveAttribute('data-iui-urgent');
  expect(notificationMarker).toHaveTextContent('🔔');
});

it('should support all kinds of children', () => {
  let container = render(
    <NotificationMarker status='warning' pulsing={true}>
      Demo
    </NotificationMarker>,
  );
  let notificationMarker = container.container.querySelector('span');
  expect(notificationMarker).toHaveClass('iui-notification-marker');
  expect(notificationMarker).toHaveAttribute('data-iui-variant', 'warning');
  expect(notificationMarker).toHaveAttribute('data-iui-urgent', 'true');
  expect(notificationMarker).toHaveTextContent('Demo');

  container = render(
    <NotificationMarker status='warning' pulsing={true}>
      🔔
    </NotificationMarker>,
  );
  notificationMarker = container.container.querySelector('span');
  expect(notificationMarker).toHaveClass('iui-notification-marker');
  expect(notificationMarker).toHaveAttribute('data-iui-variant', 'warning');
  expect(notificationMarker).toHaveAttribute('data-iui-urgent', 'true');
  expect(notificationMarker).toHaveTextContent('🔔');

  container = render(
    <NotificationMarker status='warning' pulsing={true}>
      <Anchor>1 warning</Anchor>
    </NotificationMarker>,
  );
  notificationMarker = container.container.querySelector('span');
  expect(notificationMarker).toHaveClass('iui-notification-marker');
  expect(notificationMarker).toHaveAttribute('data-iui-variant', 'warning');
  expect(notificationMarker).toHaveAttribute('data-iui-urgent', 'true');
  expect(notificationMarker).toHaveTextContent('1 warning');

  const anchor = notificationMarker?.querySelector('a') as HTMLAnchorElement;
  expect(anchor).toHaveClass('iui-anchor');
  expect(anchor).toHaveTextContent('1 warning');

  const {
    container: { firstChild: notificationIcon },
  } = render(<SvgNotification />);

  container = render(
    <NotificationMarker status='warning' pulsing={true}>
      <SvgNotification />
    </NotificationMarker>,
  );
  notificationMarker = container.container.querySelector('span');
  expect(notificationMarker).toHaveClass('iui-notification-marker');
  expect(notificationMarker).toHaveAttribute('data-iui-variant', 'warning');
  expect(notificationMarker).toHaveAttribute('data-iui-urgent', 'true');
  expect(notificationMarker?.querySelector('svg')).toEqual(notificationIcon);
});

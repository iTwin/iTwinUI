/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render } from '@testing-library/react';

import { StatusMessage } from './StatusMessage.js';
import { StatusIconMap } from '../utils/index.js';

it('should render only message', () => {
  const { container } = render(<StatusMessage>This is my text</StatusMessage>);
  const message = container.querySelector('.iui-status-message') as HTMLElement;
  expect(message.textContent).toBe('This is my text');
  expect(
    container.querySelector('.iui-svg-icon.iui-status-message-icon'),
  ).toBeFalsy();
});

it.each(['positive', 'negative', 'warning'] as const)(
  'should render message with %s status icon',
  (status) => {
    const { container } = render(
      <StatusMessage status={status}>This is my text</StatusMessage>,
    );
    const message = container.querySelector(
      '.iui-status-message',
    ) as HTMLElement;
    expect(message).toBeTruthy();
    const messageContent = container.querySelector(
      '.iui-status-message-content',
    ) as HTMLElement;
    expect(messageContent.textContent).toBe('This is my text');
    const icon = container.querySelector(
      '.iui-status-message-icon',
    ) as HTMLElement;
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('aria-hidden')).toBe('true');

    const {
      container: { firstChild: statusIcon },
    } = render(StatusIconMap[status]());
    expect(icon.firstElementChild).toEqual(statusIcon);
  },
);

it('should render message with custom icon', () => {
  const { container } = render(
    <StatusMessage startIcon={<svg className='my-icon' />}>
      This is my text
    </StatusMessage>,
  );
  const message = container.querySelector('.iui-status-message') as HTMLElement;
  expect(message).toBeTruthy();
  const messageContent = container.querySelector(
    '.iui-status-message-content',
  ) as HTMLElement;
  expect(messageContent.textContent).toBe('This is my text');
  expect(
    container.querySelector('.iui-status-message-icon > .my-icon'),
  ).toBeTruthy();
  expect(container.querySelector('.iui-status-message-icon')).toHaveAttribute(
    'aria-hidden',
    'true',
  );
});

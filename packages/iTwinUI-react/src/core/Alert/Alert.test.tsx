/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { Alert } from './Alert';

it('renders correctly in its default state', () => {
  const { container } = render(<Alert>This is an alert.</Alert>);

  expect(container.querySelector('.iui-alert')).toBeTruthy();
  expect(container.querySelector('.iui-alert-icon')).toBeTruthy();
  const message = container.querySelector('.iui-alert-message') as HTMLElement;
  expect(message).toBeTruthy();
  expect(message.querySelector('a')).toBeNull();
  expect(message.textContent).toBe('This is an alert.');
  expect(container.querySelector('button > .iui-alert-button-icon')).toBeNull();
});

it('renders clickable text with href correctly', () => {
  const mockHref = 'https://www.example.com/';
  const { container, getByText } = render(
    <Alert
      clickableText='I am a clickable text'
      clickableTextProps={{ href: mockHref, className: 'my-link' }}
    >
      This is an alert.
    </Alert>,
  );

  expect(container.querySelector('.iui-alert')).toBeTruthy();
  expect(container.querySelector('.iui-alert-icon')).toBeTruthy();
  const link = container.querySelector(
    '.iui-alert-message > .iui-alert-link',
  ) as HTMLAnchorElement;
  expect(link).toBeTruthy();
  expect(link.textContent).toBe('I am a clickable text');
  expect(link.href).toEqual(mockHref);
  expect(link).toHaveClass('my-link');
  getByText('This is an alert.');
});

it('takes a className and style correctly', () => {
  const { container, getByText } = render(
    <Alert className='custom-alert' style={{ width: 100 }}>
      This is an alert.
    </Alert>,
  );

  const alert = container.querySelector('.iui-alert') as HTMLElement;
  expect(alert).toBeTruthy();
  expect(alert.className).toContain('custom-alert');
  expect(alert.style.width).toBe('100px');
  getByText('This is an alert.');
});

it('renders sticky alert correctly', () => {
  const { container, getByText } = render(
    <Alert isSticky>This is sticky alert.</Alert>,
  );

  const alert = container.querySelector('.iui-alert') as HTMLElement;
  expect(alert).toBeTruthy();
  expect(alert).toHaveAttribute('data-iui-variant', 'sticky');
  getByText('This is sticky alert.');
});

(
  ['informational', 'positive', 'warning', 'negative'] as Array<
    'informational' | 'positive' | 'warning' | 'negative'
  >
).forEach((type) => {
  it(`renders ${type} correctly`, () => {
    const closeMock = jest.fn();
    const { container, getByText } = render(
      <Alert type={type} onClose={closeMock}>
        This is an alert.
      </Alert>,
    );
    const alert = container.querySelector('.iui-alert') as HTMLElement;
    expect(alert).toBeTruthy();
    expect(alert).toHaveAttribute('data-iui-status', `${type}`);
    expect(container.querySelector(`.iui-alert-icon`)).toBeTruthy();
    expect(
      container.querySelector('.iui-alert-message > .iui-alert-link'),
    ).toBeNull();
    const close = container.querySelector(
      'button > .iui-alert-button-icon',
    ) as HTMLElement;
    expect(close).toBeTruthy();
    fireEvent.click(close);
    expect(closeMock).toHaveBeenCalled();
    getByText('This is an alert.');
  });
});

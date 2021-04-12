/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { Alert } from './Alert';

it('renders correctly in its default state', () => {
  const { container } = render(<Alert>This is an alert.</Alert>);

  expect(container.querySelector('.iui-alert.iui-informational')).toBeTruthy();
  expect(container.querySelector('.iui-icon')).toBeTruthy();
  const message = container.querySelector('.iui-message') as HTMLElement;
  expect(message).toBeTruthy();
  expect(message.querySelector('a')).toBeNull();
  expect(message.textContent).toBe('This is an alert.');
  expect(container.querySelector('button > .iui-icon')).toBeNull();
});

it('renders clickable text correctly', () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <Alert clickableText='I am a clickable text' onClick={onClick}>
      This is an alert.
    </Alert>,
  );

  expect(container.querySelector('.iui-alert.iui-informational')).toBeTruthy();
  expect(container.querySelector('.iui-icon')).toBeTruthy();
  const link = container.querySelector('.iui-message > a') as HTMLElement;
  expect(link).toBeTruthy();
  expect(link.textContent).toBe('I am a clickable text');
  link.click();
  expect(onClick).toHaveBeenCalled();
  expect(container.querySelector('button > .iui-icon')).toBeNull();
  getByText('This is an alert.');
});

it('takes a className and style correctly', () => {
  const { container, getByText } = render(
    <Alert className='custom-alert' style={{ width: 100 }}>
      This is an alert.
    </Alert>,
  );

  const alert = container.querySelector(
    '.iui-alert.iui-informational',
  ) as HTMLElement;
  expect(alert).toBeTruthy();
  expect(alert.className).toContain('custom-alert');
  expect(alert.style.width).toBe('100px');
  getByText('This is an alert.');
});

it('renders sticky alert correctly', () => {
  const { container, getByText } = render(
    <Alert isSticky>This is sticky alert.</Alert>,
  );

  const alert = container.querySelector(
    '.iui-alert.iui-informational.iui-sticky',
  ) as HTMLElement;
  expect(alert).toBeTruthy();
  getByText('This is sticky alert.');
});

(['informational', 'positive', 'warning', 'negative'] as Array<
  'informational' | 'positive' | 'warning' | 'negative'
>).forEach((type) => {
  it(`renders ${type} correctly`, () => {
    const closeMock = jest.fn();
    const { container, getByText } = render(
      <Alert type={type} onClose={closeMock}>
        This is an alert.
      </Alert>,
    );
    expect(container.querySelector(`.iui-alert.iui-${type}`)).toBeTruthy();
    expect(container.querySelector(`.iui-icon`)).toBeTruthy();
    expect(container.querySelector('.iui-message > a')).toBeNull();
    const close = container.querySelector('button > .iui-icon') as HTMLElement;
    expect(close).toBeTruthy();
    fireEvent.click(close);
    expect(closeMock).toHaveBeenCalled();
    getByText('This is an alert.');
  });
});

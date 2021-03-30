/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { Alert } from './Alert';

it('renders correctly in its default state', () => {
  const { container, getByText } = render(<Alert>This is an alert.</Alert>);

  expect(container.querySelector('.iui-alerts-informational')).toBeTruthy();
  expect(container.querySelector('.iui-alerts-status-icon')).toBeTruthy();
  expect(container.querySelector('.iui-alerts-link')).toBeNull();
  expect(container.querySelector('.iui-alerts-close-icon')).toBeNull();
  getByText('This is an alert.');
});

it('renders clickable text correctly', () => {
  const onClick = jest.fn();
  const { container, getByText } = render(
    <Alert clickableText='I am a clickable text' onClick={onClick}>
      This is an alert.
    </Alert>,
  );

  expect(container.querySelector('.iui-alerts-informational')).toBeTruthy();
  expect(container.querySelector('.iui-alerts-status-icon')).toBeTruthy();
  const link = container.querySelector('.iui-alerts-link') as HTMLElement;
  expect(link).toBeTruthy();
  expect(link.textContent).toBe('I am a clickable text');
  link.click();
  expect(onClick).toHaveBeenCalled();
  expect(container.querySelector('.iui-alerts-close-icon')).toBeNull();
  getByText('This is an alert.');
});

it('takes a className and style correctly', () => {
  const { container, getByText } = render(
    <Alert className='custom-alert' style={{ width: 100 }}>
      This is an alert.
    </Alert>,
  );

  const alert = container.querySelector(
    '.iui-alerts-informational',
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
    '.iui-alerts-informational.iui-sticky',
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
    expect(container.querySelector(`.iui-alerts-${type}`)).toBeTruthy();
    expect(container.querySelector(`.iui-alerts-status-icon`)).toBeTruthy();
    expect(container.querySelector('.iui-alerts-link')).toBeNull();
    const close = container.querySelector(
      '.iui-alerts-close-icon',
    ) as HTMLElement;
    expect(close).toBeTruthy();
    fireEvent.click(close);
    expect(closeMock).toHaveBeenCalled();
    getByText('This is an alert.');
  });
});

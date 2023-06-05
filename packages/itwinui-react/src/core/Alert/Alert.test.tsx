/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';

import { Alert } from './Alert.js';

it('renders correctly in its default state', () => {
  const { container } = render(
    <Alert>
      <Alert.Message>This is an alert.</Alert.Message>
    </Alert>,
  );

  expect(container.querySelector('.iui-alert')).toBeTruthy();
  expect(container.querySelector('.iui-svg-icon')).toBeFalsy();
  const message = container.querySelector('.iui-alert-message') as HTMLElement;
  expect(message).toBeTruthy();
  expect(message.querySelector('a')).toBeNull();
  expect(message.textContent).toBe('This is an alert.');
  expect(container.querySelector('button > .iui-button-icon')).toBeNull();
});

it('renders clickable text with href correctly', () => {
  const mockHref = 'https://www.example.com/';
  const { container, getByText } = render(
    <Alert>
      <Alert.Message>
        This is an alert.
        <Alert.Action href={mockHref} className={'my-link'}>
          I am a clickable text
        </Alert.Action>
      </Alert.Message>
    </Alert>,
  );

  expect(container.querySelector('.iui-alert')).toBeTruthy();
  const link = container.querySelector(
    '.iui-alert-message > a.iui-alert-link',
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
      <Alert.Message>This is an alert.</Alert.Message>
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
    <Alert isSticky>
      <Alert.Message>This is sticky alert.</Alert.Message>
    </Alert>,
  );

  const alert = container.querySelector('.iui-alert') as HTMLElement;
  expect(alert).toBeTruthy();
  expect(alert).toHaveAttribute('data-iui-variant', 'sticky');
  getByText('This is sticky alert.');
});

it('renders alert action as button', () => {
  const { container } = render(
    <Alert>
      <Alert.Message>
        This is an alert.
        <Alert.Action>I am a clickable button</Alert.Action>
      </Alert.Message>
    </Alert>,
  );

  const alert = container.querySelector('.iui-alert') as HTMLElement;
  expect(alert).toBeTruthy();

  const alertButton = container.querySelector('.iui-alert-link') as HTMLElement;
  expect(alertButton).toBeInstanceOf(HTMLButtonElement);
});

(
  ['informational', 'positive', 'warning', 'negative'] as Array<
    'informational' | 'positive' | 'warning' | 'negative'
  >
).forEach((type) => {
  it(`renders ${type} correctly`, () => {
    const closeMock = jest.fn();
    const { container, getByText } = render(
      <Alert type={type}>
        <Alert.Icon />
        <Alert.Message>This is an alert.</Alert.Message>
        <Alert.CloseButton onClick={closeMock} />
      </Alert>,
    );
    const alert = container.querySelector('.iui-alert') as HTMLElement;
    expect(alert).toBeTruthy();
    expect(alert).toHaveAttribute('data-iui-status', `${type}`);

    const icon = container.querySelector('.iui-svg-icon') as HTMLElement;
    expect(icon).toBeTruthy();
    expect(icon).toHaveAttribute('data-iui-icon-color', `${type}`);

    expect(
      container.querySelector('.iui-alert-message > .iui-alert-link'),
    ).toBeNull();
    const close = container.querySelector(
      'button > .iui-button-icon',
    ) as HTMLElement;
    expect(close).toBeTruthy();
    fireEvent.click(close);
    expect(closeMock).toHaveBeenCalled();
    getByText('This is an alert.');
  });
});

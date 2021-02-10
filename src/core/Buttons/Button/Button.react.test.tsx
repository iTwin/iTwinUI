// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { render } from '@testing-library/react';
import React from 'react';

import { Button } from './Button';

it('renders default button correctly', () => {
  const onClickMock = jest.fn();
  const { container, getByText } = render(
    <Button onClick={onClickMock}>Click me!</Button>,
  );

  const button = container.querySelector(
    '.iui-buttons-default',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');
  button.click();
  expect(onClickMock).toHaveBeenCalled();
  getByText('Click me!');
});

it('renders cta button correctly', () => {
  const onClickMock = jest.fn();
  const { container, getByText } = render(
    <Button styleType='cta' onClick={onClickMock}>
      Click me!
    </Button>,
  );

  const button = container.querySelector(
    '.iui-buttons-cta',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');
  button.click();
  getByText('Click me!');
});

it('renders high-visibility button correctly', () => {
  const onClickMock = jest.fn();
  const { container, getByText } = render(
    <Button styleType='high-visibility' onClick={onClickMock}>
      Click me!
    </Button>,
  );

  const button = container.querySelector(
    '.iui-buttons-high-visibility',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');
  button.click();
  getByText('Click me!');
});

it('takes className and style', () => {
  const { container, getByText } = render(
    <Button
      styleType='high-visibility'
      className='my-button'
      style={{ minWidth: 80 }}
    >
      Click me!
    </Button>,
  );

  const button = container.querySelector(
    '.iui-buttons-high-visibility',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.style.minWidth).toBe('80px');
  expect(button.className).toContain('my-button');
  getByText('Click me!');
});

it('renders small cta correctly', () => {
  const onClickMock = jest.fn();
  const { container, getByText } = render(
    <Button styleType='cta' size='small' onClick={onClickMock}>
      Click me!
    </Button>,
  );

  const button = container.querySelector(
    '.iui-buttons-cta-small',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');
  button.click();
  getByText('Click me!');
});

it('renders large high-visibility correctly', () => {
  const onClickMock = jest.fn();
  const { container, getByText } = render(
    <Button styleType='high-visibility' size='large' onClick={onClickMock}>
      Click me!
    </Button>,
  );

  const button = container.querySelector(
    '.iui-buttons-high-visibility-large',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');
  button.click();
  getByText('Click me!');
});

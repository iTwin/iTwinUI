/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';
import { SvgClose as SvgPlaceholder } from '../../utils';
import { Button } from './Button';

it('renders default button correctly', () => {
  const onClickMock = jest.fn();
  const { container } = render(
    <Button
      onClick={(e) => {
        onClickMock(e);
      }}
    >
      Click me!
    </Button>,
  );

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');
  button.click();
  expect(onClickMock).toHaveBeenCalled();

  const label = container.querySelector('span') as HTMLSpanElement;
  expect(label.textContent).toEqual('Click me!');
});

it('renders cta button correctly', () => {
  const onClickMock = jest.fn();
  const { container, getByText } = render(
    <Button styleType='cta' onClick={onClickMock}>
      Click me!
    </Button>,
  );

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');
  expect(button).toHaveAttribute('data-iui-variant', 'cta');
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

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');
  expect(button).toHaveAttribute('data-iui-variant', 'high-visibility');
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
    '.iui-button.my-button',
  ) as HTMLButtonElement;
  expect(button).toHaveAttribute('data-iui-variant', 'high-visibility');
  expect(button).toBeTruthy();
  expect(button.style.minWidth).toBe('80px');
  getByText('Click me!');
});

it('renders small cta correctly', () => {
  const onClickMock = jest.fn();
  const { container, getByText } = render(
    <Button styleType='cta' size='small' onClick={onClickMock}>
      Click me!
    </Button>,
  );

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toHaveAttribute('data-iui-variant', 'cta');
  expect(button).toHaveAttribute('data-iui-size', 'small');
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

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toHaveAttribute('data-iui-variant', 'high-visibility');
  expect(button).toHaveAttribute('data-iui-size', 'large');
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');
  button.click();
  getByText('Click me!');
});

it('should render borderless button', () => {
  const { container } = render(
    <Button styleType='borderless'>Click me!</Button>,
  );

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toHaveAttribute('data-iui-variant', 'borderless');
  expect(button).toBeTruthy();
  expect(button.textContent).toBe('Click me!');
});

it('should render with icon correctly', () => {
  const { container } = render(
    <Button startIcon={<SvgPlaceholder />}>Click me!</Button>,
  );

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.type).toBe('button');

  const {
    container: { firstChild: placeholderIcon },
  } = render(<SvgPlaceholder />);

  const buttonIcon = container.querySelector('.iui-button-icon');
  const svg = buttonIcon?.querySelector('svg');

  expect(buttonIcon).toHaveAttribute('aria-hidden', 'true');
  expect(svg).toEqual(placeholderIcon);

  const label = container.querySelector('.iui-button-icon + span')?.textContent;
  expect(label).toEqual('Click me!');
});

it('should render without label correctly', () => {
  const { container } = render(
    <Button startIcon={<SvgPlaceholder />} endIcon={<SvgPlaceholder />} />,
  );

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.textContent).toBeFalsy();
  expect(button.querySelector('span:not(.iui-button-icon)')).toBeFalsy();

  const {
    container: { firstChild: placeholderIcon },
  } = render(<SvgPlaceholder />);

  button.querySelectorAll('.iui-button-icon').forEach((buttonIcon) => {
    const svg = buttonIcon?.querySelector('svg');

    expect(buttonIcon).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toEqual(placeholderIcon);
  });
});

it('should support polymorphic `as` prop', () => {
  const { container } = render(
    <Button as='a' href='https://example.com/'>
      label
    </Button>,
  );

  const button = container.querySelector('a.iui-button') as HTMLAnchorElement;
  expect(button).toHaveTextContent('label');
  expect(button.href).toEqual('https://example.com/');
});

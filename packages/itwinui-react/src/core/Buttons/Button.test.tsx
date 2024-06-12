/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { SvgClose as SvgPlaceholder } from '../../utils/index.js';
import { Button } from './Button.js';
import { Popover } from '../Popover/Popover.js';
import { userEvent } from '@testing-library/user-event';

it('renders default button correctly', () => {
  const onClickMock = vi.fn();
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
  expect(label).toHaveClass('iui-button-label');
  expect(label.textContent).toEqual('Click me!');
});

it('renders cta button correctly', () => {
  const onClickMock = vi.fn();
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
  const onClickMock = vi.fn();
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
  const onClickMock = vi.fn();
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
  const onClickMock = vi.fn();
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

it('should render [x]Props correctly', () => {
  const { container } = render(
    <Button
      startIcon={<SvgPlaceholder />}
      endIcon={<SvgPlaceholder />}
      startIconProps={{ className: 'start-icon-class', style: { width: 80 } }}
      endIconProps={{ className: 'end-icon-class', style: { width: 80 } }}
      labelProps={{ className: 'label-class', style: { width: 80 } }}
    >
      label
    </Button>,
  );

  // Test for Button startIcon
  const startIconElement = container.querySelector(
    '.iui-button-icon.start-icon-class',
  ) as HTMLElement;
  expect(startIconElement).toBeTruthy();
  expect(startIconElement.style.width).toBe('80px');

  // Test for Button endIcon
  const endIconElement = container.querySelector(
    '.iui-button-icon.end-icon-class',
  ) as HTMLElement;
  expect(endIconElement).toBeTruthy();
  expect(endIconElement.style.width).toBe('80px');

  // Test for Button Label
  const labelElement = container.querySelector('.label-class') as HTMLElement;
  expect(labelElement).toBeTruthy();
  expect(labelElement.style.width).toBe('80px');
});

it('should respect `stretched` prop', () => {
  const { container } = render(<Button stretched>Do not click</Button>);
  expect(container.querySelector('button')).toHaveStyle('--_iui-width: 100%');
});

it.each(['default', 'small', 'large'] as const)(
  'should respect `loading` and `size` props (size=%s)',
  (size) => {
    const { container } = render(
      <Button loading size={size === 'default' ? undefined : size}>
        Do not click
      </Button>,
    );

    const button = container.querySelector('button') as HTMLElement;
    expect(button).toHaveAttribute('data-iui-loading', 'true');
    expect(button).toHaveAttribute('aria-disabled', 'true');

    if (size === 'default') {
      expect(button).not.toHaveAttribute('data-iui-size');
    } else {
      expect(button).toHaveAttribute('data-iui-size', size);
    }

    const spinner = button.querySelector('.iui-progress-indicator-radial');
    expect(spinner).toHaveClass('iui-button-spinner');
    expect(spinner).toHaveAttribute(
      'data-iui-size',
      size === 'small' ? 'x-small' : 'small',
    );
  },
);

it('should read popover open state', async () => {
  render(
    <Popover content='Popped over'>
      <Button>Click me</Button>
    </Popover>,
  );

  const button = screen.getByRole('button', { name: 'Click me' });
  expect(button).not.toHaveAttribute('data-iui-has-popover', 'open');
  expect(screen.queryByText('Popped over')).toBeNull();

  // Open popover
  await userEvent.click(button);
  expect(button).toHaveAttribute('data-iui-has-popover', 'open');

  const popover = screen.getByRole('dialog');
  expect(popover).toBeVisible();
  expect(popover).toHaveTextContent('Popped over');

  // Close popover
  await userEvent.click(button);
  expect(button).not.toHaveAttribute('data-iui-has-popover', 'open');
});

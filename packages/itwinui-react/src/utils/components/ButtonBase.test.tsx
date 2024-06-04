/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ButtonBase } from './ButtonBase.js';

it('renders default button correctly', async () => {
  const onClick = vi.fn();
  const { container } = render(<ButtonBase onClick={onClick}>hi</ButtonBase>);
  const button = container.querySelector('button') as HTMLButtonElement;
  expect(button).toHaveTextContent('hi');
  expect(button).toHaveClass('iui-button-base');
  expect(button).toHaveAttribute('type', 'button');

  await userEvent.click(button);
  expect(onClick).toHaveBeenCalled();
});

it('should handle `disabled` prop', async () => {
  const onClick = vi.fn();
  const onPointerDown = vi.fn();
  const onPointerUp = vi.fn();
  const { container } = render(
    <ButtonBase
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      disabled
    >
      hi
    </ButtonBase>,
  );
  const button = container.querySelector('button') as HTMLButtonElement;
  expect(button).toHaveTextContent('hi');
  expect(button).not.toHaveAttribute('disabled');
  expect(button).toHaveAttribute('aria-disabled', 'true');
  expect(button).toHaveAttribute('data-iui-disabled', 'true');

  await userEvent.click(button);
  expect(onClick).not.toHaveBeenCalled();
  expect(onPointerDown).not.toHaveBeenCalled();
  expect(onPointerUp).not.toHaveBeenCalled();
});

it('should progressively enhance `disabled` prop', async () => {
  // only SSR instead of regular render
  const buttonStr = ReactDOMServer.renderToString(
    <ButtonBase disabled>hi</ButtonBase>,
  );
  const button = new DOMParser()
    .parseFromString(buttonStr, 'text/html')
    .querySelector('button');

  expect(button?.getAttribute('disabled')).not.toBeNull();
  expect(button?.getAttribute('aria-disabled')).toBeNull();
  expect(button?.getAttribute('data-iui-disabled')).toBe('true');
});

it('should support polymorphic `as` prop', () => {
  const { container } = render(
    <ButtonBase as='a' href='https://example.com/' disabled>
      hi
    </ButtonBase>,
  );

  const button = container.querySelector('a') as HTMLAnchorElement;
  expect(button).toHaveTextContent('hi');
  expect(button).not.toHaveAttribute('type');
  expect(button).not.toHaveAttribute('aria-disabled');
  expect(button).toHaveAttribute('data-iui-disabled', 'true');
  expect(button.href).toEqual('https://example.com/');
});

it('should allow `htmlDisabled` prop to override `disabled`', () => {
  const { container } = render(
    <ButtonBase disabled htmlDisabled>
      hi
    </ButtonBase>,
  );
  const button = container.querySelector('button') as HTMLButtonElement;
  expect(button).toBeDisabled();
  expect(button).not.toHaveAttribute('aria-disabled');
});

it.each(['default', 'small', 'large'] as const)(
  'should respect `loading` and `size` props (size=%s)',
  (size) => {
    const { container } = render(
      <ButtonBase loading size={size === 'default' ? undefined : size}>
        Do not click
      </ButtonBase>,
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

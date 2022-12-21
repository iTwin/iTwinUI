/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';

import { Input } from './Input';

const assertBaseElement = (container: HTMLElement) => {
  expect(container.querySelector('.iui-input')).toBeTruthy();
};

it('should render correctly in its most basic state', () => {
  const { container } = render(<Input />);
  assertBaseElement(container);
});

it('should render disabled component', () => {
  const { container } = render(<Input disabled />);
  assertBaseElement(container);
  expect((container.querySelector('input') as HTMLInputElement).disabled).toBe(
    true,
  );
});

it('should set focus', () => {
  let element: HTMLInputElement | null = null;
  const onRef = (ref: HTMLInputElement) => {
    element = ref;
  };
  const { container } = render(<Input ref={onRef} setFocus />);
  assertBaseElement(container);
  expect(element).toBeTruthy();
  expect(document.activeElement).toEqual(element);
});

it('should take class and style', () => {
  const { container } = render(
    <Input className='my-class' style={{ width: 50 }} />,
  );
  assertBaseElement(container);
  const input = container.querySelector('input.my-class') as HTMLElement;
  expect(input).toBeTruthy();
  expect(input.style.width).toBe('50px');
});

it.each(['small', 'large'] as const)(
  'should render small and large sizes',
  (size) => {
    const { container } = render(<Input size={size} />);
    expect(container.querySelector(`.iui-input`)).toHaveAttribute(
      'data-iui-size',
      size,
    );
  },
);

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';

import { InputWithDecorations } from './InputWithDecorations.js';
import { SvgAirplane } from '@itwin/itwinui-icons-react';

const assertBaseElement = (container: HTMLElement) => {
  expect(container.querySelector('div')).toHaveClass(
    'iui-input-flex-container',
  );
};

it('should render correctly in its most basic state', () => {
  const { container } = render(
    <InputWithDecorations>
      <InputWithDecorations.Icon>
        <SvgAirplane />
      </InputWithDecorations.Icon>
      <InputWithDecorations.Input />
      <InputWithDecorations.Button>+</InputWithDecorations.Button>
    </InputWithDecorations>,
  );
  assertBaseElement(container);
  expect(container.querySelector('svg')).toBeTruthy();
  expect(container.querySelector('input')).toBeTruthy();
  expect(container.querySelector('button')).toBeTruthy();
});

it('should render disabled component', () => {
  const { container } = render(
    <InputWithDecorations isDisabled>
      <InputWithDecorations.Input />
      <InputWithDecorations.Button>+</InputWithDecorations.Button>
    </InputWithDecorations>,
  );
  assertBaseElement(container);
  expect(container.querySelector('input')).toBeDisabled();
  expect(container.querySelector('button')).toHaveAttribute(
    'aria-disabled',
    'true',
  );
});

it('should take class and style', () => {
  const { container } = render(
    <InputWithDecorations className='my-class' style={{ width: 50 }}>
      <InputWithDecorations.Input />
      <InputWithDecorations.Button>+</InputWithDecorations.Button>
    </InputWithDecorations>,
  );
  assertBaseElement(container);
  const inputContainer = container.querySelector(
    '.iui-input-flex-container.my-class',
  ) as HTMLElement;
  expect(inputContainer).toBeTruthy();
  expect(inputContainer.style.width).toBe('50px');
});

it.each(['small', 'large'] as const)(
  'should render small and large sizes',
  (size) => {
    const { container } = render(
      <InputWithDecorations size={size}>
        <InputWithDecorations.Input />
        <InputWithDecorations.Button>+</InputWithDecorations.Button>
      </InputWithDecorations>,
    );
    expect(
      container.querySelector(`.iui-input-flex-container`),
    ).toHaveAttribute('data-iui-size', size);
    expect(container.querySelector(`input`)).toHaveAttribute(
      'data-iui-size',
      size,
    );
    expect(container.querySelector(`button`)).toHaveAttribute(
      'data-iui-size',
      size,
    );
  },
);

it.each(['positive', 'warning', 'negative'] as const)(
  'should render $status status',
  (status) => {
    const { container } = render(
      <InputWithDecorations status={status}>
        <InputWithDecorations.Input />
        <InputWithDecorations.Button>+</InputWithDecorations.Button>
      </InputWithDecorations>,
    );
    expect(
      container.querySelector(`.iui-input-flex-container`),
    ).toHaveAttribute('data-iui-status', status);
  },
);

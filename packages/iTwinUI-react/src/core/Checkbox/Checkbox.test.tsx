/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Checkbox } from './Checkbox';

const assertBaseElements = (container: HTMLElement) => {
  expect(container.querySelector('input[type="checkbox"]')).toHaveClass(
    'iui-checkbox',
  );
};

it('renders correctly with label', () => {
  const { container } = render(<Checkbox label='Some checkbox' />);

  assertBaseElements(container);
  expect(container.querySelector('label')).toHaveClass('iui-checkbox-wrapper');
  expect(screen.getByText('Some checkbox')).toHaveClass('iui-checkbox-label');
});

it('renders correctly indeterminate state', () => {
  const { container } = render(
    <Checkbox label='Some checkbox' indeterminate />,
  );

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  const input = container.querySelector('input') as HTMLInputElement;
  expect(input.indeterminate).toBe(true);
  expect(input.checked).toBe(false);
});

it('renders correctly without label and checked', () => {
  const { container } = render(<Checkbox defaultChecked />);

  assertBaseElements(container);

  expect(container.querySelector('.iui-checkbox-label')).toBeNull();
  const input = container.querySelector('input') as HTMLInputElement;
  expect(input.indeterminate).toBe(false);
  expect(input.checked).toBe(true);
});

it('renders correctly with jsx element as label', () => {
  const { container } = render(
    <Checkbox label={<div id='my-custom-label'>This is my label</div>} />,
  );

  assertBaseElements(container);

  const label = container.querySelector('#my-custom-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('This is my label');
});

it('renders disabled component', () => {
  const { container } = render(<Checkbox label='Some checkbox' disabled />);

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  expect(
    (container.querySelector('input[type="checkbox"]') as HTMLInputElement)
      .disabled,
  ).toBe(true);
});

it('renders positive component', () => {
  const { container } = render(
    <Checkbox label='Some checkbox' status='positive' />,
  );

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  expect(
    container.querySelector('.iui-checkbox-wrapper.iui-positive'),
  ).toBeTruthy();
});

it('renders warning component', () => {
  const { container } = render(
    <Checkbox label='Some checkbox' status='warning' />,
  );

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  expect(
    container.querySelector('.iui-checkbox-wrapper.iui-warning'),
  ).toBeTruthy();
});

it('renders negative component', () => {
  const { container } = render(
    <Checkbox label='Some checkbox' status='negative' />,
  );

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  expect(
    container.querySelector('.iui-checkbox-wrapper.iui-negative'),
  ).toBeTruthy();
});

it.each(['label', 'input'] as const)(
  'should isomorphically apply style on %s',
  (el) => {
    const { container } = render(
      <Checkbox
        label={el === 'label' ? 'Some label' : undefined}
        style={{ color: 'blue' }}
      />,
    );

    assertBaseElements(container);
    expect(container.querySelector(el)).toHaveStyle('color: blue;');
  },
);
it.each(['label', 'input'] as const)(
  'should isomorphically apply class on %s',
  (el) => {
    const { container } = render(
      <Checkbox
        label={el === 'label' ? 'Some label' : undefined}
        className='customClass'
      />,
    );

    assertBaseElements(container);
    expect(container.querySelector(el)).toHaveClass('customClass');
  },
);

it('should set focus', () => {
  let element: HTMLInputElement | null = null;
  const onRef = (ref: HTMLInputElement) => {
    element = ref;
  };
  const { container } = render(
    <Checkbox label='Some checkbox' ref={onRef} setFocus />,
  );

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  expect(element).toBeTruthy();
  expect(document.activeElement).toEqual(element);
});

it('displays a spinner when isLoading is set to true', () => {
  const { container } = render(<Checkbox label='Some checkbox' isLoading />);

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  expect(
    container.querySelector('.iui-checkbox-wrapper.iui-loading'),
  ).toBeTruthy();
  expect(
    container.querySelector('input[type="checkbox"].iui-loading'),
  ).toBeDisabled();
  expect(
    container.querySelector(
      '.iui-progress-indicator-radial.iui-x-small.iui-indeterminate',
    ),
  ).toBeTruthy();
});

it('renders correctly with default checkbox', () => {
  const { container } = render(<Checkbox variant='default' />);

  assertBaseElements(container);

  expect(container.querySelector('.iui-checkbox-visibility')).toBeFalsy();
});

it('renders correctly with visibility checkbox', () => {
  const { container } = render(<Checkbox variant='eyeball' />);

  assertBaseElements(container);

  expect(container.querySelector('.iui-checkbox-visibility')).toBeTruthy();
});

it.each(['', 'not'] as const)(
  'should %s stop propagation correctly if %s used with label',
  async (labelPresent) => {
    const wrapperOnClick = jest.fn();
    const checkboxOnChange = jest.fn();
    const { container } = render(
      <div onClick={wrapperOnClick}>
        <Checkbox
          label={labelPresent && 'label'}
          className='my-checkbox'
          onClick={(e) => e.stopPropagation()}
          onChange={checkboxOnChange}
        />
      </div>,
    );
    const checkboxComponent = container.querySelector(
      '.my-checkbox',
    ) as HTMLElement;
    await userEvent.click(checkboxComponent);

    expect(checkboxOnChange).toBeCalled();
    if (labelPresent) {
      expect(wrapperOnClick).toBeCalled();
    } else {
      expect(wrapperOnClick).not.toBeCalled();
    }
  },
);

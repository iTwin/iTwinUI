/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';
import { LabeledSelect, LabeledSelectProps } from './LabeledSelect';
import { SelectMultipleTypeProps } from '../Select/Select';

const assertBaseElement = (inputContainer: HTMLElement) => {
  expect(inputContainer).toBeTruthy();
  const label = inputContainer.querySelector('.iui-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toEqual('Test label');
  const select = inputContainer.querySelector(
    '.iui-input-with-icon',
  ) as HTMLElement;
  expect(select).toBeTruthy();
};

function renderComponent(
  props?: Partial<LabeledSelectProps<number>> & SelectMultipleTypeProps<number>,
) {
  return render(
    <LabeledSelect<number>
      label='Test label'
      options={[...new Array(3)].map((_, index) => ({
        label: `Test${index}`,
        value: index,
      }))}
      {...props}
    />,
  );
}

it('should render correctly in its most basic state', () => {
  const { container } = renderComponent();

  const inputContainer = container.querySelector(
    '.iui-input-container',
  ) as HTMLElement;
  assertBaseElement(inputContainer);
});

it('should render message', () => {
  const { container } = renderComponent({
    message: <div className='my-message'>Message</div>,
  });

  const inputContainer = container.querySelector(
    '.iui-input-container',
  ) as HTMLElement;
  assertBaseElement(inputContainer);
  const message = container.querySelector(
    '.iui-message > .my-message',
  ) as HTMLElement;
  expect(message).toBeTruthy();
  expect(message.textContent).toBe('Message');
});

it.each(['positive', 'warning', 'negative'] as const)(
  'should render %s status',
  (status) => {
    const { container } = renderComponent({
      status,
      message: 'This is a status message',
    });

    const inputContainer = container.querySelector(
      '.iui-input-container',
    ) as HTMLElement;
    assertBaseElement(inputContainer);
    expect(
      container.querySelector(`.iui-input-container.iui-${status}`),
    ).toBeTruthy();
    expect(container.querySelector('.iui-input-icon')).toBeTruthy();
    expect(container.querySelector('.iui-message')).toBeTruthy();
  },
);

it('should render with custom icon', () => {
  const { container } = renderComponent({
    svgIcon: <svg className='my-icon' />,
  });

  const inputContainer = container.querySelector(
    '.iui-input-container',
  ) as HTMLElement;
  assertBaseElement(inputContainer);
  expect(inputContainer.querySelector('.iui-input-icon.my-icon')).toBeTruthy();
});

it('should render inline style', () => {
  const { container } = renderComponent({
    displayStyle: 'inline',
  });

  const inputContainer = container.querySelector(
    '.iui-input-container.iui-inline-label',
  ) as HTMLElement;
  assertBaseElement(inputContainer);
  expect(inputContainer.querySelector('.iui-message')).toBeFalsy();
});

it('should render with custom className on container', () => {
  const { container } = renderComponent({ className: 'test-className' });

  const inputContainer = container.querySelector(
    '.iui-input-container',
  ) as HTMLElement;
  assertBaseElement(inputContainer);
  expect(inputContainer.classList).toContain('test-className');
});

it('should render with custom style on container', () => {
  const { container } = renderComponent({ style: { color: 'red' } });

  const inputContainer = container.querySelector(
    '.iui-input-container',
  ) as HTMLElement;
  assertBaseElement(inputContainer);
  expect(inputContainer.style.color).toEqual('red');
});

it('should render with custom className on select', () => {
  const { container } = renderComponent({ selectClassName: 'test-className' });

  const inputContainer = container.querySelector(
    '.iui-input-container',
  ) as HTMLElement;
  assertBaseElement(inputContainer);
  const select = inputContainer.querySelector(
    '.iui-input-with-icon',
  ) as HTMLElement;
  expect(select).toBeTruthy();
  expect(select.classList).toContain('test-className');
});

it('should render with custom style on select', () => {
  const { container } = renderComponent({
    selectStyle: { color: 'red' },
  });

  const inputContainer = container.querySelector(
    '.iui-input-container',
  ) as HTMLElement;
  assertBaseElement(inputContainer);
  const select = inputContainer.querySelector(
    '.iui-input-with-icon',
  ) as HTMLElement;
  expect(select).toBeTruthy();
  expect(select.style.color).toEqual('red');
});

it('should handle required attribute', () => {
  const { container } = renderComponent({ required: true });
  assertBaseElement(
    container.querySelector('.iui-input-container') as HTMLElement,
  );

  expect(container.querySelector('.iui-label.iui-required')).toBeTruthy();
});

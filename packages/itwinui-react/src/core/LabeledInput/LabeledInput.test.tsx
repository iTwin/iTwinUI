/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';

import { LabeledInput } from './LabeledInput.js';

const assertBaseElement = (container: HTMLElement) => {
  const inputComponent = container.querySelector('.iui-input-grid');
  const inputWithIcon = container.querySelector(
    '.iui-input-grid > .iui-input-with-icon',
  );
  const input = container.querySelector(
    '.iui-input-grid > .iui-input-with-icon > input',
  );
  const label = container.querySelector('.iui-input-grid > .iui-input-label');

  expect(inputComponent).toBeTruthy();
  expect(inputWithIcon).toBeTruthy();
  expect(input).toBeTruthy();
  expect(label).toBeTruthy();

  return inputComponent;
};

it('should render correctly in its most basic state', () => {
  const { container, getByText } = render(<LabeledInput label='some label' />);
  assertBaseElement(container);
  expect(
    container.querySelector('.iui-input-grid > .iui-input-with-icon > input'),
  ).toBeTruthy();
  const label = getByText('some label') as HTMLElement;
  expect(label.className).toBe('iui-input-label');
});

it('should render disabled component', () => {
  const { container, getByText } = render(
    <LabeledInput label='some label' disabled />,
  );
  assertBaseElement(container);
  const label = container.querySelector('.iui-input-label');
  expect(label).toBeTruthy();
  expect(label).toHaveAttribute('data-iui-disabled', 'true');
  getByText('some label');
  expect(
    (
      container.querySelector(
        '.iui-input-with-icon > input',
      ) as HTMLInputElement
    ).disabled,
  ).toBe(true);
});

it('should handle required attribute', () => {
  const { container } = render(<LabeledInput label='some label' required />);
  assertBaseElement(container);
  expect(container.querySelector('.iui-input-label.iui-required')).toBeTruthy();
  expect(
    (container.querySelector('input') as HTMLInputElement).required,
  ).toBeTruthy();
});

it('should render message', () => {
  const { container, getByText } = render(
    <LabeledInput
      label='some label'
      message={<div className='my-message'>Message</div>}
    />,
  );
  assertBaseElement(container);
  getByText('some label');
  const message = container.querySelector('.my-message') as HTMLElement;
  expect(message).toBeTruthy();
  expect(message.textContent).toBe('Message');
});

it.each(['positive', 'negative', 'warning'] as const)(
  'should render %s component',
  (status) => {
    const { container, getByText } = render(
      <LabeledInput label='some label' status={status} />,
    );
    const inputContainer = assertBaseElement(container);
    const input = container.querySelector(
      '.iui-input-grid > .iui-input-with-icon > .iui-input',
    ) as HTMLElement;
    const svgIcon = container.querySelector(
      '.iui-input-with-icon > .iui-svg-icon',
    ) as HTMLElement;

    expect(inputContainer).toHaveAttribute('data-iui-status', status);

    // Don't unnecessarily set data-iui-status on the input when iui-input-grid already has data-iui-status
    expect(input).not.toHaveAttribute('data-iui-status', status);

    // svgIcon should have the status fill
    expect(svgIcon).toBeTruthy();
    expect(svgIcon).toHaveAttribute('data-iui-icon-color', status);
    getByText('some label');
  },
);

it('should take class and style on container', () => {
  const { container, getByText } = render(
    <LabeledInput
      label='some label'
      wrapperProps={{ className: 'my-class', style: { width: 80 } }}
    />,
  );
  assertBaseElement(container);
  getByText('some label');
  const inputContainer = container.querySelector(
    '.iui-input-grid.my-class',
  ) as HTMLElement;
  expect(inputContainer).toBeTruthy();
  expect(inputContainer.style.width).toBe('80px');
});

it('should take class and style on input', () => {
  const { container, getByText } = render(
    <LabeledInput
      label='some label'
      className='my-class'
      style={{ width: 80 }}
    />,
  );
  assertBaseElement(container);
  getByText('some label');
  const inputContainer = container.querySelector(
    'input.my-class',
  ) as HTMLElement;
  expect(inputContainer).toBeTruthy();
  expect(inputContainer.style.width).toBe('80px');
});

it('should take class and style on label', () => {
  const { container, getByText } = render(
    <LabeledInput
      label='some label'
      labelProps={{ className: 'my-class', style: { width: 80 } }}
    />,
  );
  assertBaseElement(container);
  getByText('some label');
  const label = container.querySelector(
    '.iui-input-label.my-class',
  ) as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.style.width).toBe('80px');
});

it('should take class and style on input', () => {
  const { container, getByText } = render(
    <LabeledInput
      label='some label'
      className='my-class'
      style={{ width: 80 }}
    />,
  );
  assertBaseElement(container);
  getByText('some label');
  const input = container.querySelector(
    '.iui-input-grid > .iui-input-with-icon > input.my-class',
  ) as HTMLElement;
  expect(input).toBeTruthy();
  expect(input.style.width).toBe('80px');
});

it('should render inline input', () => {
  const { container, getByText } = render(
    <LabeledInput
      label='some label'
      displayStyle='inline'
      message='My message'
      status='positive'
    />,
  );
  const inputContainer = assertBaseElement(container);
  expect(inputContainer).toHaveAttribute('data-iui-label-placement', 'inline');
  getByText('some label');
  getByText('My message');
  expect(container.querySelector('.iui-svg-icon')).toBeTruthy();
});

it('should take custom icon', () => {
  const { container, getByText } = render(
    <LabeledInput
      label='some label'
      displayStyle='inline'
      svgIcon={<svg className='my-icon' />}
    />,
  );
  assertBaseElement(container);
  getByText('some label');

  expect(
    container.querySelector(
      '.iui-input-grid > .iui-input-with-icon > .iui-svg-icon',
    ),
  ).toBeTruthy();
  expect(
    container.querySelector(
      '.iui-input-grid > .iui-input-with-icon > .iui-svg-icon > .my-icon',
    ),
  ).toBeTruthy();
});

it.each(['positive', 'negative', 'warning'] as const)(
  'should give status fill to custom icon',
  (status) => {
    const { container, getByText } = render(
      <LabeledInput
        label='some label'
        displayStyle='inline'
        svgIcon={<svg className='my-icon' />}
        status={status}
      />,
    );
    assertBaseElement(container);
    getByText('some label');

    const svgIcon = container.querySelector(
      '.iui-input-grid > .iui-input-with-icon > .iui-svg-icon',
    ) as HTMLElement;

    expect(svgIcon).toBeTruthy();
    expect(svgIcon).toHaveAttribute('data-iui-icon-color', status);
  },
);

it('should render inline icon', () => {
  const { container, queryByText, getByText } = render(
    <LabeledInput
      label='some label'
      svgIcon={<svg className='my-icon' />}
      message='My message'
    />,
  );
  const inputContainer = assertBaseElement(container);
  expect(inputContainer).not.toHaveAttribute(
    'data-iui-label-placement',
    'inline',
  );
  expect(queryByText('some label')).toHaveClass('iui-input-label');
  getByText('My message');
  expect(container.querySelector('.my-icon')).toBeTruthy();
});

it('should not render default icon when null is passed', () => {
  const { container, queryByText } = render(
    <LabeledInput label='some label' svgIcon={null} status='negative' />,
  );
  assertBaseElement(container);
  expect(queryByText('some label')).toHaveClass('iui-input-label');
  expect(container.querySelector('.iui-svg-icon')).not.toBeTruthy();
});

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render } from '@testing-library/react';
import { LabeledSelect } from './LabeledSelect.js';
import type { LabeledSelectProps } from './LabeledSelect.js';
import type {
  CustomSelectProps,
  SelectMultipleTypeProps,
} from '../Select/Select.js';

const assertBaseElement = (inputContainer: HTMLElement) => {
  expect(inputContainer).toBeTruthy();
  const label = inputContainer.querySelector('.iui-input-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toEqual('Test label');
  const select = inputContainer.querySelector(
    '.iui-input-with-icon',
  ) as HTMLElement;
  expect(select).toBeTruthy();
};

function renderComponent(
  props?: Partial<CustomSelectProps<number> & LabeledSelectProps<number>> &
    SelectMultipleTypeProps<number>,
) {
  return render(
    <LabeledSelect<number>
      label='Test label'
      options={[...new Array(3)].map((_, index) => ({
        label: `Test${index}`,
        value: index,
      }))}
      {...props}
      native={false}
    />,
  );
}

it('should render correctly in its most basic state', () => {
  const { container } = renderComponent();

  const inputContainer = container.querySelector(
    '.iui-input-grid',
  ) as HTMLElement;
  assertBaseElement(inputContainer);
});

it('should have correct accessible name', () => {
  const { container } = renderComponent();
  const label = container.querySelector('.iui-input-label') as HTMLElement;
  expect(container.querySelector('[role=combobox]')).toHaveAttribute(
    'aria-labelledby',
    `${label.id}`,
  );
});

it('should render message', () => {
  const { container } = renderComponent({
    message: <div className='my-message'>Message</div>,
  });

  const inputContainer = container.querySelector(
    '.iui-input-grid',
  ) as HTMLElement;
  assertBaseElement(inputContainer);
  const message = container.querySelector('.my-message') as HTMLElement;
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
      '.iui-input-grid',
    ) as HTMLElement;
    assertBaseElement(inputContainer);

    expect(inputContainer).toHaveAttribute('data-iui-status', status);

    const select = container.querySelector(`.iui-select-button`) as HTMLElement;

    // Don't unnecessarily set data-iui-status on the select when iui-input-grid already has data-iui-status
    expect(select).not.toHaveAttribute('data-iui-status', status);

    expect(container.querySelector('.iui-svg-icon')).toBeTruthy();
    expect(container.querySelector('.iui-status-message')).toBeTruthy();
  },
);

it('should render with custom icon', () => {
  const { container } = renderComponent({
    svgIcon: <svg className='my-icon' />,
    message: 'my message',
  });

  const inputContainer = container.querySelector(
    '.iui-input-grid',
  ) as HTMLElement;
  assertBaseElement(inputContainer);
  const icon = inputContainer.querySelector('.iui-svg-icon > .my-icon');
  expect(icon).toBeTruthy();
});

it('should render inline style', () => {
  const { container } = renderComponent({
    displayStyle: 'inline',
  });

  const inputContainer = container.querySelector(
    '.iui-input-grid',
  ) as HTMLElement;
  assertBaseElement(inputContainer);
  expect(inputContainer.querySelector('.iui-status-message')).toBeFalsy();
});

it('should render with custom className on select', () => {
  const { container } = renderComponent({ className: 'test-className' });

  const inputContainer = container.querySelector(
    '.iui-input-grid',
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
    style: { color: 'red' },
  });

  const inputContainer = container.querySelector(
    '.iui-input-grid',
  ) as HTMLElement;
  assertBaseElement(inputContainer);
  const select = inputContainer.querySelector(
    '.iui-input-with-icon',
  ) as HTMLElement;
  expect(select).toBeTruthy();
  expect(select.style.color).toEqual('red');
});

it('should render with custom style on wrapper', () => {
  const { container } = renderComponent({
    wrapperProps: { style: { color: 'red' }, className: 'my-classname' },
  });

  const inputContainer = container.querySelector(
    '.iui-input-grid.my-classname',
  );
  expect(inputContainer).toBeTruthy();
  expect((inputContainer as HTMLElement).style.color).toEqual('red');
});

it('should render with custom style on label', () => {
  const { container } = renderComponent({
    labelProps: { style: { color: 'red' }, className: 'my-classname' },
  });

  const label = container.querySelector('.iui-input-label.my-classname');
  expect(label).toBeTruthy();
  expect((label as HTMLElement).style.color).toEqual('red');
});

it('should render with custom style on message', () => {
  const { container } = renderComponent({
    message: 'Test message',
    svgIcon: <svg />,
    messageContentProps: { style: { color: 'red' }, className: 'my-classname' },
    messageIconProps: {
      style: { color: 'green' },
      className: 'my-icon-classname',
    },
  });

  const content = container.querySelector('.my-classname');
  expect(content).toBeTruthy();
  expect((content as HTMLElement).style.color).toEqual('red');
  const icon = container.querySelector('.iui-svg-icon.my-icon-classname');
  expect(icon).toBeTruthy();
  expect((icon as HTMLElement).style.color).toEqual('green');
});

it('should handle required attribute', () => {
  const { container } = renderComponent({ required: true });
  assertBaseElement(container.querySelector('.iui-input-grid') as HTMLElement);

  expect(container.querySelector('.iui-input-label.iui-required')).toBeTruthy();
});

it('should allow passing ref to LabeledSelect', () => {
  const selectRef = React.createRef<HTMLElement>();
  render(
    <LabeledSelect
      options={[{ value: 1, label: 'Option 1' }]}
      ref={selectRef}
      data-select
    />,
  );

  expect(selectRef?.current).toHaveAttribute('data-select');
});

it('should support native select', () => {
  const { container } = render(
    <LabeledSelect native label='the label' options={[]} />,
  );
  const select = container.querySelector('select') as HTMLSelectElement;
  expect(select).toHaveAccessibleName('the label');
});

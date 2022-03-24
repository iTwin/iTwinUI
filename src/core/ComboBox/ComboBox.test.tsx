/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { ComboBox, ComboBoxProps } from './ComboBox';
import { SvgCaretDownSmall } from '@itwin/itwinui-icons-react';
import { MenuItem } from '../Menu';
import { StatusMessage } from '../StatusMessage';
import userEvent from '@testing-library/user-event';

const renderComponent = (props?: Partial<ComboBoxProps<number>>) => {
  return render(
    <ComboBox
      options={[
        { label: 'Item 0', value: 0 },
        { label: 'Item 1', value: 1 },
        { label: 'Item 2', value: 2 },
      ]}
      {...props}
    />,
  );
};

const assertBaseElement = (container: HTMLElement) => {
  const rootElement = container.querySelector(
    '.iui-input-container',
  ) as HTMLDivElement;

  const input = rootElement.querySelector('.iui-input') as HTMLInputElement;
  expect(input).toHaveAttribute('role', 'combobox');
  expect(input).toHaveAttribute('autocapitalize', 'none');
  expect(input).toHaveAttribute('autocorrect', 'off');
  expect(input).toHaveAttribute('spellcheck', 'false');

  return input;
};

it('should render in its most basic state', () => {
  const { container } = renderComponent();
  const id = container.querySelector('.iui-input-container')?.id;
  const input = assertBaseElement(container);

  input.focus();
  expect(input).toHaveAttribute('aria-expanded', 'true');
  expect(input).toHaveAttribute('aria-controls', `${id}-list`);
  expect(input).toHaveAttribute('aria-autocomplete', 'list');

  const list = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(list).toBeVisible();
  expect(list.id).toEqual(`${id}-list`);
  expect(list).toHaveAttribute('role', 'listbox');
  expect(list.children).toHaveLength(3);
  list.querySelectorAll('.iui-menu-item').forEach((item, index) => {
    expect(item).toHaveTextContent(`Item ${index}`);
    expect(item).not.toHaveAttribute('aria-selected');
    expect(item.id).toEqual(`${id}-option${index}`);
  });
});

it('should render with selected value', () => {
  const { container } = renderComponent({ value: 2 });
  const input = assertBaseElement(container);
  expect(input.value).toEqual('Item 2');

  input.focus();
  document.querySelectorAll('.iui-menu-item').forEach((item, index) => {
    expect(item).toHaveTextContent(`Item ${index}`);
    if (index === 2) {
      expect(item).toHaveClass('iui-active');
      expect(item).toHaveAttribute('aria-selected', 'true');
    }
  });
});

it('should render caret icon correctly', () => {
  const { container } = renderComponent();
  let icon = container.querySelector('.iui-end-icon svg') as HTMLElement;

  const {
    container: { firstChild: caretDown },
  } = render(<SvgCaretDownSmall aria-hidden />);

  expect(icon).toEqual(caretDown);
  expect(document.querySelector('.iui-menu')).toBeFalsy();

  // open
  fireEvent.click(icon);
  icon = container.querySelector('.iui-end-icon svg') as HTMLElement;
  expect(icon).toEqual(caretDown);
  expect(document.querySelector('.iui-menu')).toBeVisible();

  // close
  fireEvent.click(icon);
  icon = container.querySelector('.iui-end-icon svg') as HTMLElement;
  expect(icon).toEqual(caretDown);
  expect(document.querySelector('.iui-menu')).not.toBeVisible();
});

it('should filter list according to text input', () => {
  const emptyText = 'No options 🙁';
  const { container } = renderComponent({
    options: [
      { label: 'Item0', value: 0 },
      { label: 'Item-1', value: 1 },
      { label: 'Item-2', value: 2 },
      { label: 'Item-3', value: 3 },
    ],
    emptyStateMessage: emptyText,
  });
  const input = assertBaseElement(container);
  input.focus();
  const menu = document.querySelector('.iui-menu') as HTMLElement;

  // no filter
  expect(menu.children).toHaveLength(4);

  // filter with all items
  fireEvent.change(input, { target: { value: 'Item' } });
  expect(menu.children).toHaveLength(4);

  // 3 items
  fireEvent.change(input, { target: { value: 'Item-' } });
  expect(menu.children).toHaveLength(3);

  // only 1 item
  fireEvent.change(input, { target: { value: 'Item-2' } });
  expect(menu.children).toHaveLength(1);
  expect(menu.firstElementChild).toHaveTextContent('Item-2');

  // no items
  fireEvent.change(input, { target: { value: 'Item-5' } });
  expect(menu.children).toHaveLength(1);
  expect(menu.firstElementChild).toHaveTextContent(emptyText);

  // 1 item
  fireEvent.change(input, { target: { value: 'Item-3' } });
  expect(menu.children).toHaveLength(1);
  expect(menu.firstElementChild).toHaveTextContent('Item-3');

  // clear filter
  fireEvent.change(input, { target: { value: '' } });
  expect(menu.children).toHaveLength(4);
});

it('should accept custom filter function', () => {
  const { container } = renderComponent({
    options: [
      { label: 'ItemZero', value: 0 },
      { label: 'Item-one', value: 1 },
      { label: 'Item-two', value: 2 },
      { label: 'Item-three', value: 3 },
    ],
    filterFunction: (options, str) =>
      options.filter(
        (option) =>
          option.label.includes(str) || option.value.toString().includes(str),
      ),
  });
  const input = assertBaseElement(container);
  input.focus();
  const menu = document.querySelector('.iui-menu') as HTMLElement;

  // no filter
  expect(menu.children).toHaveLength(4);

  // 3 items
  fireEvent.change(input, { target: { value: 'Item-' } });
  expect(menu.children).toHaveLength(3);

  // only 1 item
  fireEvent.change(input, { target: { value: '2' } });
  expect(menu.children).toHaveLength(1);
  expect(menu.firstElementChild).toHaveTextContent('Item-two');

  // only 1 item
  fireEvent.change(input, { target: { value: 'Zero' } });
  expect(menu.children).toHaveLength(1);
  expect(menu.firstElementChild).toHaveTextContent('ItemZero');

  // no items
  fireEvent.change(input, { target: { value: 'five' } });
  expect(menu.children).toHaveLength(1);
  expect(menu.firstElementChild).toHaveTextContent('No options');
});

it('should select value on click', () => {
  const mockOnChange = jest.fn();
  const { container, getByText } = renderComponent({ onChange: mockOnChange });
  const input = assertBaseElement(container);

  input.focus();
  getByText('Item 1').click();
  expect(mockOnChange).toHaveBeenCalledWith(1);
  expect(document.querySelector('.iui-menu')).not.toBeVisible();
  expect(input.value).toEqual('Item 1');

  input.blur();
  input.focus();
  expect(
    document.querySelector('.iui-menu-item.iui-active.iui-focused'),
  ).toHaveTextContent('Item 1');
});

it('should handle keyboard navigation', () => {
  const id = 'test-component';
  const mockOnChange = jest.fn();
  const { container } = renderComponent({ id, onChange: mockOnChange });

  const input = assertBaseElement(container);
  input.focus();
  expect(input).toHaveAttribute('aria-controls', `${id}-list`);

  const items = document.querySelectorAll('.iui-menu-item');

  // focus index 0
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option0`);
  expect(items[0]).toHaveClass('iui-focused');

  // 0 -> 1
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option1`);
  expect(items[1]).toHaveClass('iui-focused');
  expect(items[0]).not.toHaveClass('iui-focused');

  // 1 -> 2
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option2`);
  expect(items[2]).toHaveClass('iui-focused');

  // 2 -> 2
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option2`);
  expect(items[2]).toHaveClass('iui-focused');

  // 2 -> 1
  fireEvent.keyDown(input, { key: 'ArrowUp' });
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option1`);
  expect(items[1]).toHaveClass('iui-focused');
  expect(items[2]).not.toHaveClass('iui-focused');

  // 1 -> 0
  fireEvent.keyDown(input, { key: 'ArrowUp' });
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option0`);
  expect(items[0]).toHaveClass('iui-focused');

  // select 0
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(mockOnChange).toHaveBeenCalledWith(0);
  expect(document.querySelector('.iui-menu')).not.toBeVisible();

  // reopen menu
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(items[0]).toHaveClass('iui-active iui-focused');

  // filter and focus item 2
  fireEvent.change(input, { target: { value: 'Item 2' } });
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(items[2]).toHaveClass('iui-focused');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option2`);

  // select 2
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(mockOnChange).toHaveBeenCalledWith(2);
  expect(document.querySelector('.iui-menu')).not.toBeVisible();

  // reopen
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(items[2]).toHaveClass('iui-active iui-focused');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option2`);

  // close
  fireEvent.keyDown(input, { key: 'Escape' });
  expect(document.querySelector('.iui-menu')).not.toBeVisible();

  // reopen and close
  fireEvent.keyDown(input, { key: 'X' });
  expect(document.querySelector('.iui-menu')).toBeVisible();
  fireEvent.keyDown(input, { key: 'Tab' });
  expect(document.querySelector('.iui-menu')).not.toBeVisible();
});

it('should accept inputProps', () => {
  const inputId = 'test-input';
  const { container } = renderComponent({
    inputProps: { id: inputId, name: 'input-name', required: true },
  });

  const input = assertBaseElement(container);
  expect(input.name).toBe('input-name');
  expect(input.required).toBeTruthy();
  expect(input.id).toBe(inputId);

  input.focus();
  expect(container.querySelector('.iui-input-container')?.id).toBe(
    `${inputId}-cb`,
  );
  expect(document.querySelector('.iui-menu')?.id).toBe(`${inputId}-cb-list`);
});

it('should work with custom itemRenderer', () => {
  const mockOnChange = jest.fn();
  const { container, getByText } = renderComponent({
    itemRenderer: ({ value, label }, { isSelected, id }) => (
      <MenuItem
        key={value}
        id={id}
        isSelected={isSelected}
        value={value}
        className='my-custom-item'
      >
        <em>CUSTOM {label}</em>
      </MenuItem>
    ),
    onChange: mockOnChange,
  });
  const input = assertBaseElement(container);

  input.focus();
  getByText('CUSTOM Item 1').click();
  expect(mockOnChange).toHaveBeenCalledWith(1);
  expect(document.querySelector('.iui-menu')).not.toBeVisible();
  expect(input).toHaveValue('Item 1'); // the actual value of input doesn't change

  input.blur();
  input.focus();
  expect(
    document.querySelector(
      '.iui-menu-item.iui-active.iui-focused.my-custom-item',
    ),
  ).toHaveTextContent('CUSTOM Item 1');

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(
    document.querySelector('.iui-menu-item.iui-focused.my-custom-item'),
  ).toHaveTextContent('CUSTOM Item 2');

  fireEvent.keyDown(input, { key: 'Enter' });
  expect(input).toHaveValue('Item 2');
});

it('should accept status prop', () => {
  const { container } = renderComponent({ status: 'negative' });

  expect(container.querySelector('.iui-input-container')).toHaveClass(
    'iui-negative',
  );
});

it('should render with message', () => {
  const { container } = renderComponent({
    message: (
      <StatusMessage>
        <div className='my-message'>Message</div>
      </StatusMessage>
    ),
  });
  assertBaseElement(container);
  const message = container.querySelector(
    '.iui-message > .my-message',
  ) as HTMLElement;
  expect(message).toBeTruthy();
  expect(message.textContent).toBe('Message');
});

it('should render with message as string', () => {
  const { container } = renderComponent({
    message: 'My message as string',
  });
  assertBaseElement(container);
  const message = container.querySelector('.iui-message') as HTMLElement;
  expect(message).toBeTruthy();
  expect(message.textContent).toBe('My message as string');
});

it('should render with message as string and status', () => {
  const { container } = renderComponent({
    message: 'My message as string',
    status: 'warning',
  });
  assertBaseElement(container);
  const message = container.querySelector('.iui-message') as HTMLElement;
  expect(message).toBeTruthy();
  expect(message.textContent).toBe('My message as string');
  const inputContainer = container.querySelector(
    '.iui-input-container',
  ) as HTMLElement;
  assertBaseElement(container);
  expect(inputContainer).toHaveClass('iui-warning');
  expect(inputContainer.querySelector('.iui-input-icon')).toBeTruthy();
});

it('should render with custom icon', () => {
  const { container } = renderComponent({
    message: (
      <StatusMessage startIcon={<svg className='my-icon' />}>
        Text here
      </StatusMessage>
    ),
  });

  const inputContainer = container.querySelector(
    '.iui-input-container',
  ) as HTMLElement;
  assertBaseElement(container);
  expect(inputContainer.querySelector('.iui-input-icon.my-icon')).toBeTruthy();
});

it('should render with message and status', () => {
  const { container } = renderComponent({
    status: 'positive',
    message: <StatusMessage>Text here</StatusMessage>,
  });

  const inputContainer = container.querySelector(
    '.iui-input-container',
  ) as HTMLElement;
  assertBaseElement(container);
  expect(inputContainer).toHaveClass('iui-positive');
  expect(inputContainer.querySelector('.iui-input-icon')).toBeTruthy();
  const message = container.querySelector('.iui-message') as HTMLElement;
  expect(message.textContent).toBe('Text here');
});

it('should merge inputProps.onChange correctly', () => {
  const mockOnChange = jest.fn();
  const { container } = renderComponent({
    inputProps: { onChange: ({ target: { value } }) => mockOnChange(value) },
  });

  assertBaseElement(container);
  const input = container.querySelector('.iui-input') as HTMLInputElement;
  userEvent.tab();
  userEvent.keyboard('hi');

  expect(input).toHaveValue('hi');
  expect(mockOnChange).toHaveBeenCalledWith('hi');
});

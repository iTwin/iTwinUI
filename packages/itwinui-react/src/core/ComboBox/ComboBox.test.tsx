/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import {
  ComboBox,
  type ComboboxMultipleTypeProps,
  type ComboBoxProps,
} from './ComboBox.js';
import { SvgCaretDownSmall } from '../../utils/index.js';
import { MenuItem } from '../Menu/MenuItem.js';
import { StatusMessage } from '../StatusMessage/StatusMessage.js';
import { userEvent } from '@testing-library/user-event';

const renderComponent = (
  props?: Partial<ComboBoxProps<number>> & ComboboxMultipleTypeProps<number>,
) => {
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
    '.iui-input-grid',
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
  const id = container.querySelector('.iui-input-grid')?.id;
  const input = assertBaseElement(container);

  fireEvent.focus(input);
  expect(input).toHaveAttribute('aria-expanded', 'true');
  expect(input).toHaveAttribute('aria-controls', `${id}-list`);
  expect(input).toHaveAttribute('aria-autocomplete', 'list');

  const list = document.querySelector('.iui-menu') as HTMLElement;
  expect(list).toBeVisible();
  expect(list.id).toEqual(`${id}-list`);
  expect(list).toHaveAttribute('role', 'listbox');
  expect(list.children).toHaveLength(3);
  list.querySelectorAll('.iui-list-item').forEach((item, index) => {
    expect(item).toHaveTextContent(`Item ${index}`);
    expect(item).toHaveAttribute('aria-selected', 'false');
    expect(item.id).toEqual(`${id}-option-Item-${index}`);
  });
});

it('should render with selected value', () => {
  const { container } = renderComponent({ value: 2 });
  const input = assertBaseElement(container);
  expect(input.value).toEqual('Item 2');

  fireEvent.focus(input);
  document.querySelectorAll('.iui-list-item').forEach((item, index) => {
    expect(item).toHaveTextContent(`Item ${index}`);
    if (index === 2) {
      expect(item).toHaveAttribute('data-iui-active', 'true');
      expect(item).toHaveAttribute('aria-selected', 'true');
    }
  });
});

it('should render caret icon correctly', async () => {
  const { container } = renderComponent();
  let icon = container.querySelector(
    '.iui-end-icon.iui-svg-icon > svg',
  ) as HTMLElement;

  const input = container.querySelector('input') as HTMLElement;

  const {
    container: { firstChild: caretDown },
  } = render(<SvgCaretDownSmall aria-hidden />);

  expect(icon).toEqual(caretDown);
  expect(document.querySelector('.iui-menu')).toBeFalsy();

  // open
  await userEvent.click(input);
  icon = container.querySelector('.iui-end-icon.iui-open > svg') as HTMLElement;
  expect(icon).toEqual(caretDown);
  expect(document.querySelector('.iui-menu')).toBeVisible();
  const menuItem = document.querySelector('.iui-list-item') as HTMLElement;

  // close
  await userEvent.click(menuItem);
  icon = container.querySelector(
    '.iui-end-icon.iui-svg-icon > svg',
  ) as HTMLElement;
  expect(icon).toEqual(caretDown);
  expect(document.querySelector('.iui-menu')).toBeFalsy();
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
  fireEvent.focus(input);
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
  fireEvent.focus(input);
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

it('should select value on click', async () => {
  const mockOnChange = vi.fn();
  const { container, getByText } = renderComponent({ onChange: mockOnChange });
  const input = assertBaseElement(container);

  await userEvent.tab();
  await userEvent.click(getByText('Item 1'));
  expect(mockOnChange).toHaveBeenCalledWith(1);
  expect(document.querySelector('.iui-menu')).toBeFalsy();
  expect(input.value).toEqual('Item 1');

  await userEvent.tab({ shift: true });
  await userEvent.tab();
  expect(
    document.querySelector(`.iui-list-item[data-iui-focused='true']`),
  ).toHaveTextContent('Item 1');
});

it('should handle keyboard navigation when virtualization is disabled', async () => {
  const id = 'test-component';
  const mockOnChange = vi.fn();
  const { container } = renderComponent({ id, onChange: mockOnChange });

  await userEvent.tab();

  const input = assertBaseElement(container);
  expect(input).toHaveAttribute('aria-controls', `${id}-list`);

  let items = document.querySelectorAll('.iui-list-item');

  // focus index 0
  await userEvent.keyboard('{ArrowDown}');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-0`);
  items = document.querySelectorAll('.iui-list-item');
  expect(items[0]).toHaveAttribute('data-iui-focused', 'true');

  // 0 -> 1
  await userEvent.keyboard('{ArrowDown}');
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-1`);
  expect(items[1]).toHaveAttribute('data-iui-focused', 'true');
  expect(items[0]).not.toHaveAttribute('data-iui-focused', 'true');

  // 1 -> 2
  await userEvent.keyboard('{ArrowDown}');
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-2`);
  expect(items[2]).toHaveAttribute('data-iui-focused', 'true');

  // 2 -> 0
  await userEvent.keyboard('{ArrowDown}');
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-0`);
  expect(items[0]).toHaveAttribute('data-iui-focused', 'true');

  // 0 -> 2
  await userEvent.keyboard('{ArrowUp}');
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-2`);
  expect(items[2]).toHaveAttribute('data-iui-focused', 'true');

  // 2 -> 1
  await userEvent.keyboard('{ArrowUp}');
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-1`);
  expect(items[1]).toHaveAttribute('data-iui-focused', 'true');
  expect(items[2]).not.toHaveAttribute('data-iui-focused', 'true');

  // 1 -> 0
  await userEvent.keyboard('{ArrowUp}');
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-0`);
  expect(items[0]).toHaveAttribute('data-iui-focused', 'true');

  // select 0
  await userEvent.keyboard('{Enter}');
  items = document.querySelectorAll('.iui-list-item');
  expect(mockOnChange).toHaveBeenCalledWith(0);
  expect(document.querySelector('.iui-menu')).toBeFalsy();

  // reopen menu
  await userEvent.keyboard('{Enter}');
  items = document.querySelectorAll('.iui-list-item');
  expect(items[0]).toHaveAttribute('data-iui-focused', 'true');
  expect(items[0]).toHaveAttribute('data-iui-active', 'true');

  // filter and focus item 2
  await act(async () => {
    input.select();
    await userEvent.keyboard('2');
  });

  await act(async () => void (await userEvent.keyboard('{ArrowDown}')));
  expect(screen.getByText('Item 2').closest('.iui-list-item')).toHaveAttribute(
    'data-iui-focused',
    'true',
  );
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-2`);

  // select 2
  await userEvent.keyboard('{Enter}');
  expect(mockOnChange).toHaveBeenCalledWith(2);
  expect(document.querySelector('.iui-menu')).toBeFalsy();

  // reopen
  await act(async () => void (await userEvent.keyboard('{ArrowDown}')));
  expect(screen.getByText('Item 2').closest('.iui-list-item')).toHaveAttribute(
    'data-iui-active',
    'true',
  );

  // close
  await act(async () => void (await userEvent.keyboard('{Esc}')));
  expect(document.querySelector('.iui-menu')).toBeFalsy();

  // reopen and close
  await act(async () => void (await userEvent.keyboard('X')));
  expect(document.querySelector('.iui-menu')).toBeVisible();
  await userEvent.tab();
  expect(document.querySelector('.iui-menu')).toBeFalsy();
});

it('should handle keyboard navigation when virtualization is enabled', async () => {
  const id = 'test-component';
  const mockOnChange = vi.fn();
  const { container } = renderComponent({
    id,
    onChange: mockOnChange,
    enableVirtualization: true,
    options: [
      { label: 'Item 0', value: 0 },
      { label: 'Item 1', value: 1 },
      { label: 'Item 2', value: 2 },
      { label: 'Item 3', value: 3 },
      { label: 'Item 4', value: 4 },
      { label: 'Item 5', value: 5 },
      { label: 'Item 6', value: 6 },
      { label: 'Item 7', value: 7 },
      { label: 'Item 8', value: 8 },
      { label: 'Item 9', value: 9 },
      { label: 'Item 10', value: 10 },
      { label: 'Item 11', value: 11 },
    ],
  });

  await userEvent.tab();

  const input = assertBaseElement(container);
  expect(input).toHaveAttribute('aria-controls', `${id}-list`);

  let items = document.querySelectorAll('.iui-list-item');

  // focus index 0
  await userEvent.keyboard('{ArrowDown}');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-0`);
  items = document.querySelectorAll('.iui-list-item');
  expect(items[0]).toHaveAttribute('data-iui-focused', 'true');

  // 0 stay
  await userEvent.keyboard('{ArrowUp}');
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-0`);
  expect(items[0]).toHaveAttribute('data-iui-focused', 'true');

  // 0 -> 1
  await userEvent.keyboard('{ArrowDown}');
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-1`);
  expect(items[1]).toHaveAttribute('data-iui-focused', 'true');
  expect(items[0]).not.toHaveAttribute('data-iui-focused', 'true');

  // 1 -> 11
  for (let i = 0; i <= 11; ++i) {
    await userEvent.keyboard('{ArrowDown}');
  }
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute(
    'aria-activedescendant',
    `${id}-option-Item-11`,
  );
  expect(items[11]).toHaveAttribute('data-iui-focused', 'true');

  // 11 stay
  await userEvent.keyboard('{ArrowDown}');
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute(
    'aria-activedescendant',
    `${id}-option-Item-11`,
  );
  expect(items[11]).toHaveAttribute('data-iui-focused', 'true');

  // select 11
  await userEvent.keyboard('{Enter}');
  items = document.querySelectorAll('.iui-list-item');
  expect(mockOnChange).toHaveBeenCalledWith(11);
  expect(document.querySelector('.iui-menu')).toBeFalsy();

  // reopen menu
  await userEvent.keyboard('{Enter}');
  items = document.querySelectorAll('.iui-list-item');
  expect(items[11]).toHaveAttribute('data-iui-focused', 'true');
  expect(items[11]).toHaveAttribute('data-iui-active', 'true');

  // filter and focus item 1
  await act(async () => {
    input.select();
    await userEvent.keyboard('1');
  });
  expect(document.querySelectorAll('.iui-list-item').length).toBe(3),
    await userEvent.keyboard('{ArrowDown}');
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-1`);
  expect(items[0]).toHaveAttribute('data-iui-focused', 'true');

  // 1 stay
  await userEvent.keyboard('{ArrowUp}');
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-1`);
  expect(items[0]).toHaveAttribute('data-iui-focused', 'true');

  // 1 -> 10
  await userEvent.keyboard('{ArrowDown}');
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute(
    'aria-activedescendant',
    `${id}-option-Item-10`,
  );
  expect(items[1]).toHaveAttribute('data-iui-focused', 'true');

  // 1 -> 11
  await userEvent.keyboard('{ArrowDown}');
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute(
    'aria-activedescendant',
    `${id}-option-Item-11`,
  );
  expect(items[2]).toHaveAttribute('data-iui-focused', 'true');

  // 11 stay
  await userEvent.keyboard('{ArrowDown}');
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute(
    'aria-activedescendant',
    `${id}-option-Item-11`,
  );
  expect(items[2]).toHaveAttribute('data-iui-focused', 'true');

  // select 11
  await userEvent.keyboard('{Enter}');
  expect(mockOnChange).toHaveBeenCalledWith(11);
  expect(document.querySelector('.iui-menu')).toBeFalsy();

  // reopen
  await act(async () => void (await userEvent.keyboard('{ArrowDown}')));
  expect(screen.getByText('Item 11').closest('.iui-list-item')).toHaveAttribute(
    'data-iui-active',
    'true',
  );

  // close
  await act(async () => void (await userEvent.keyboard('{Esc}')));
  expect(document.querySelector('.iui-menu')).toBeFalsy();

  // reopen and close
  await act(async () => void (await userEvent.keyboard('X')));
  expect(document.querySelector('.iui-menu')).toBeVisible();
  await userEvent.tab();
  expect(document.querySelector('.iui-menu')).toBeFalsy();
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

  fireEvent.focus(input);
  expect(container.querySelector('.iui-input-grid')?.id).toBe(
    `iui-${inputId}-cb`,
  );
  expect(document.querySelector('.iui-menu')?.id).toBe(
    `iui-${inputId}-cb-list`,
  );
});

it('should use the defaultValue when passed', () => {
  const { container } = renderComponent({ defaultValue: 1 });
  const input = assertBaseElement(container);
  expect(input).toHaveValue('Item 1');
});

it('should work with custom itemRenderer', async () => {
  const mockOnChange = vi.fn();
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

  await userEvent.tab();
  await userEvent.click(getByText('CUSTOM Item 1'));
  expect(mockOnChange).toHaveBeenCalledWith(1);
  expect(document.querySelector('.iui-menu')).toBeFalsy();
  expect(input).toHaveValue('Item 1'); // the actual value of input doesn't change

  await userEvent.keyboard('{Enter}'); // reopen menu

  expect(
    document.querySelector(
      `.iui-list-item.my-custom-item[data-iui-active='true']`,
    ),
  ).toHaveTextContent('CUSTOM Item 1');

  await act(async () => void (await userEvent.keyboard('{ArrowDown}')));

  expect(
    document.querySelector(
      `.iui-list-item.my-custom-item[data-iui-focused='true']`,
    ),
  ).toHaveTextContent('CUSTOM Item 2');

  await act(async () => void (await userEvent.keyboard('{Enter}')));
  expect(input).toHaveValue('Item 2');
});

it('should accept status prop', () => {
  const { container } = renderComponent({ status: 'negative' });

  expect(container.querySelector('.iui-input-grid')).toHaveAttribute(
    'data-iui-status',
    'negative',
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
  const message = container.querySelector('.my-message') as HTMLElement;
  expect(message).toBeTruthy();
  expect(message.textContent).toBe('Message');
});

it('should render with message as string', () => {
  const { container } = renderComponent({
    message: 'My message as string',
  });
  assertBaseElement(container);
  const message = container.querySelector('.iui-status-message') as HTMLElement;
  expect(message).toBeTruthy();
  expect(message.textContent).toBe('My message as string');
});

it('should render with message as string and status', () => {
  const { container } = renderComponent({
    message: 'My message as string',
    status: 'warning',
  });
  assertBaseElement(container);
  const message = container.querySelector('.iui-status-message') as HTMLElement;
  expect(message).toBeTruthy();
  expect(message.textContent).toBe('My message as string');
  const inputContainer = container.querySelector(
    '.iui-input-grid',
  ) as HTMLElement;
  assertBaseElement(container);
  expect(inputContainer).toHaveAttribute('data-iui-status', 'warning');
  expect(inputContainer.querySelector('.iui-svg-icon')).toBeTruthy();
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
    '.iui-input-grid',
  ) as HTMLElement;
  assertBaseElement(container);
  expect(inputContainer.querySelector('.iui-svg-icon .my-icon')).toBeTruthy();
});

it('should render with message and status', () => {
  const { container } = renderComponent({
    status: 'positive',
    message: <StatusMessage>Text here</StatusMessage>,
  });

  const inputContainer = container.querySelector(
    '.iui-input-grid',
  ) as HTMLElement;
  assertBaseElement(container);
  expect(inputContainer).toHaveAttribute('data-iui-status', 'positive');
  expect(inputContainer.querySelector('.iui-svg-icon')).toBeTruthy();
  const message = container.querySelector('.iui-status-message') as HTMLElement;
  expect(message.textContent).toBe('Text here');
});

it('should merge inputProps.onChange correctly', async () => {
  const mockOnChange = vi.fn();
  const { container } = renderComponent({
    inputProps: { onChange: ({ target: { value } }) => mockOnChange(value) },
  });

  assertBaseElement(container);
  const input = container.querySelector('.iui-input') as HTMLInputElement;
  await userEvent.tab();
  await userEvent.keyboard('hi');

  expect(input).toHaveValue('hi');
  expect(mockOnChange).toHaveBeenCalledWith('hi');
});

it('should use the latest onChange prop', async () => {
  const mockOnChange1 = vi.fn();
  const mockOnChange2 = vi.fn();
  const options = [0, 1, 2].map((value) => ({ value, label: `Item ${value}` }));

  const { rerender } = render(
    <ComboBox options={options} onChange={mockOnChange1} />,
  );

  await userEvent.tab();
  await userEvent.click(screen.getByText('Item 1'));
  expect(mockOnChange1).toHaveBeenNthCalledWith(1, 1);

  rerender(<ComboBox options={options} onChange={mockOnChange2} />);
  await userEvent.keyboard('{Enter}'); // reopen menu
  await userEvent.click(screen.getByText('Item 2'));
  expect(mockOnChange2).toHaveBeenNthCalledWith(1, 2);
  expect(mockOnChange1).toHaveBeenCalledTimes(1);
});

it('should call onExpand and onCollapse when dropdown is opened and closed', async () => {
  const onExpand = vi.fn();
  const onCollapse = vi.fn();
  const { container } = renderComponent({
    onShow: onExpand,
    onHide: onCollapse,
  });

  const input = container.querySelector('input') as HTMLElement;
  await userEvent.click(input);
  expect(document.querySelector('.iui-menu')).toBeVisible();
  expect(onExpand).toHaveBeenCalled();

  const menuItem = document.querySelector('.iui-list-item') as HTMLElement;

  await userEvent.click(menuItem);
  expect(document.querySelector('.iui-menu')).toBeFalsy();
  expect(onCollapse).toHaveBeenCalled();
});

it('should accept ReactNode in emptyStateMessage', async () => {
  const { container } = renderComponent({
    emptyStateMessage: <div className='test-class'>Custom message</div>,
  });

  const input = assertBaseElement(container);
  await userEvent.tab();
  await userEvent.type(input, 'Invalid input');

  const emptyMessage = document.querySelector(
    '.iui-menu .test-class',
  ) as HTMLElement;
  expect(emptyMessage).toHaveTextContent('Custom message');

  // Should not wrap with MenuExtraContent
  expect(document.querySelector('.iui-menu .iui-menu-content')).toBeFalsy();
});

it('should programmatically clear value', async () => {
  const options = [0, 1, 2].map((value) => ({ value, label: `Item ${value}` }));

  const { container, rerender } = render(
    <ComboBox options={options} value={1} />,
  );

  const input = container.querySelector('.iui-input') as HTMLInputElement;
  expect(input).toHaveValue('Item 1');

  rerender(<ComboBox options={options} value={undefined} />);

  // value={undefined} = uncontrolled state. Thus, the value should not be reset
  expect(input).toHaveValue('Item 1');

  rerender(<ComboBox options={options} value={null} />);

  // value={null} = no selected value in controlled state. Thus, the value should be reset
  expect(input).toHaveValue('');
});

it('should respect controlled state', async () => {
  const mockOnChange = vi.fn();
  const options = [0, 1, 2].map((value) => ({ value, label: `Item ${value}` }));

  const { container, rerender } = render(
    <ComboBox options={options} onChange={mockOnChange} value={1} />,
  );

  await userEvent.tab();
  await userEvent.click(screen.getByText('Item 2'));
  const input = container.querySelector('.iui-input') as HTMLInputElement;
  expect(mockOnChange).toHaveBeenCalledWith(2);

  // In controlled state, passed value should take priority
  expect(input).toHaveValue('Item 1');

  rerender(
    <ComboBox options={options} onChange={mockOnChange} value={undefined} />,
  );
  expect(mockOnChange).not.toHaveBeenCalledTimes(2);

  // value={undefined} = uncontrolled state. Thus, the value should be the selected value
  expect(input).toHaveValue('Item 2');

  rerender(<ComboBox options={options} onChange={mockOnChange} value={null} />);

  // value={null} = no selected value in controlled state. Thus, no value should be selected
  expect(input).toHaveValue('');
});

it('should update options (have selected option in new options list)', async () => {
  const mockOnChange = vi.fn();
  const options = [0, 1, 2].map((value) => ({ value, label: `Item ${value}` }));

  const { container, rerender } = render(
    <ComboBox options={options} onChange={mockOnChange} />,
  );

  const input = container.querySelector('.iui-input') as HTMLInputElement;
  await userEvent.tab();
  await userEvent.click(screen.getByText('Item 2'));
  expect(mockOnChange).toHaveBeenCalledWith(2);
  expect(input).toHaveValue('Item 2');

  const options2 = [2, 3, 4, 5].map((value) => ({
    value,
    label: `Item ${value}`,
  }));

  rerender(<ComboBox options={options2} onChange={mockOnChange} value={2} />);
  fireEvent.focus(input);
  const list = document.querySelector('.iui-menu') as HTMLElement;
  expect(list).toBeVisible();
  expect(list.children).toHaveLength(4);
  expect(mockOnChange).not.toHaveBeenCalledTimes(2);
  expect(input).toHaveValue('Item 2');
});

it('should update options (does not have selected option in new options list)', async () => {
  const mockOnChange = vi.fn();
  const options = [0, 1, 2].map((value) => ({ value, label: `Item ${value}` }));

  const { container, rerender } = render(
    <ComboBox options={options} onChange={mockOnChange} />,
  );

  const input = container.querySelector('.iui-input') as HTMLInputElement;
  await userEvent.tab();
  await userEvent.click(screen.getByText('Item 2'));
  expect(mockOnChange).toHaveBeenCalledWith(2);
  expect(input).toHaveValue('Item 2');

  const options2 = [6, 7, 8].map((value) => ({
    value,
    label: `Item ${value}`,
  }));

  rerender(<ComboBox options={options2} onChange={mockOnChange} value={2} />);
  expect(input).toHaveValue('');
});

it('should clear filter when options change', async () => {
  const mockOnChange = vi.fn();
  const options = [0, 1, 2].map((value) => ({ value, label: `Item ${value}` }));

  const { container, rerender } = render(
    <ComboBox defaultValue={1} options={options} onChange={mockOnChange} />,
  );

  const input = container.querySelector('.iui-input') as HTMLInputElement;
  expect(input).toHaveValue('Item 1');

  await userEvent.tab();
  await userEvent.type(input, '{backspace}2');
  expect(input).toHaveValue('Item 2');

  const getComboBoxListItems = () =>
    container.querySelectorAll('[role="listbox"] > *');

  let menuItems = getComboBoxListItems();
  expect(menuItems.length).toBe(1);

  const options2 = [6, 7, 8].map((value) => ({
    value,
    label: `Item ${value}`,
  }));

  rerender(
    <ComboBox defaultValue={1} options={options2} onChange={mockOnChange} />,
  );
  expect(input).toHaveValue('Item 2');

  menuItems = getComboBoxListItems();
  expect(menuItems.length).toBe(3);
});

it('should select multiple options', async () => {
  const mockOnChange = vi.fn();
  const options = [0, 1, 2, 3].map((value) => ({
    value,
    label: `Item ${value}`,
  }));

  const { container } = render(
    <ComboBox options={options} onChange={mockOnChange} multiple />,
  );

  const inputContainer = container.querySelector(
    '.iui-input-grid',
  ) as HTMLDivElement;
  await userEvent.tab();
  await userEvent.click(screen.getByText('Item 1'));
  await userEvent.click(screen.getByText('Item 2'));
  await userEvent.click(screen.getByText('Item 3'));

  const tags = inputContainer.querySelectorAll('.iui-select-tag');
  expect(tags.length).toBe(3);
  expect(tags[0].querySelector('.iui-select-tag-label')).toHaveTextContent(
    'Item 1',
  );
  expect(tags[1].querySelector('.iui-select-tag-label')).toHaveTextContent(
    'Item 2',
  );
  expect(tags[2].querySelector('.iui-select-tag-label')).toHaveTextContent(
    'Item 3',
  );
});

it('should override multiple selected options', async () => {
  const mockOnChange = vi.fn();
  const options = [0, 1, 2, 3].map((value) => ({
    value,
    label: `Item ${value}`,
  }));
  const values = [0, 1];

  const { container, rerender } = render(
    <ComboBox
      options={options}
      onChange={mockOnChange}
      value={values}
      multiple
    />,
  );

  const inputContainer = container.querySelector(
    '.iui-input-grid',
  ) as HTMLDivElement;

  const tags = inputContainer.querySelectorAll('.iui-select-tag');
  expect(tags.length).toBe(2);
  expect(tags[0].querySelector('.iui-select-tag-label')).toHaveTextContent(
    'Item 0',
  );
  expect(tags[1].querySelector('.iui-select-tag-label')).toHaveTextContent(
    'Item 1',
  );

  const values2 = [1, 2, 3];

  rerender(
    <ComboBox
      options={options}
      onChange={mockOnChange}
      value={values2}
      multiple
    />,
  );
  const tags2 = inputContainer.querySelectorAll('.iui-select-tag');
  expect(tags2.length).toBe(3);
  expect(tags2[0].querySelector('.iui-select-tag-label')).toHaveTextContent(
    'Item 1',
  );
  expect(tags2[1].querySelector('.iui-select-tag-label')).toHaveTextContent(
    'Item 2',
  );
  expect(tags2[2].querySelector('.iui-select-tag-label')).toHaveTextContent(
    'Item 3',
  );
});

it('should handle keyboard navigation when multiple is enabled', async () => {
  const id = 'test-component';
  const mockOnChange = vi.fn();
  const { container } = renderComponent({
    id,
    multiple: true,
    onChange: mockOnChange,
  });

  await userEvent.tab();

  const input = assertBaseElement(container);
  expect(input).toHaveAttribute('aria-controls', `${id}-list`);

  let items = document.querySelectorAll('.iui-list-item');

  // focus index 0
  await userEvent.keyboard('{ArrowDown}');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-0`);
  items = document.querySelectorAll('.iui-list-item');
  expect(items[0]).toHaveAttribute('data-iui-focused', 'true');

  // 0 -> 2
  await userEvent.keyboard('{ArrowUp}');
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-2`);
  expect(items[2]).toHaveAttribute('data-iui-focused', 'true');

  // 2 -> 1
  await userEvent.keyboard('{ArrowUp}');
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-1`);
  expect(items[1]).toHaveAttribute('data-iui-focused', 'true');
  expect(items[2]).not.toHaveAttribute('data-iui-focused', 'true');

  // 1 -> 0
  await userEvent.keyboard('{ArrowUp}');
  items = document.querySelectorAll('.iui-list-item');
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-0`);
  expect(items[0]).toHaveAttribute('data-iui-focused', 'true');
  // select 0
  await userEvent.keyboard('{Enter}');
  items = document.querySelectorAll('.iui-list-item');
  expect(mockOnChange).toHaveBeenCalledWith([0], { type: 'added', value: 0 });
  expect(document.querySelector('.iui-menu')).toBeVisible();

  // filter and focus item 2
  await act(async () => {
    input.select();
    await userEvent.keyboard('2');
  });

  await act(async () => void (await userEvent.keyboard('{ArrowDown}')));
  expect(screen.getByText('Item 2').closest('.iui-list-item')).toHaveAttribute(
    'data-iui-focused',
    'true',
  );
  expect(input).toHaveAttribute('aria-activedescendant', `${id}-option-Item-2`);

  // select 2
  await userEvent.keyboard('{Enter}');
  expect(mockOnChange).toHaveBeenCalledWith([0, 2], {
    type: 'added',
    value: 2,
  });
  expect(document.querySelector('.iui-menu')).toBeVisible();

  // close
  await act(async () => void (await userEvent.keyboard('{Esc}')));
  expect(document.querySelector('.iui-menu')).toBeFalsy();

  // reopen
  await act(async () => void (await userEvent.keyboard('X')));
  expect(document.querySelector('.iui-menu')).toBeVisible();

  // deselect 2
  await act(async () => {
    input.select();
    await userEvent.keyboard('2');
  });

  await act(async () => void (await userEvent.keyboard('{ArrowDown}')));
  await userEvent.keyboard('{Enter}');
  expect(mockOnChange).toHaveBeenCalledWith([0], { type: 'removed', value: 2 });

  // close
  await userEvent.tab();
  expect(document.querySelector('.iui-menu')).toBeFalsy();
});

it('should not crash when provided value in not in options when multiple enabled', async () => {
  const mockOnChange = vi.fn();
  const options = [0, 1, 2].map((value) => ({ value, label: `Item ${value}` }));

  const { container } = render(
    <ComboBox options={options} onChange={mockOnChange} multiple value={[3]} />,
  );

  const input = container.querySelector('.iui-input') as HTMLInputElement;
  expect(input).toHaveValue('');
});

it('should not select disabled items', async () => {
  const id = 'test-component';
  const onChange = vi.fn();
  const { container } = renderComponent({
    id,
    onChange,
    options: [
      { label: 'An item', value: 0 },
      { label: 'A disabled item', value: 1, disabled: true },
      { label: 'Another item', value: 2 },
      { label: 'Another disabled item', value: 3, disabled: true },
    ],
  });
  const input = assertBaseElement(container);

  await userEvent.tab();
  await userEvent.click(screen.getByText('A disabled item'));
  expect(onChange).not.toHaveBeenCalled();
  expect(document.querySelector('.iui-menu')).toBeVisible();
  expect(input).toHaveValue('');
  expect(input).toHaveFocus();

  // focus first disabled item, then press Enter
  const disabled1Id = `${id}-option-A-disabled-item`;
  await userEvent.keyboard('{ArrowDown}');
  await userEvent.keyboard('{ArrowDown}');
  expect(input).toHaveAttribute('aria-activedescendant', disabled1Id);
  expect(document.querySelector(`#${disabled1Id}`)).toHaveAttribute(
    'data-iui-focused',
    'true',
  );
  await userEvent.keyboard('{Enter}');
  expect(onChange).not.toHaveBeenCalled();
  expect(document.querySelector('.iui-menu')).toBeVisible();
  expect(input).toHaveValue('');

  // filter the list, then try selecting another disabled item with mouse
  await userEvent.keyboard('An');
  await userEvent.click(screen.getByText('Another disabled item'));
  expect(onChange).not.toHaveBeenCalled();
  expect(document.querySelector('.iui-menu')).toBeVisible();
  expect(input).toHaveValue('An');

  // and with keyboard
  const disabled2Id = `${id}-option-Another-disabled-item`;
  await userEvent.keyboard('{ArrowDown}');
  await userEvent.keyboard('{ArrowDown}');
  await userEvent.keyboard('{ArrowDown}');
  expect(document.querySelector(`#${disabled2Id}`)).toHaveAttribute(
    'data-iui-focused',
    'true',
  );
  expect(input).toHaveAttribute('aria-activedescendant', disabled2Id);
  await userEvent.keyboard('{Enter}');
  expect(onChange).not.toHaveBeenCalled();
  expect(document.querySelector('.iui-menu')).toBeVisible();
  expect(input).toHaveValue('An');
});

it('should update live region when selection changes', async () => {
  const { container } = render(
    <ComboBox
      options={[0, 1, 2].map((value) => ({ value, label: `Item ${value}` }))}
      multiple
      defaultValue={[0]}
    />,
  );

  const liveRegion = container.querySelector('[aria-live="polite"]');
  expect(liveRegion).toHaveTextContent('');

  await userEvent.tab();
  const options = document.querySelectorAll('[role="option"]');

  await userEvent.click(options[1]);
  await userEvent.click(options[2]);
  expect(liveRegion).toHaveTextContent('Item 0, Item 1, Item 2');

  await userEvent.click(options[0]);
  expect(liveRegion).toHaveTextContent('Item 1, Item 2');
});

it('should be customizable', async () => {
  const { container, getByText } = render(
    <ComboBox
      options={[0, 1, 2].map((value) => ({ value, label: `Item ${value}` }))}
      message={
        <StatusMessage contentProps={{ className: 'custom-message-class' }}>
          My message
        </StatusMessage>
      }
      status='negative'
      className='my-input-wrapper'
      inputProps={{ id: 'my-input-id' }}
      dropdownMenuProps={{
        className: 'my-menu-class',
      }}
      endIconProps={{ className: 'my-end-icon' }}
    />,
  );

  const endIcon = container.querySelector(
    '.iui-svg-icon.iui-end-icon.my-end-icon',
  );
  expect(endIcon).toBeTruthy();
  expect(container.querySelector('input#my-input-id')).toBeTruthy();
  expect(
    container.querySelector('.iui-input-grid.my-input-wrapper'),
  ).toBeTruthy();

  fireEvent.focus(container.querySelector('input') as HTMLElement);
  const list = document.querySelector('.iui-menu') as HTMLElement;
  expect(list).toHaveClass('my-menu-class');

  const statusContent = getByText('My message');
  expect(statusContent).toHaveClass('custom-message-class');
});

it('should allow passing ref to ComboBox', () => {
  const comboboxRef = React.createRef<HTMLElement>();
  const inputRef = React.createRef<HTMLInputElement>();
  render(
    <ComboBox
      options={[{ label: 'Item 1', value: 1 }]}
      ref={comboboxRef}
      id='test-combobox'
      inputProps={{ ref: inputRef, id: `test-input` }}
    />,
  );
  expect(comboboxRef?.current).toHaveAttribute('id', 'test-combobox');
  expect(inputRef?.current).toHaveAttribute('id', 'test-input');
});

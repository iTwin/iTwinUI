/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { findAllByRole, fireEvent, render } from '@testing-library/react';
import {
  Select,
  type CustomSelectProps,
  type SelectMultipleTypeProps,
} from './Select.js';
import { SvgSmileyHappy } from '../../utils/index.js';
import { MenuItem } from '../Menu/MenuItem.js';
import { userEvent } from '@testing-library/user-event';

function assertSelect(
  select: HTMLElement,
  { text = '', isPlaceholderVisible = false, hasIcon = false } = {},
) {
  expect(select).toBeTruthy();
  const selectButton = select.querySelector('[role=combobox]') as HTMLElement;
  expect(selectButton).toBeTruthy();
  expect(selectButton).toHaveAttribute('aria-expanded', 'false');
  expect(selectButton.classList.contains('iui-placeholder')).toBe(
    isPlaceholderVisible,
  );
  expect(selectButton.textContent).toEqual(text);
  expect(!!selectButton.querySelector('.iui-icon')).toBe(hasIcon);
}

function assertMenu(
  menu: HTMLElement,
  { hasIcon = false, selectedIndex = -1, disabledIndex = -1 } = {},
) {
  expect(menu).toBeTruthy();
  expect(menu.getAttribute('role')).toEqual('listbox');
  const menuItems = menu.querySelectorAll('.iui-list-item');
  expect(menuItems.length).toBe(3);
  menuItems.forEach((item, index) => {
    expect(item.textContent).toContain(`Test${index}`);
    expect(!!item.querySelector('.iui-list-item-icon')).toBe(
      hasIcon || selectedIndex === index,
    );
    expect(item.hasAttribute('data-iui-active')).toBe(selectedIndex === index);
    expect(item.hasAttribute('data-iui-disabled')).toBe(
      disabledIndex === index,
    );
  });
}

function renderComponent(
  props?: Partial<CustomSelectProps<number>> & SelectMultipleTypeProps<number>,
) {
  return render(
    <Select<number>
      options={[...new Array(3)].map((_, index) => ({
        label: `Test${index}`,
        value: index,
      }))}
      {...props}
    />,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

it('should render empty select', () => {
  const { container } = renderComponent();

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  assertSelect(select);
});

it('should show placeholder', () => {
  const { container } = renderComponent({ placeholder: 'TestPlaceholder' });

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  assertSelect(select, { text: 'TestPlaceholder', isPlaceholderVisible: true });
});

it('should respect styleType={"borderless"}', () => {
  const { container } = render(
    <Select
      native
      options={[
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
      ]}
      styleType='borderless'
    />,
  );

  const selectButton = container.querySelector(
    '.iui-select-button',
  ) as HTMLElement;

  expect(selectButton).toHaveAttribute('data-iui-variant', 'borderless');
});

it('should show value inside select', () => {
  const { container } = renderComponent({
    placeholder: 'TestPlaceholder',
    value: 1,
  });

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  assertSelect(select, { text: 'Test1' });
});

it('should show value with icon inside select', () => {
  const { container } = renderComponent({
    value: 1,
    options: [...new Array(3)].map((_, index) => ({
      label: `Test${index}`,
      value: index,
      startIcon: <SvgSmileyHappy />,
    })),
  });

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  assertSelect(select, { text: 'Test1', hasIcon: true });
});

it('should render disabled select', async () => {
  const mockedFn = vi.fn();
  const { container } = renderComponent({
    disabled: true,
    onChange: mockedFn,
  });

  const selectButton = container.querySelector(
    '.iui-select-button[data-iui-disabled=true]',
  ) as HTMLElement;
  expect(selectButton).toBeTruthy();
  expect(selectButton).toHaveAttribute('aria-disabled', 'true');
  expect(selectButton.getAttribute('tabIndex')).toBe('0');
  await userEvent.click(selectButton);
  expect(mockedFn).not.toHaveBeenCalled();
  fireEvent.keyDown(selectButton, 'Spacebar');
  expect(document.querySelector('.iui-menu')).toBeNull();
});

it('should set focus on select and call onBlur', () => {
  const onBlur = vi.fn();
  const { container } = renderComponent({ onBlur });

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  assertSelect(select);
  const selectButton = container.querySelector(
    '.iui-select-button',
  ) as HTMLElement;
  selectButton.focus();
  expect(selectButton).toBeTruthy();
  expect(selectButton.getAttribute('tabIndex')).toBe('0');
  expect(selectButton).toHaveFocus();
  expect(onBlur).not.toHaveBeenCalled();

  fireEvent.click(selectButton);
  vi.runAllTimers();
  expect(selectButton).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

it('should render select with custom className', () => {
  const { container } = renderComponent({ className: 'test-className' });

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  assertSelect(select);
  expect(select.classList).toContain('test-className');
});

it('should render select with custom style', () => {
  const { container } = renderComponent({ style: { color: 'red' } });

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  assertSelect(select);
  expect(select.style.color).toEqual('red');
});

it('should use custom render for selected item', () => {
  const { container } = render(
    <Select
      value='red'
      selectedItemRenderer={(option) => (
        <span style={{ color: option?.value }}>{option?.label}</span>
      )}
      options={[
        { value: 'yellow', label: 'Yellow' },
        { value: 'green', label: 'Green' },
        { value: 'red', label: 'Red' },
      ]}
    />,
  );

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  assertSelect(select, { text: 'Red' });
  const selectedValue = select.querySelector(
    '.iui-select-button > span',
  ) as HTMLElement;
  expect(selectedValue).toBeTruthy();
  expect(selectedValue.style.color).toEqual('red');
});

it('should open menu on click', () => {
  const { container } = renderComponent();

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  expect(select).toBeTruthy();
  let menu = document.querySelector('.iui-menu') as HTMLElement;
  expect(menu).toBeFalsy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  menu = document.querySelector('.iui-menu') as HTMLElement;
  assertMenu(menu);
});

it('should respect visible prop', () => {
  const options = [...new Array(3)].map((_, index) => ({
    label: `Test${index}`,
    value: index,
  }));

  const { container, rerender } = render(
    <Select options={options} popoverProps={{ visible: true }} />,
  );

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  expect(select).toBeTruthy();

  const menu = document.querySelector('.iui-menu') as HTMLElement;
  expect(menu).toBeVisible();
  assertMenu(menu);

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  expect(menu).toBeVisible();

  rerender(<Select options={options} popoverProps={{ visible: false }} />);
  expect(menu).not.toBeVisible();
});

it.each(['{Enter}', ' ', '{Spacebar}'])(
  'should open menu on "%s" key press',
  async (key) => {
    const { container } = renderComponent();

    const select = container.querySelector(
      '.iui-input-with-icon',
    ) as HTMLElement;
    expect(select).toBeTruthy();
    let menu = document.querySelector('.iui-menu') as HTMLElement;
    expect(menu).toBeFalsy();

    await userEvent.tab();
    await userEvent.keyboard(key);
    menu = document.querySelector('.iui-menu') as HTMLElement;
    assertMenu(menu);
  },
);

it('should show menu items with icons', () => {
  const { container } = renderComponent({
    options: [...new Array(3)].map((_, index) => ({
      label: `Test${index}`,
      value: index,
      startIcon: <SvgSmileyHappy />,
    })),
  });

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  expect(select).toBeTruthy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  const menu = document.querySelector('.iui-menu') as HTMLElement;
  assertMenu(menu, { hasIcon: true });
});

it('should show menu with disabled item', () => {
  const { container } = renderComponent({
    options: [...new Array(3)].map((_, index) => ({
      label: `Test${index}`,
      value: index,
      disabled: index === 1,
    })),
  });

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  expect(select).toBeTruthy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  const menu = document.querySelector('.iui-menu') as HTMLElement;
  assertMenu(menu, { disabledIndex: 1 });
});

it('should show selected item in menu', () => {
  const scrollSpy = vi.spyOn(window.HTMLElement.prototype, 'scrollIntoView');
  const { container } = renderComponent({
    value: 1,
    options: [...new Array(3)].map((_, index) => ({
      label: `Test${index}`,
      value: index,
    })),
  });

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  expect(select).toBeTruthy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  const menu = document.querySelector('.iui-menu') as HTMLElement;
  assertMenu(menu, { selectedIndex: 1 });
  expect(scrollSpy).toHaveBeenCalled();
});

it('should call onChange on item click', () => {
  const onChange = vi.fn();
  const { container } = renderComponent({
    onChange,
  });

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  expect(select).toBeTruthy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  const menu = document.querySelector('.iui-menu') as HTMLElement;
  assertMenu(menu);

  const menuItem = menu.querySelectorAll('[role=option]');
  expect(menuItem.length).toBe(3);
  fireEvent.click(menuItem[1]);
  expect(onChange).toHaveBeenCalledWith(1);
});

it('should render menu with custom className', () => {
  const { container } = renderComponent({ menuClassName: 'test-className' });

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  expect(select).toBeTruthy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  const menu = document.querySelector('.iui-menu') as HTMLElement;
  assertMenu(menu);
  expect(menu.classList).toContain('test-className');
});

it('should render menu with custom style', async () => {
  const { container } = renderComponent({ menuStyle: { color: 'red' } });

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  expect(select).toBeTruthy();

  await userEvent.click(
    select.querySelector('.iui-select-button') as HTMLElement,
  );
  const menu = document.querySelector('.iui-menu') as HTMLElement;
  assertMenu(menu);
  expect(menu.style.color).toEqual('red');
});

it('should use custom renderer for menu items', () => {
  const { container } = render(
    <Select
      itemRenderer={(option) => (
        <MenuItem style={{ color: option.value }}>{option.label}</MenuItem>
      )}
      options={[
        { value: 'yellow', label: 'Yellow' },
        { value: 'green', label: 'Green' },
        { value: 'red', label: 'Red' },
      ]}
    />,
  );

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  expect(select).toBeTruthy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  const menu = document.querySelector('.iui-menu') as HTMLElement;
  expect(menu).toBeTruthy();
  const menuItems = menu.querySelectorAll<HTMLElement>('[role=option]');
  expect(menuItems.length).toBe(3);

  expect(menuItems[0].textContent).toEqual('Yellow');
  expect(menuItems[1].textContent).toEqual('Green');
  expect(menuItems[2].textContent).toEqual('Red');

  expect(menuItems[0].style.color).toEqual('yellow');
  expect(menuItems[1].style.color).toEqual('green');
  expect(menuItems[2].style.color).toEqual('red');
});

it.each(['small', 'large'] as const)(
  'should render small and large sizes',
  (size) => {
    const { container } = renderComponent({ size });
    expect(container.querySelector(`.iui-select-button`)).toHaveAttribute(
      'data-iui-size',
      size,
    );
  },
);

it('should render large SelectOption', async () => {
  const { container } = renderComponent({
    options: [...new Array(3)].map((_, index) => ({
      label: `Test${index}`,
      size: 'large',
      value: index,
    })),
  });

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  expect(select).toBeTruthy();

  await userEvent.click(
    select.querySelector('.iui-select-button') as HTMLElement,
  );

  const menuItems = document.querySelectorAll(
    `.iui-list-item[data-iui-size='large']`,
  );
  expect(menuItems.length).toEqual(3);
});

it('should render sublabel', () => {
  const { container } = renderComponent({
    options: [...new Array(3)].map((_, index) => ({
      label: `Test${index}`,
      sublabel: `Sublabel ${index}`,
      value: index,
    })),
  });

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  expect(select).toBeTruthy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);

  const menuItems = document.querySelectorAll(
    `.iui-list-item[data-iui-size='large']`,
  );
  expect(menuItems.length).toEqual(3);

  menuItems.forEach((menuItem, index) => {
    const sublabel = menuItem.querySelector(
      '.iui-list-item-content .iui-list-item-description',
    ) as HTMLElement;
    expect(sublabel).toBeTruthy();
    expect(sublabel.textContent).toEqual(`Sublabel ${index}`);
  });
});

it('should pass custom props to menu item', () => {
  const { container } = renderComponent({
    options: [
      {
        label: `Test`,
        value: 1,
        className: 'test-class',
        'data-value': 'Test one',
      },
    ],
  });

  fireEvent.click(container.querySelector('.iui-select-button') as HTMLElement);
  const menuItem = document.querySelector(
    '.iui-list-item.test-class',
  ) as HTMLElement;
  expect(menuItem.getAttribute('data-value')).toBe('Test one');
});

it('should select multiple items', () => {
  const onChange = vi.fn();
  const { container, rerender } = renderComponent({
    onChange,
    multiple: true,
  });

  const select = container.querySelector('.iui-input-with-icon') as HTMLElement;
  expect(select).toBeTruthy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  const menu = document.querySelector('.iui-menu') as HTMLElement;
  assertMenu(menu);

  let menuItems = menu.querySelectorAll('.iui-list-item');
  expect(menuItems.length).toBe(3);
  fireEvent.click(menuItems[1]);
  expect(onChange).toHaveBeenCalledWith(1, 'added');
  fireEvent.click(menuItems[2]);
  expect(onChange).toHaveBeenCalledWith(2, 'added');

  rerender(
    <Select<number>
      options={[...new Array(3)].map((_, index) => ({
        label: `Test${index}`,
        value: index,
      }))}
      value={[1, 2]}
      multiple
      onChange={onChange}
    />,
  );
  menuItems = menu.querySelectorAll('.iui-list-item');
  expect(menuItems[1]).toHaveAttribute('data-iui-active', 'true');
  expect(menuItems[2]).toHaveAttribute('data-iui-active', 'true');

  const tagContainer = select.querySelector('.iui-select-tag-container');
  expect(tagContainer?.childNodes.length).toBe(2);
  fireEvent.click(menuItems[2]);
  expect(onChange).toHaveBeenCalledWith(2, 'removed');
});

it('should use custom render for selected item (multiple)', async () => {
  const { container } = render(
    <Select
      value={['green', 'red']}
      selectedItemRenderer={(options) => (
        <>
          {options.map((option) => (
            <span key={option.label} style={{ color: option?.value }}>
              {option.label}
            </span>
          ))}
        </>
      )}
      options={[
        { value: 'yellow', label: 'Yellow' },
        { value: 'green', label: 'Green' },
        { value: 'red', label: 'Red' },
      ]}
      multiple
    />,
  );

  const selectedValues = container.querySelectorAll(
    '.iui-select-button > span',
  );
  expect(selectedValues.length).toBe(2);
  expect((selectedValues[0] as HTMLElement).style.color).toEqual('green');
  expect((selectedValues[1] as HTMLElement).style.color).toEqual('red');
});

it('should update live region when selection changes', async () => {
  const MultiSelectTest = () => {
    const [selected, setSelected] = React.useState([0]);
    return (
      <Select
        options={[0, 1, 2].map((value) => ({
          value,
          label: `Item ${value}`,
        }))}
        popoverProps={{ visible: true }}
        multiple
        value={selected}
        onChange={(value, type) =>
          setSelected((prev) =>
            type === 'added'
              ? [...prev, value]
              : prev.filter((v) => v !== value),
          )
        }
      />
    );
  };
  const { container } = render(<MultiSelectTest />);

  const liveRegion = container.querySelector('[aria-live="polite"]');
  expect(liveRegion).toHaveTextContent('');
  const options = document.querySelectorAll('[role="option"]');

  await userEvent.click(options[1]);
  expect(liveRegion).toHaveTextContent('Item 0, Item 1');

  await userEvent.click(options[2]);
  expect(liveRegion).toHaveTextContent('Item 0, Item 1, Item 2');

  await userEvent.click(options[0]);
  expect(liveRegion).toHaveTextContent('Item 1, Item 2');
});

it('should allow passing ref to Select', () => {
  const selectRef = React.createRef<HTMLElement>();
  render(
    <Select
      options={[{ value: 1, label: 'Option 1' }]}
      ref={selectRef}
      data-select
    />,
  );

  expect(selectRef?.current).toHaveAttribute('data-select');
});

it('should reset value when null is passed', () => {
  const { container, rerender } = render(
    <Select value='A' options={[{ value: 'A', label: 'A' }]} />,
  );
  expect(container.querySelector('[role=combobox]')).toHaveTextContent('A');

  rerender(<Select value={null} options={[{ value: 'A', label: 'A' }]} />);
  expect(container.querySelector('[role=combobox]')).toHaveTextContent('');
});

it('should support native select (uncontrolled)', async () => {
  const onChangeFn = vi.fn();

  const { container } = render(
    <Select
      native
      options={[
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B', disabled: true },
      ]}
      className='my-wrapper'
      placeholder='Select an option'
      triggerProps={{ className: 'my-select' }}
      required
      onChange={onChangeFn}
      size='small'
      status='positive'
    />,
  );

  const wrapper = container.querySelector('.my-wrapper') as HTMLElement;
  const select = wrapper.querySelector('select') as HTMLSelectElement;
  expect(select).toHaveClass('my-select');
  expect(select).toHaveValue('');
  expect(select).toBeRequired();
  expect(select).toHaveAttribute('data-iui-size', 'small');
  expect(select).toHaveAttribute('data-iui-status', 'positive');

  const options = select.querySelectorAll('option');
  expect(options.length).toBe(3);
  expect(options[0]).toHaveTextContent('Select an option');
  expect(options[0]).toHaveAttribute('disabled');
  expect(options[1]).toHaveTextContent('A');
  expect(options[2]).toHaveTextContent('B');
  expect(options[2]).toHaveAttribute('disabled');

  await userEvent.selectOptions(select, 'A');
  expect(select).toHaveValue('A');
  expect(onChangeFn).toHaveBeenCalledWith('A', expect.objectContaining({}));
});

it('should support native select (controlled)', async () => {
  const { container, rerender } = render(
    <Select
      native
      options={[{ value: 'A', label: 'A' }]}
      placeholder='Select an option'
      defaultValue='A'
    />,
  );

  const select = container.querySelector('select') as HTMLSelectElement;
  expect(select).toHaveValue('A');

  rerender(
    <Select
      native
      options={[{ value: 'A', label: 'A' }]}
      placeholder='Select an option'
      defaultValue='A'
      value={null}
    />,
  );
  expect(select).toHaveValue('');

  rerender(
    <Select
      native
      options={[
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
      ]}
      placeholder='Select an option'
      value='B'
    />,
  );
  expect(select).toHaveValue('B');
});

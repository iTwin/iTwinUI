/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Select, { SelectProps } from './Select';
import SvgSmileyHappy from '@itwin/itwinui-icons-react/cjs/icons/SmileyHappy';
import { MenuItem } from '../Menu';

function assertSelect(
  select: HTMLElement,
  { text = '', isPlaceholderVisible = false, hasIcon = false } = {},
) {
  expect(select).toBeTruthy();
  expect(select.getAttribute('aria-expanded')).toEqual('false');
  const selectButton = select.querySelector(
    '.iui-select-button',
  ) as HTMLElement;
  expect(selectButton).toBeTruthy();
  expect(selectButton.classList.contains('iui-placeholder')).toBe(
    isPlaceholderVisible,
  );
  expect(selectButton.textContent).toEqual(text);
  expect(!!selectButton.querySelector('.iui-icon')).toBe(hasIcon);
}

function assertMenu(
  menu: HTMLUListElement,
  {
    maxHeight = '300px',
    hasIcon = false,
    selectedIndex = -1,
    disabledIndex = -1,
  } = {},
) {
  expect(menu).toBeTruthy();
  expect(menu.getAttribute('role')).toEqual('listbox');
  expect(menu.style.maxHeight).toEqual(maxHeight);
  expect(menu.classList).toContain('iui-scroll');
  const menuItems = menu.querySelectorAll('.iui-menu-item');
  expect(menuItems.length).toBe(3);
  menuItems.forEach((item, index) => {
    expect(item.textContent).toContain(`Test${index}`);
    expect(!!item.querySelector('.iui-icon')).toBe(hasIcon);
    expect(item.classList.contains('iui-active')).toBe(selectedIndex === index);
    expect(item.classList.contains('iui-disabled')).toBe(
      disabledIndex === index,
    );
  });
}

function renderComponent(props?: Partial<SelectProps<number>>) {
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
  jest.clearAllMocks();
});

it('should render empty select', () => {
  const { container } = renderComponent();

  const select = container.querySelector('.iui-select') as HTMLElement;
  assertSelect(select);
});

it('should show placeholder', () => {
  const { container } = renderComponent({ placeholder: 'TestPlaceholder' });

  const select = container.querySelector('.iui-select') as HTMLElement;
  assertSelect(select, { text: 'TestPlaceholder', isPlaceholderVisible: true });
});

it('should show value inside select', () => {
  const { container } = renderComponent({
    placeholder: 'TestPlaceholder',
    value: 1,
  });

  const select = container.querySelector('.iui-select') as HTMLElement;
  assertSelect(select, { text: 'Test1' });
});

it('should show value with icon inside select', () => {
  const { container } = renderComponent({
    value: 1,
    options: [...new Array(3)].map((_, index) => ({
      label: `Test${index}`,
      value: index,
      icon: <SvgSmileyHappy />,
    })),
  });

  const select = container.querySelector('.iui-select') as HTMLElement;
  assertSelect(select, { text: 'Test1', hasIcon: true });
});

it('should render disabled select', () => {
  const mockedFn = jest.fn();
  const { container } = renderComponent({
    disabled: true,
    onChange: mockedFn,
  });

  const selectButton = container.querySelector(
    '.iui-select-button.iui-disabled',
  ) as HTMLElement;
  expect(selectButton).toBeTruthy();
  selectButton.click();
  expect(mockedFn).not.toHaveBeenCalled();
  expect(selectButton.getAttribute('tabIndex')).toBeNull();
  fireEvent.keyDown(selectButton, 'Spacebar');
  expect(document.querySelector('.iui-menu')).toBeNull();
});

it('should set focus on select', () => {
  const { container } = renderComponent({ setFocus: true });

  const select = container.querySelector('.iui-select') as HTMLElement;
  assertSelect(select);
  const selectButton = container.querySelector(
    '.iui-select-button',
  ) as HTMLElement;
  expect(selectButton).toBeTruthy();
  expect(document.activeElement).toEqual(selectButton);
  expect(selectButton.getAttribute('tabIndex')).toBe('0');
});

it('should render select with custom className', () => {
  const { container } = renderComponent({ className: 'test-className' });

  const select = container.querySelector('.iui-select') as HTMLElement;
  assertSelect(select);
  expect(select.classList).toContain('test-className');
});

it('should render select with custom style', () => {
  const { container } = renderComponent({ style: { color: 'red' } });

  const select = container.querySelector('.iui-select') as HTMLElement;
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

  const select = container.querySelector('.iui-select') as HTMLElement;
  assertSelect(select, { text: 'Red' });
  const selectedValue = select.querySelector(
    '.iui-select-button > span',
  ) as HTMLElement;
  expect(selectedValue).toBeTruthy();
  expect(selectedValue.style.color).toEqual('red');
});

it('should open menu on click', () => {
  const { container } = renderComponent();

  const select = container.querySelector('.iui-select') as HTMLElement;
  expect(select).toBeTruthy();
  let menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeFalsy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  menu = document.querySelector('.iui-menu') as HTMLUListElement;
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

  const select = container.querySelector('.iui-select') as HTMLElement;
  expect(select).toBeTruthy();

  const tippy = document.querySelector('[data-tippy-root]') as HTMLElement;
  expect(tippy.style.visibility).toEqual('visible');
  assertMenu(document.querySelector('.iui-menu') as HTMLUListElement);

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  expect(tippy.style.visibility).toEqual('hidden');

  rerender(<Select options={options} popoverProps={{ visible: true }} />);
  expect(tippy.style.visibility).toEqual('visible');
});

it.each(['Enter', ' ', 'Spacebar'])(
  'should open menu on "%s" key press',
  (key) => {
    const { container } = renderComponent();

    const select = container.querySelector('.iui-select') as HTMLElement;
    expect(select).toBeTruthy();
    let menu = document.querySelector('.iui-menu') as HTMLUListElement;
    expect(menu).toBeFalsy();

    fireEvent.keyDown(
      select.querySelector('.iui-select-button') as HTMLElement,
      {
        key,
      },
    );
    menu = document.querySelector('.iui-menu') as HTMLUListElement;
    assertMenu(menu);
  },
);

it('should show menu items with icons', () => {
  const { container } = renderComponent({
    options: [...new Array(3)].map((_, index) => ({
      label: `Test${index}`,
      value: index,
      icon: <SvgSmileyHappy />,
    })),
  });

  const select = container.querySelector('.iui-select') as HTMLElement;
  expect(select).toBeTruthy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  const menu = document.querySelector('.iui-menu') as HTMLUListElement;
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

  const select = container.querySelector('.iui-select') as HTMLElement;
  expect(select).toBeTruthy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  const menu = document.querySelector('.iui-menu') as HTMLUListElement;
  assertMenu(menu, { disabledIndex: 1 });
});

it('should show selected item in menu', () => {
  const scrollSpy = spyOn(window.HTMLElement.prototype, 'scrollIntoView');
  const { container } = renderComponent({
    value: 1,
    options: [...new Array(3)].map((_, index) => ({
      label: `Test${index}`,
      value: index,
    })),
  });

  const select = container.querySelector('.iui-select') as HTMLElement;
  expect(select).toBeTruthy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  const menu = document.querySelector('.iui-menu') as HTMLUListElement;
  assertMenu(menu, { selectedIndex: 1 });
  expect(scrollSpy).toHaveBeenCalledTimes(1);
});

it('should call onChange on item click', () => {
  const onChange = jest.fn();
  const { container } = renderComponent({
    onChange,
  });

  const select = container.querySelector('.iui-select') as HTMLElement;
  expect(select).toBeTruthy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  const menu = document.querySelector('.iui-menu') as HTMLUListElement;
  assertMenu(menu);

  const menuItem = menu.querySelectorAll('li');
  expect(menuItem.length).toBe(3);
  fireEvent.click(menuItem[1]);
  expect(onChange).toHaveBeenCalledWith(1);
});

it('should render menu with custom className', () => {
  const { container } = renderComponent({ menuClassName: 'test-className' });

  const select = container.querySelector('.iui-select') as HTMLElement;
  expect(select).toBeTruthy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  const menu = document.querySelector('.iui-menu') as HTMLUListElement;
  assertMenu(menu);
  expect(menu.classList).toContain('test-className');
});

it('should render menu with custom style', () => {
  const { container } = renderComponent({ menuStyle: { color: 'red' } });

  const select = container.querySelector('.iui-select') as HTMLElement;
  expect(select).toBeTruthy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  const menu = document.querySelector('.iui-menu') as HTMLUListElement;
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

  const select = container.querySelector('.iui-select') as HTMLElement;
  expect(select).toBeTruthy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);
  const menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeTruthy();
  const menuItems = menu.querySelectorAll('li');
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
    expect(container.querySelector(`.iui-select.iui-${size}`)).toBeTruthy();
  },
);

it('should render large SelectOption', () => {
  const { container } = renderComponent({
    options: [...new Array(3)].map((_, index) => ({
      label: `Test${index}`,
      size: 'large',
      value: index,
    })),
  });

  const select = container.querySelector('.iui-select') as HTMLElement;
  expect(select).toBeTruthy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);

  const menuItems = select.querySelectorAll('.iui-menu-item.iui-large');
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

  const select = container.querySelector('.iui-select') as HTMLElement;
  expect(select).toBeTruthy();

  fireEvent.click(select.querySelector('.iui-select-button') as HTMLElement);

  const menuItems = select.querySelectorAll('.iui-menu-item.iui-large');
  expect(menuItems.length).toEqual(3);

  menuItems.forEach((menuItem, index) => {
    const sublabel = menuItem.querySelector(
      '.iui-content .iui-menu-description',
    ) as HTMLElement;
    expect(sublabel).toBeTruthy();
    expect(sublabel.textContent).toEqual(`Sublabel ${index}`);
  });
});

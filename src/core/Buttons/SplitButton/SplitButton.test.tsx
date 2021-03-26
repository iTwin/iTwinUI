// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import { render } from '@testing-library/react';

import { SplitButton, SplitButtonProps } from './SplitButton';
import { MenuItem } from '../../Menu';
import SvgCaretDown2 from '@bentley/icons-generic-react/cjs/icons/CaretDown2';
import SvgCaretUp2 from '@bentley/icons-generic-react/cjs/icons/CaretUp2';

function renderComponent(
  onClick?: () => void,
  ...props: Partial<SplitButtonProps>[]
) {
  return render(
    <SplitButton
      onClick={onClick ?? jest.fn()}
      menuItems={(close) => [
        <MenuItem key={0} onClick={close}>
          Test0
        </MenuItem>,
        <MenuItem key={1} onClick={close}>
          Test1
        </MenuItem>,
        <MenuItem key={2} onClick={close}>
          Test2
        </MenuItem>,
      ]}
      {...props}
    >
      child
    </SplitButton>,
  );
}

it('should render in its most basic state', () => {
  const { container } = renderComponent();
  expect(container.querySelector('.iui-buttons-group')).toBeTruthy();
  expect(container.querySelector('.iui-buttons-icon')).toBeTruthy();
});

it('should fire onClick callback', () => {
  const onClickMock = jest.fn();
  const { container } = renderComponent(onClickMock);
  expect(container.querySelector('.iui-buttons-group')).toBeTruthy();

  const button = container.querySelector(
    '.iui-buttons-default',
  ) as HTMLButtonElement;
  button.click();
  expect(onClickMock).toHaveBeenCalledTimes(1);

  const dropdownButton = container.querySelector(
    '.iui-buttons-split',
  ) as HTMLButtonElement;
  dropdownButton.click();
  expect(onClickMock).toHaveBeenCalledTimes(1);
});

it('should update icon when menu opens or closes', () => {
  const { container } = renderComponent();
  expect(container.querySelector('.iui-buttons-group')).toBeTruthy();
  expect(container.querySelector('.iui-buttons-default')).toBeTruthy();

  const dropdownButton = container.querySelector(
    '.iui-buttons-split',
  ) as HTMLButtonElement;
  expect(dropdownButton).toBeTruthy();

  const {
    container: { firstChild: downArrow },
  } = render(<SvgCaretDown2 className='iui-buttons-icon' />);
  expect(container.querySelector('.iui-buttons-icon')).toEqual(downArrow);

  dropdownButton.click();
  const {
    container: { firstChild: upArrow },
  } = render(<SvgCaretUp2 className='iui-buttons-icon' />);
  expect(container.querySelector('.iui-buttons-icon')).toEqual(upArrow);

  dropdownButton.click();
  expect(container.querySelector('.iui-buttons-icon')).toEqual(downArrow);
});

it('should work with menu items', () => {
  const { container } = renderComponent();
  expect(container.querySelector('.iui-buttons-group')).toBeTruthy();

  let menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeFalsy();

  const dropdownButton = container.querySelector(
    '.iui-buttons-split',
  ) as HTMLButtonElement;
  dropdownButton.click();

  menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeTruthy();

  expect(document.querySelectorAll('li')).toHaveLength(3);

  const menuItem = menu.querySelector('li') as HTMLLIElement;
  expect(menuItem).toBeTruthy();
  menuItem.click();

  menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeFalsy();
});

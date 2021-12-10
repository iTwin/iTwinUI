/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { SplitButton, SplitButtonProps } from './SplitButton';
import { MenuItem } from '../../Menu';
import SvgCaretDownSmall from '@itwin/itwinui-icons-react/cjs/icons/CaretDownSmall';
import SvgCaretUpSmall from '@itwin/itwinui-icons-react/cjs/icons/CaretUpSmall';

function renderComponent(
  onClick?: () => void,
  props?: Partial<SplitButtonProps>,
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
  expect(container.querySelector('.iui-button-split-menu')).toBeTruthy();
  expect(container.querySelector('.iui-button-icon')).toBeTruthy();
});

it('should fire onClick callback', () => {
  const onClickMock = jest.fn();
  const { container } = renderComponent(onClickMock);
  expect(container.querySelector('.iui-button-split-menu')).toBeTruthy();

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  button.click();
  expect(onClickMock).toHaveBeenCalledTimes(1);

  const dropdownButton = container.querySelectorAll(
    '.iui-button',
  )[1] as HTMLButtonElement;
  dropdownButton.click();
  expect(onClickMock).toHaveBeenCalledTimes(1);
});

it('should update icon when menu opens or closes', () => {
  const { container } = renderComponent();
  expect(container.querySelector('.iui-button-split-menu')).toBeTruthy();
  expect(container.querySelector('.iui-button')).toBeTruthy();

  const dropdownButton = container.querySelectorAll(
    '.iui-button',
  )[1] as HTMLButtonElement;
  expect(dropdownButton).toBeTruthy();

  const {
    container: { firstChild: downArrow },
  } = render(<SvgCaretDownSmall className='iui-button-icon' aria-hidden />);
  expect(container.querySelector('.iui-button-icon')).toEqual(downArrow);

  dropdownButton.click();
  const {
    container: { firstChild: upArrow },
  } = render(<SvgCaretUpSmall className='iui-button-icon' aria-hidden />);
  expect(container.querySelector('.iui-button-icon')).toEqual(upArrow);

  dropdownButton.click();
  expect(container.querySelector('.iui-button-icon')).toEqual(downArrow);
});

it('should work with menu items', () => {
  const { container } = renderComponent();
  expect(container.querySelector('.iui-button-split-menu')).toBeTruthy();

  let menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeFalsy();

  const dropdownButton = container.querySelectorAll(
    '.iui-button',
  )[1] as HTMLButtonElement;
  dropdownButton.click();

  menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeTruthy();

  expect(document.querySelectorAll('li')).toHaveLength(3);

  const menuItem = menu.querySelector('li') as HTMLLIElement;
  expect(menuItem).toBeTruthy();
  menuItem.click();

  const tippy = document.querySelector('[data-tippy-root]') as HTMLElement;
  expect(tippy.style.visibility).toEqual('hidden');
});

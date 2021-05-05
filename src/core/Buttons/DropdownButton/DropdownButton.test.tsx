/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { DropdownButton, DropdownButtonProps } from './DropdownButton';
import { MenuItem } from '../../Menu';
import SvgCaretDownSmall from '@itwin/itwinui-icons-react/cjs/icons/CaretDownSmall';
import SvgCaretUpSmall from '@itwin/itwinui-icons-react/cjs/icons/CaretUpSmall';

function renderComponent(props?: Partial<DropdownButtonProps>) {
  return render(
    <DropdownButton
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
      test-label
    </DropdownButton>,
  );
}

it('should render in its most basic state', () => {
  const { container } = renderComponent();
  expect(container.querySelector('.iui-button.iui-dropdown')).toBeTruthy();
  expect(container.querySelector('.iui-icon')).toBeTruthy();
});

it('should update icon when menu opens or closes', () => {
  const { container } = renderComponent();

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toBeTruthy();

  const {
    container: { firstChild: downArrow },
  } = render(<SvgCaretDownSmall className='iui-icon' aria-hidden />);
  expect(container.querySelector('.iui-icon')).toEqual(downArrow);

  button.click();
  const {
    container: { firstChild: upArrow },
  } = render(<SvgCaretUpSmall className='iui-icon' aria-hidden />);
  expect(container.querySelector('.iui-icon')).toEqual(upArrow);

  button.click();
  expect(container.querySelector('.iui-icon')).toEqual(downArrow);
});

it('should work with menu items', () => {
  const { container } = renderComponent();

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toBeTruthy();

  let menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeFalsy();

  button.click();
  let tippy = document.querySelector('[data-tippy-root]') as HTMLElement;
  expect(tippy.style.visibility).toEqual('visible');

  menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeTruthy();

  expect(document.querySelectorAll('li')).toHaveLength(3);

  const menuItem = menu.querySelector('li') as HTMLLIElement;
  expect(menuItem).toBeTruthy();
  menuItem.click();

  tippy = document.querySelector('[data-tippy-root]') as HTMLElement;
  expect(tippy.style.visibility).toEqual('hidden');
});

it('should render borderless button correctly', () => {
  const { container } = renderComponent({ styleType: 'borderless' });
  expect(container.querySelector('.iui-button.iui-borderless')).toBeTruthy();
});

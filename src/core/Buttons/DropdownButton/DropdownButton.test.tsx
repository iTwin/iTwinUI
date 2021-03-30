/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { DropdownButton, DropdownButtonProps } from './DropdownButton';
import { MenuItem } from '../../Menu';
import SvgCaretDown2 from '@bentley/icons-generic-react/cjs/icons/CaretDown2';
import SvgCaretUp2 from '@bentley/icons-generic-react/cjs/icons/CaretUp2';

function renderComponent(...props: Partial<DropdownButtonProps>[]) {
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
  expect(container.querySelector('.iui-buttons-default.dropdown')).toBeTruthy();
  expect(container.querySelector('.iui-buttons-icon')).toBeTruthy();
});

it('should update icon when menu opens or closes', () => {
  const { container } = renderComponent();

  const button = container.querySelector(
    '.iui-buttons-default',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();

  const {
    container: { firstChild: downArrow },
  } = render(<SvgCaretDown2 className='iui-buttons-icon' />);
  expect(container.querySelector('.iui-buttons-icon')).toEqual(downArrow);

  button.click();
  const {
    container: { firstChild: upArrow },
  } = render(<SvgCaretUp2 className='iui-buttons-icon' />);
  expect(container.querySelector('.iui-buttons-icon')).toEqual(upArrow);

  button.click();
  expect(container.querySelector('.iui-buttons-icon')).toEqual(downArrow);
});

it('should work with menu items', () => {
  const { container } = renderComponent();

  const button = container.querySelector(
    '.iui-buttons-default',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();

  let menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeFalsy();

  button.click();
  menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeTruthy();

  expect(document.querySelectorAll('li')).toHaveLength(3);

  const menuItem = menu.querySelector('li') as HTMLLIElement;
  expect(menuItem).toBeTruthy();
  menuItem.click();

  menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeFalsy();
});

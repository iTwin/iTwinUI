/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';
import SvgPlaceholder from '@itwin/itwinui-icons-react/cjs/icons/Placeholder';
import SvgCaretDownSmall from '@itwin/itwinui-icons-react/cjs/icons/CaretDownSmall';
import SvgCaretUpSmall from '@itwin/itwinui-icons-react/cjs/icons/CaretUpSmall';

import HeaderButton from './HeaderButton';
import { MenuItem } from '../Menu';

it('should render in its most basic state', () => {
  const { container } = render(<HeaderButton name={'MockName'} />);
  expect(container.querySelector('.iui-label > :first-child')).toBeTruthy();
});

it('render default button correctly', () => {
  const { container } = render(<HeaderButton name={'MockName'} />);

  const root = container.querySelector(
    '.iui-header-button:not(.iui-dropdown).iui-borderless',
  );
  expect(root).toBeTruthy();

  const name = container.querySelector('.iui-label > :only-child');
  expect(name).toBeTruthy();
  expect(name?.textContent).toEqual('MockName');
});

it('render description correctly', () => {
  const { container } = render(
    <HeaderButton name={'MockName'} description={'MockDescription'} />,
  );

  const name = container.querySelector('.iui-label > :first-child');
  expect(name).toBeTruthy();
  expect(name?.textContent).toEqual('MockName');

  const description = container.querySelector(
    '.iui-label > .iui-description:last-child',
  );
  expect(description).toBeTruthy();
  expect(description?.textContent).toEqual('MockDescription');
});

it('render isActive correctly', () => {
  const { container } = render(
    <HeaderButton name={'MockName'} isActive={true} />,
  );

  const activeButton = container.querySelector('.iui-header-button.iui-active');
  expect(activeButton).toBeTruthy();
  expect(activeButton?.getAttribute('aria-current')).toEqual('location');
});

it('render startIcon correctly', () => {
  const { container } = render(
    <HeaderButton name={'MockName'} startIcon={<SvgPlaceholder />} />,
  );

  const {
    container: { firstChild: placeholderIcon },
  } = render(<SvgPlaceholder className='iui-icon iui-header-button-icon' />);
  expect(container.querySelector('.iui-header-button-icon')).toEqual(
    placeholderIcon,
  );
});

it('render menuItems correctly', () => {
  // Summarized, as this is based on Dropdown button, which is tested independently.
  const itemOneOnClick = jest.fn();
  const { container } = render(
    <HeaderButton
      name={'MockName'}
      startIcon={<SvgPlaceholder />}
      menuItems={(close) => [
        <MenuItem
          key={0}
          onClick={() => {
            itemOneOnClick();
            close();
          }}
        >
          Test0
        </MenuItem>,
        <MenuItem key={1} onClick={close}>
          Test1
        </MenuItem>,
        <MenuItem key={2} onClick={close}>
          Test2
        </MenuItem>,
      ]}
    />,
  );

  const button = container.querySelector(
    '.iui-header-button.iui-dropdown.iui-borderless',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();

  const {
    container: { firstChild: downArrow },
  } = render(<SvgCaretDownSmall className='iui-icon' aria-hidden />);
  expect(container.querySelector('.iui-icon:last-child')).toEqual(downArrow);

  let menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeFalsy();

  button.click();

  const {
    container: { firstChild: upArrow },
  } = render(<SvgCaretUpSmall className='iui-icon' aria-hidden />);
  expect(container.querySelector('.iui-icon:last-child')).toEqual(upArrow);

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

  expect(container.querySelector('.iui-icon:last-child')).toEqual(downArrow);

  expect(itemOneOnClick).toHaveBeenCalled();
});

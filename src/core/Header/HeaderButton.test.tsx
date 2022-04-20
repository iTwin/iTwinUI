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
  const { container } = render(<HeaderButton name='MockName' />);
  expect(
    container.querySelector('.iui-button-label > :first-child'),
  ).toBeTruthy();
});

it('should render default button correctly', () => {
  const { container } = render(<HeaderButton name={<div>MockName</div>} />);

  const root = container.querySelector(
    '.iui-header-button:not(.iui-dropdown).iui-borderless',
  );
  expect(root).toBeTruthy();

  const name = container.querySelector('.iui-button-label > div:only-child');
  expect(name).toBeTruthy();
  expect(name?.textContent).toEqual('MockName');
});

it('should render description correctly', () => {
  const { container } = render(
    <HeaderButton name='MockName' description='MockDescription' />,
  );

  const name = container.querySelector('.iui-button-label > :first-child');
  expect(name).toBeTruthy();
  expect(name?.textContent).toEqual('MockName');

  const description = container.querySelector(
    '.iui-button-label > .iui-description:last-child',
  );
  expect(description).toBeTruthy();
  expect(description?.textContent).toEqual('MockDescription');
});

it('should render isActive correctly', () => {
  const { container } = render(
    <HeaderButton name='MockName' isActive={true} />,
  );

  const activeButton = container.querySelector('.iui-header-button.iui-active');
  expect(activeButton).toBeTruthy();
  expect(activeButton?.getAttribute('aria-current')).toEqual('location');
});

it('should render split button correctly', () => {
  const itemOneOnClick = jest.fn();
  const buttonOnClick = jest.fn();

  const { container } = render(
    <HeaderButton
      name='MockName'
      onClick={buttonOnClick}
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

  const splitButton = container.querySelector(
    '.iui-header-split-button',
  ) as HTMLButtonElement;
  expect(splitButton).toBeTruthy();

  const innerButtons = splitButton.querySelectorAll('.iui-borderless');
  expect(innerButtons.length).toBe(2);

  (innerButtons[0] as HTMLButtonElement).click();
  expect(buttonOnClick).toBeCalled();

  (innerButtons[1] as HTMLButtonElement).click();
  const menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeTruthy();
  expect(document.querySelectorAll('li')).toHaveLength(3);
  const menuItem = menu.querySelector('li') as HTMLLIElement;
  expect(menuItem).toBeTruthy();
  menuItem.click();
  expect(itemOneOnClick).toBeCalled();
});

it('should render startIcon correctly', () => {
  const { container } = render(
    <HeaderButton name='MockName' startIcon={<SvgPlaceholder />} />,
  );

  const {
    container: { firstChild: placeholderIcon },
  } = render(
    <SvgPlaceholder className='iui-button-icon iui-header-button-icon' />,
  );
  expect(container.querySelector('.iui-header-button-icon')).toEqual(
    placeholderIcon,
  );
});

it('should render menuItems correctly', () => {
  // Summarized, as this is based on Dropdown button, which is tested independently.
  const itemOneOnClick = jest.fn();
  const { container } = render(
    <HeaderButton
      name='MockName'
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
    '.iui-header-dropdown-button',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();

  const {
    container: { firstChild: downArrow },
  } = render(<SvgCaretDownSmall className='iui-button-icon' aria-hidden />);
  expect(container.querySelector('.iui-button-icon:last-child')).toEqual(
    downArrow,
  );

  let menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeFalsy();

  button.click();

  const {
    container: { firstChild: upArrow },
  } = render(<SvgCaretUpSmall className='iui-button-icon' aria-hidden />);
  expect(container.querySelector('.iui-button-icon:last-child')).toEqual(
    upArrow,
  );

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

  expect(container.querySelector('.iui-button-icon:last-child')).toEqual(
    downArrow,
  );

  expect(itemOneOnClick).toHaveBeenCalled();
});

it('should support polymorphic `as` prop', () => {
  const { container } = render(
    <HeaderButton name='Name' as='a' href='https://example.com/' />,
  );

  const anchor = container.querySelector('a') as HTMLAnchorElement;
  expect(anchor).toHaveClass('iui-header-button');
  expect(anchor).toHaveTextContent('Name');
  expect(anchor.href).toEqual('https://example.com/');
});

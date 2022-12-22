/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';
import {
  SvgMore as SvgPlaceholder,
  SvgCaretDownSmall,
  SvgCaretUpSmall,
} from '../utils';

import HeaderButton from './HeaderButton';
import { MenuItem } from '../Menu';
import userEvent from '@testing-library/user-event';

it('should render in its most basic state', () => {
  const { container } = render(<HeaderButton name='MockName' />);
  expect(container.querySelector('span > :first-child')).toBeTruthy();
});

it('should render default button correctly', () => {
  const { container } = render(<HeaderButton name={<div>MockName</div>} />);

  const root = container.querySelector('.iui-header-breadcrumb-button');
  expect(root).toBeTruthy();

  const name = container.querySelector('span > div:only-child');
  expect(name).toBeTruthy();
  expect(name?.textContent).toEqual('MockName');
});

it('should render description correctly', () => {
  const { container } = render(
    <HeaderButton name='MockName' description='MockDescription' />,
  );

  const name = container.querySelector('span > :first-child');
  expect(name).toBeTruthy();
  expect(name?.textContent).toEqual('MockName');

  const description = container.querySelector(
    'span > .iui-header-breadcrumb-button-text-sublabel:last-child',
  );
  expect(description).toBeTruthy();
  expect(description?.textContent).toEqual('MockDescription');
});

it('should render isActive correctly', () => {
  const { container } = render(
    <HeaderButton name='MockName' isActive={true} />,
  );

  const activeButton = container.querySelector('.iui-header-breadcrumb-item');
  expect(activeButton).toBeTruthy();
  expect(activeButton?.getAttribute('aria-current')).toEqual('location');
});

it('should render split button correctly', async () => {
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
    '.iui-header-breadcrumb-button-wrapper',
  ) as HTMLButtonElement;
  expect(splitButton).toBeTruthy();

  const innerButtons = splitButton.querySelectorAll(
    '.iui-header-breadcrumb-button',
  );
  expect(innerButtons.length).toBe(2);

  await userEvent.click(innerButtons[0] as HTMLButtonElement);
  expect(buttonOnClick).toBeCalled();

  await userEvent.click(innerButtons[1] as HTMLButtonElement);
  const menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeTruthy();
  expect(menu.querySelectorAll('li')).toHaveLength(3);
  const menuItem = menu.querySelector('li') as HTMLLIElement;
  expect(menuItem).toBeTruthy();
  await userEvent.click(menuItem);
  expect(itemOneOnClick).toBeCalled();
});

it('should render startIcon correctly', () => {
  const { container } = render(
    <HeaderButton name='MockName' startIcon={<SvgPlaceholder />} />,
  );

  const {
    container: { firstChild: placeholderIcon },
  } = render(<SvgPlaceholder className='iui-header-breadcrumb-button-icon' />);
  expect(container.querySelector('.iui-header-breadcrumb-button-icon')).toEqual(
    placeholderIcon,
  );
});

it('should render menuItems correctly', async () => {
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
    '.iui-header-breadcrumb-button',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();

  const {
    container: { firstChild: downArrow },
  } = render(
    <SvgCaretDownSmall
      className='iui-header-breadcrumb-button-dropdown-icon'
      aria-hidden
    />,
  );
  expect(
    container.querySelector(
      '.iui-header-breadcrumb-button-dropdown-icon:last-child',
    ),
  ).toEqual(downArrow);

  let menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeFalsy();

  await userEvent.click(button);

  const {
    container: { firstChild: upArrow },
  } = render(
    <SvgCaretUpSmall
      className='iui-header-breadcrumb-button-dropdown-icon'
      aria-hidden
    />,
  );
  expect(
    container.querySelector(
      '.iui-header-breadcrumb-button-dropdown-icon:last-child',
    ),
  ).toEqual(upArrow);

  const tippy = document.querySelector('[data-tippy-root]') as HTMLElement;
  expect(tippy.style.visibility).toEqual('visible');

  menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeTruthy();

  expect(menu.querySelectorAll('li')).toHaveLength(3);

  const menuItem = menu.querySelector('li') as HTMLLIElement;
  expect(menuItem).toBeTruthy();
  await userEvent.click(menuItem);

  expect(tippy).not.toBeVisible();

  expect(
    container.querySelector(
      '.iui-header-breadcrumb-button-dropdown-icon:last-child',
    ),
  ).toEqual(downArrow);

  expect(itemOneOnClick).toHaveBeenCalled();
});

it('should support polymorphic `as` prop', () => {
  const { container } = render(
    <HeaderButton name='Name' as='a' href='https://example.com/' />,
  );

  const anchor = container.querySelector('a') as HTMLAnchorElement;
  expect(anchor).toHaveClass('iui-header-breadcrumb-button');
  expect(anchor).toHaveTextContent('Name');
  expect(anchor.href).toEqual('https://example.com/');
});

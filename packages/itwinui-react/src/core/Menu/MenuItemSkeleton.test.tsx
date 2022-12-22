/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';
import MenuItemSkeleton from './MenuItemSkeleton';

it('should render skeleton menu item with only label', () => {
  const { container } = render(<MenuItemSkeleton />);

  const menuItem = container.querySelector(
    '.iui-menu-item-skeleton',
  ) as HTMLLIElement;
  expect(menuItem).toBeTruthy();

  const label = menuItem.querySelector(
    '.iui-menu-label.iui-skeleton',
  ) as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.getAttribute('aria-hidden')).toBe('true');

  expect(menuItem.querySelector('.iui-icon')).toBeFalsy();
  expect(menuItem.querySelector('.iui-menu-description')).toBeFalsy();

  expect(menuItem.textContent).toEqual('Loading…');
});

it('should render skeleton menu item with icon, label and sublabel', () => {
  const { container } = render(<MenuItemSkeleton hasSublabel hasIcon />);

  const menuItem = container.querySelector(
    '.iui-menu-item-skeleton',
  ) as HTMLLIElement;
  expect(menuItem).toBeTruthy();

  const icon = menuItem.querySelector('.iui-icon.iui-skeleton') as HTMLElement;
  expect(icon).toBeTruthy();
  expect(icon.getAttribute('aria-hidden')).toBe('true');

  const label = menuItem.querySelector(
    '.iui-menu-label.iui-skeleton',
  ) as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.getAttribute('aria-hidden')).toBe('true');

  const sublabel = menuItem.querySelector(
    '.iui-menu-description.iui-skeleton',
  ) as HTMLElement;
  expect(sublabel).toBeTruthy();
  expect(sublabel.getAttribute('aria-hidden')).toBe('true');

  expect(menuItem.textContent).toEqual('Loading…');
});

it('should render skeleton menu item with custom loading string', () => {
  const { container } = render(
    <MenuItemSkeleton translatedStrings={{ loading: 'Item is loading' }} />,
  );

  const menuItem = container.querySelector(
    '.iui-menu-item-skeleton',
  ) as HTMLLIElement;
  expect(menuItem).toBeTruthy();

  expect(menuItem.textContent).toEqual('Item is loading');
});

it('should render skeleton menu item with custom width', () => {
  const { container } = render(<MenuItemSkeleton contentWidth='50%' />);

  const menuItem = container.querySelector(
    '.iui-menu-item-skeleton',
  ) as HTMLLIElement;
  expect(menuItem).toBeTruthy();
  expect(
    menuItem.style.getPropertyValue(
      '--iui-menu-item-content-skeleton-max-width',
    ),
  ).toEqual('50%');
});

it('should render skeleton menu item with custom style and className', () => {
  const { container } = render(
    <MenuItemSkeleton style={{ color: 'red' }} className='test-class' />,
  );

  const menuItem = container.querySelector(
    '.iui-menu-item-skeleton',
  ) as HTMLLIElement;
  expect(menuItem).toBeTruthy();
  expect(menuItem.classList.contains('test-class')).toBeTruthy();
  expect(menuItem.style.color).toEqual('red');
});

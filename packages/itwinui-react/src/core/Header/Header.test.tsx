/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { Header } from './Header';
import { MenuItem } from '../Menu';
import userEvent from '@testing-library/user-event';

it('should render in its most basic state', () => {
  const { container } = render(
    <Header appLogo={<div className='app-title-container'>AppTitle</div>} />,
  );
  expect(container.querySelector('.iui-page-header')).toBeTruthy();
  expect(
    container.querySelector(
      '.iui-page-header > .iui-page-header-left:first-child',
    ),
  ).toBeTruthy();
  expect(
    container.querySelector(
      '.iui-page-header > .iui-page-header-left > .app-title-container:first-child',
    ),
  ).toBeTruthy();
  expect(
    container.querySelector(
      '.iui-page-header > .iui-page-header-left > .iui-page-header-divider:nth-child(2)',
    ),
  ).toBeNull();
  expect(
    container.querySelector(
      '.iui-page-header > .iui-page-header-right:last-child',
    ),
  ).toBeTruthy();
  expect(
    container.querySelector('.iui-page-header > .iui-page-header-center'),
  ).toBeNull();
});

it('renders isSlim correctly', () => {
  const { container } = render(
    <Header appLogo={<div>AppTitle</div>} isSlim={true} />,
  );

  const header = container.querySelector('.iui-page-header');
  expect(header).toHaveAttribute('data-iui-size', 'slim');
});

it('renders breadcrumbs correctly', () => {
  const { container } = render(
    <Header
      appLogo={<div>AppTitle</div>}
      breadcrumbs={<div>BreadcrumbContent</div>}
    />,
  );

  const breadcrumbs = container.querySelector(
    '.iui-page-header-left > :nth-child(3)',
  );
  expect(breadcrumbs).toBeTruthy();
  expect(breadcrumbs?.textContent).toEqual('BreadcrumbContent');
});

it('renders children correctly', () => {
  const { container } = render(
    <Header appLogo={<div>AppTitle</div>}>ChildContent</Header>,
  );

  const center = container.querySelector(
    '.iui-page-header-center:nth-child(2):nth-last-child(2)',
  );
  expect(center).toBeTruthy();
  expect(center?.textContent).toEqual('ChildContent');
});

it('renders actions alone correctly', () => {
  const { container } = render(
    <Header
      appLogo={<div>AppTitle</div>}
      actions={[<div key='1'>ActionsContent</div>]}
    />,
  );

  const actions = container.querySelector(
    '.iui-page-header-right > :first-child',
  );
  expect(actions).toBeTruthy();
  expect(actions?.textContent).toEqual('ActionsContent');
});
it('renders avatar alone correctly', () => {
  const { container } = render(
    <Header
      appLogo={<div>AppTitle</div>}
      actions={[<div key='1'>AvatarContent</div>]}
    />,
  );

  const avatar = container.querySelector(
    '.iui-page-header-right > :first-child',
  );
  expect(avatar).toBeTruthy();
  expect(avatar?.textContent).toEqual('AvatarContent');
});
it('renders moreMenu alone correctly', async () => {
  // Summarized, as this is partly based on DropdownMenu, which is tested independently.
  const itemOneOnClick = jest.fn();

  const { container } = render(
    <Header
      appLogo={<div>AppTitle</div>}
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
    '.iui-page-header-right > .iui-button[data-iui-variant="borderless"]:last-child',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.getAttribute('aria-label')).toEqual('More options');

  let menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeFalsy();

  await userEvent.click(button);

  const tippy = document.querySelector('[data-tippy-root]') as HTMLElement;
  expect(tippy.style.visibility).toEqual('visible');

  menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeTruthy();

  expect(document.querySelectorAll('li')).toHaveLength(3);

  const menuItem = menu.querySelector('li') as HTMLLIElement;
  expect(menuItem).toBeTruthy();
  await userEvent.click(menuItem);

  expect(tippy).not.toBeVisible();

  expect(itemOneOnClick).toHaveBeenCalled();
});

it('renders translatedStrings correctly', () => {
  const { container } = render(
    <Header
      appLogo={<div>AppTitle</div>}
      isSlim={true}
      menuItems={() => []}
      translatedStrings={{ moreOptions: 'MockOptions' }}
    />,
  );

  const button = container.querySelector(
    '.iui-page-header-right > .iui-button[data-iui-variant="borderless"]:last-child',
  ) as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button.getAttribute('aria-label')).toEqual('MockOptions');
});

it('renders multiple right items in the correct order', () => {
  const { container } = render(
    <Header
      appLogo={<div>AppTitle</div>}
      actions={[
        <div key='1'>ActionsContent</div>,
        <div key='2'>AvatarContent</div>,
      ]}
      menuItems={() => []}
    />,
  );
  const actions = container.querySelector(
    '.iui-page-header-right > :first-child',
  );
  expect(actions).toBeTruthy();
  expect(actions?.textContent).toEqual('ActionsContent');
  const avatar = container.querySelector(
    '.iui-page-header-right > :nth-child(2)',
  );
  expect(avatar).toBeTruthy();
  expect(avatar?.textContent).toEqual('AvatarContent');
  const moreMenu = container.querySelector(
    '.iui-page-header-right > .iui-button[data-iui-variant="borderless"]:last-child',
  ) as HTMLButtonElement;
  expect(moreMenu).toBeTruthy();
});

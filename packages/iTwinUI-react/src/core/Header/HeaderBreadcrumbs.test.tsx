/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import HeaderBreadcrumbs from './HeaderBreadcrumbs';

it('should render in its most basic state', () => {
  const { container } = render(<HeaderBreadcrumbs items={[]} />);
  const nav = container.querySelector('nav') as HTMLElement;
  expect(nav).toBeTruthy();
  expect(nav.getAttribute('aria-label')).toEqual('breadcrumbs');
});

it('should support additional aria-* props to allow user overrides', () => {
  const { container } = render(
    <HeaderBreadcrumbs items={[]} aria-label='MockBreadcrumbs' />,
  );
  const nav = container.querySelector('nav') as HTMLElement;
  expect(nav).toBeTruthy();
  expect(nav.getAttribute('aria-label')).toEqual('MockBreadcrumbs');
});

it('renders single element alone', () => {
  const { container } = render(
    <HeaderBreadcrumbs items={[<div key='item1'>singleItem</div>]} />,
  );
  expect(container.querySelector('nav')).toBeTruthy();

  const item = container.querySelector('div:only-child');
  expect(item?.textContent).toEqual('singleItem');
});

it('renders multiple elements with chevrons', () => {
  const { container } = render(
    <HeaderBreadcrumbs
      items={[
        <div key='item1'>Item1</div>,
        <div key='item2'>Item2</div>,
        <div key='item3'>Item3</div>,
      ]}
    />,
  );
  const item1 = container.querySelector('div:nth-child(1):first-child');
  expect(item1).toBeTruthy();
  expect(item1?.textContent).toEqual('Item1');

  const chevron1 = container.querySelector(
    'li.iui-breadcrumbs-separator:nth-child(2)',
  );
  expect(chevron1).toBeTruthy();

  const item2 = container.querySelector('div:nth-child(3)');
  expect(item2).toBeTruthy();
  expect(item2?.textContent).toEqual('Item2');

  const chevron2 = container.querySelector(
    'li.iui-breadcrumbs-separator:nth-child(4)',
  );
  expect(chevron2).toBeTruthy();

  const item3 = container.querySelector('div:nth-child(5):last-child');
  expect(item3).toBeTruthy();
  expect(item3?.textContent).toEqual('Item3');
});

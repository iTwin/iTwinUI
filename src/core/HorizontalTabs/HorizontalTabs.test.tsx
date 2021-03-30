/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { HorizontalTabs, HorizontalTabsProps } from './HorizontalTabs';

const renderComponent = (
  initialProps?: Partial<HorizontalTabsProps>,
  initialChildren?: React.ReactNode,
) => {
  const defaultProps: HorizontalTabsProps = {
    labels: ['item1', 'item2', 'item3'],
  };
  const props = { ...defaultProps, ...initialProps };
  const children = initialChildren ?? 'Test content';
  return render(<HorizontalTabs {...props}>{children}</HorizontalTabs>);
};

it('should render tags', () => {
  const { container } = renderComponent();

  const tabContainer = container.querySelector('ul') as HTMLElement;
  expect(tabContainer).toBeTruthy();
  expect(tabContainer.className).toEqual('iui-tabs-horizontal');
  expect(tabContainer.querySelectorAll('a').length).toBe(3);
  screen.getByText('Test content');
});

it('should render borderless tags', () => {
  const { container } = renderComponent({ type: 'borderless' });

  const tabContainer = container.querySelector('ul') as HTMLElement;
  expect(tabContainer).toBeTruthy();
  expect(tabContainer.className).toEqual('iui-tabs-borderless');
});

it('should render pill tags', () => {
  const { container } = renderComponent({ type: 'pill' });

  const tabContainer = container.querySelector('ul') as HTMLElement;
  expect(tabContainer).toBeTruthy();
  expect(tabContainer.className).toEqual('iui-tabs-pill');
});

it('should render green tags', () => {
  const { container } = renderComponent({ color: 'green' });

  const tabContainer = container.querySelector('ul') as HTMLElement;
  expect(tabContainer).toBeTruthy();
  expect(tabContainer.className).toContain('iui-green');
});

it('should call onTabSelected when switching tabs', () => {
  const onTabSelected = jest.fn();
  const { container } = renderComponent({ onTabSelected });

  const tabs = container.querySelectorAll('a');
  expect(tabs.length).toBe(3);
  fireEvent.click(tabs[2]);
  expect(onTabSelected).toHaveBeenCalledWith(2);
});

it('should set active tab', () => {
  const { container } = renderComponent({ activeIndex: 2 });

  const tabs = container.querySelectorAll('li');
  expect(tabs.length).toBe(3);
  expect(tabs[0].className).not.toContain('iui-tabs-active');
  expect(tabs[1].className).not.toContain('iui-tabs-active');
  expect(tabs[2].className).toContain('iui-tabs-active');
});

it('should not fail with invalid active tab and set the first one', () => {
  const { container } = renderComponent({ activeIndex: 100 });

  const tabs = container.querySelectorAll('li');
  expect(tabs.length).toBe(3);
  expect(tabs[0].className).toContain('iui-tabs-active');
  expect(tabs[1].className).not.toContain('iui-tabs-active');
  expect(tabs[2].className).not.toContain('iui-tabs-active');
});

it('should add custom classnames', () => {
  const { container } = renderComponent({
    tabsClassName: 'customTabsClassName',
    contentClassName: 'customContentClassName',
  });

  const tabsContainer = container.querySelector('ul.customTabsClassName');
  expect(tabsContainer).toBeTruthy();
  const content = container.querySelector('div.customContentClassName');
  expect(content).toBeTruthy();
});

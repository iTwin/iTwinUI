/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { HorizontalTab } from './HorizontalTab';
import { HorizontalTabs, HorizontalTabsProps } from './HorizontalTabs';

const renderComponent = (
  initialProps?: Partial<HorizontalTabsProps>,
  initialChildren?: React.ReactNode,
) => {
  const defaultProps: HorizontalTabsProps = {
    labels: [
      <HorizontalTab key={1} label='Label 1' />,
      <HorizontalTab key={2} label='Label 2' />,
      <HorizontalTab key={3} label='Label 3' />,
    ],
  };
  const props = { ...defaultProps, ...initialProps };
  const children = initialChildren ?? 'Test content';
  return render(<HorizontalTabs {...props}>{children}</HorizontalTabs>);
};

it('should render tabs', () => {
  const { container } = renderComponent();

  expect(container.querySelector('.iui-tabs-wrapper')).toBeTruthy();

  const tabContainer = container.querySelector('.iui-tabs') as HTMLElement;
  expect(tabContainer).toBeTruthy();
  expect(tabContainer.className).toEqual('iui-tabs iui-default');
  expect(tabContainer.querySelectorAll('.iui-tab').length).toBe(3);
  screen.getByText('Test content');
});

it('should render borderless tabs', () => {
  const { container } = renderComponent({ type: 'borderless' });

  const tabContainer = container.querySelector('.iui-tabs') as HTMLElement;
  expect(tabContainer).toBeTruthy();
  expect(tabContainer.className).toContain('iui-tabs iui-borderless');
});

it('should render pill tabs', () => {
  const { container } = renderComponent({ type: 'pill' });

  const tabContainer = container.querySelector('.iui-tabs') as HTMLElement;
  expect(tabContainer).toBeTruthy();
  expect(tabContainer.className).toContain('iui-tabs iui-pill');
});

it('should render green tabs', () => {
  const { container } = renderComponent({ color: 'green' });

  const tabContainer = container.querySelector('.iui-tabs') as HTMLElement;
  expect(tabContainer).toBeTruthy();
  expect(tabContainer.className).toContain('iui-green');
});

it('should call onTabSelected when switching tabs', () => {
  const onTabSelected = jest.fn();
  const { container } = renderComponent({ onTabSelected });

  const tabs = container.querySelectorAll('.iui-tab');
  expect(tabs.length).toBe(3);
  fireEvent.click(tabs[2]);
  expect(onTabSelected).toHaveBeenCalledWith(2);
});

it('should set active tab', () => {
  const { container } = renderComponent({ activeIndex: 2 });

  const tabs = container.querySelectorAll('.iui-tab');
  expect(tabs.length).toBe(3);
  expect(tabs[0].className).not.toContain('iui-tab iui-active');
  expect(tabs[1].className).not.toContain('iui-tab iui-active');
  expect(tabs[2].className).toContain('iui-tab iui-active');
});

it('should not fail with invalid active tab and set the first one', () => {
  const { container } = renderComponent({ activeIndex: 100 });

  const tabs = container.querySelectorAll('.iui-tab');
  expect(tabs.length).toBe(3);
  expect(tabs[0].className).toContain('iui-tab iui-active');
  expect(tabs[1].className).not.toContain('iui-tab iui-active');
  expect(tabs[2].className).not.toContain('iui-tab iui-active');
});

it('should render strings in HorizontalTab child component', () => {
  const { container } = renderComponent({
    labels: ['item0', 'item1', 'item2'],
  });

  const tabs = container.querySelectorAll('.iui-tab');
  expect(tabs.length).toBe(3);
  tabs.forEach((tab, index) => {
    const label = tab.querySelector('.iui-tab-label') as HTMLElement;
    expect(label).toBeTruthy();
    expect(label.firstElementChild?.textContent).toEqual(`item${index}`);
  });
});

it('should add .iui-large if HorizontalTab has sublabel', () => {
  const { container } = renderComponent({
    labels: [
      <HorizontalTab key={0} label='item0' sublabel='Sublabel0' />,
      <HorizontalTab key={1} label='item1' sublabel='Sublabel1' />,
      <HorizontalTab key={2} label='item2' sublabel='Sublabel2' />,
    ],
  });
  expect(container.querySelector('.iui-tabs.iui-large')).toBeTruthy();

  const tabs = container.querySelectorAll('.iui-tab');
  expect(tabs.length).toBe(3);
  tabs.forEach((tab, index) => {
    const label = tab.querySelector('.iui-tab-label') as HTMLElement;
    expect(label.textContent).toEqual(`item${index}Sublabel${index}`);
  });
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

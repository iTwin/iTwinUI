/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Tab } from './Tab';
import { Tabs, TabsProps } from './Tabs';

const renderComponent = (
  initialProps?: Partial<TabsProps>,
  initialChildren?: React.ReactNode,
) => {
  const defaultProps: TabsProps = {
    labels: [
      <Tab key={1} label='Label 1' />,
      <Tab key={2} label='Label 2' />,
      <Tab key={3} label='Label 3' />,
    ],
  };
  const props: TabsProps = { ...defaultProps, ...initialProps } as TabsProps;
  const children = initialChildren ?? 'Test content';
  return render(<Tabs {...props}>{children}</Tabs>);
};

it('should render tabs', () => {
  const { container } = renderComponent();

  expect(
    container.querySelector('.iui-tabs-wrapper.iui-horizontal'),
  ).toBeTruthy();

  const tabContainer = container.querySelector('.iui-tabs') as HTMLElement;
  expect(tabContainer).toBeTruthy();
  expect(tabContainer).toHaveClass('iui-default');
  expect(tabContainer.querySelectorAll('.iui-tab').length).toBe(3);
  screen.getByText('Test content');
});

it('should render animated borderless tabs', () => {
  const { container } = renderComponent({ type: 'borderless' });

  const tabContainer = container.querySelector('.iui-tabs') as HTMLElement;
  expect(tabContainer).toBeTruthy();
  expect(tabContainer).toHaveClass('iui-borderless');
  expect(tabContainer).toHaveClass(`iui-animated`);
});

it('should render pill tabs', () => {
  const { container } = renderComponent({ type: 'pill' });

  const tabContainer = container.querySelector('.iui-tabs') as HTMLElement;
  expect(tabContainer).toBeTruthy();
  expect(tabContainer.className).toContain('iui-tabs iui-pill');
});

it('should render vertical tabs', () => {
  const { container, queryByText } = render(
    <Tabs
      orientation='vertical'
      labels={[
        <Tab key={1} label='Label 1' />,
        <Tab key={2} label='Label 2' />,
        <Tab key={3} label='Label 3' />,
      ]}
    >
      Test content
    </Tabs>,
  );

  expect(
    container.querySelector('.iui-tabs-wrapper.iui-vertical'),
  ).toBeTruthy();
  expect(container.querySelector('.iui-tabs')).toBeTruthy();
  expect(container.querySelector('.iui-tab')).toBeTruthy();
  expect(queryByText('Test content')).toHaveClass('iui-tabs-content');
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

it('should not fail with invalid active tab and set the closest one', () => {
  const { container } = renderComponent({ activeIndex: 100 });

  const tabs = container.querySelectorAll('.iui-tab');
  expect(tabs.length).toBe(3);
  expect(tabs[0].className).not.toContain('iui-tab iui-active');
  expect(tabs[1].className).not.toContain('iui-tab iui-active');
  expect(tabs[2].className).toContain('iui-tab iui-active'); // 2 is closest to 100
});

it('should render strings in child component', () => {
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

it('should add .iui-large if tabs have sublabel', () => {
  const { container } = renderComponent({
    labels: [
      <Tab key={0} label='item0' sublabel='Sublabel0' />,
      <Tab key={1} label='item1' sublabel='Sublabel1' />,
      <Tab key={2} label='item2' sublabel='Sublabel2' />,
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
    wrapperClassName: 'customWrapperClassName',
  });

  expect(container.querySelector('.iui-tabs-wrapper')).toHaveClass(
    'customWrapperClassName',
  );
  expect(container.querySelector('ul.iui-tabs')).toHaveClass(
    'customTabsClassName',
  );
  expect(container.querySelector('.iui-tabs-content')).toHaveClass(
    'customContentClassName',
  );
});

it.each(['horizontal', 'vertical'] as const)(
  'should handle keypresses',
  (orientation) => {
    const mockOnTabSelected = jest.fn();
    const { container } = renderComponent({
      onTabSelected: mockOnTabSelected,
      orientation: orientation,
    });

    const nextTabKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
    const previousTabKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';

    const tablist = container.querySelector('.iui-tabs') as HTMLElement;
    const tabs = Array.from(tablist.querySelectorAll('.iui-tab'));

    // alt key
    fireEvent.keyDown(tablist, { key: nextTabKey, altKey: true });
    expect(mockOnTabSelected).not.toHaveBeenCalled();

    // 0 -> 1
    fireEvent.keyDown(tablist, { key: nextTabKey });
    expect(mockOnTabSelected).toBeCalledWith(1);
    expect(document.activeElement).toBe(tabs[1]);

    // 1 -> 2
    fireEvent.keyDown(tablist, { key: nextTabKey });
    expect(mockOnTabSelected).toBeCalledWith(2);
    expect(document.activeElement).toBe(tabs[2]);

    // 2 -> 0
    fireEvent.keyDown(tablist, { key: nextTabKey });
    expect(mockOnTabSelected).toBeCalledWith(0);
    expect(document.activeElement).toBe(tabs[0]);

    // 0 -> 2
    fireEvent.keyDown(tablist, { key: previousTabKey });
    expect(mockOnTabSelected).toBeCalledWith(2);
    expect(document.activeElement).toBe(tabs[2]);

    // 2 -> 1
    fireEvent.keyDown(tablist, { key: previousTabKey });
    expect(mockOnTabSelected).toBeCalledWith(1);
    expect(document.activeElement).toBe(tabs[1]);
  },
);

it('should handle keypresses when focusActivationMode is manual', () => {
  const mockOnTabSelected = jest.fn();
  const { container } = renderComponent({
    focusActivationMode: 'manual',
    onTabSelected: mockOnTabSelected,
  });

  const tablist = container.querySelector('.iui-tabs') as HTMLElement;
  const tabs = Array.from(tablist.querySelectorAll('.iui-tab'));

  // 0 -> 1
  fireEvent.keyDown(tablist, { key: 'ArrowRight' });
  expect(mockOnTabSelected).not.toBeCalled();
  expect(document.activeElement).toBe(tabs[1]);

  // select 1
  fireEvent.keyDown(tablist, { key: 'Enter' });
  expect(mockOnTabSelected).toBeCalledWith(1);

  // 1 -> 0
  fireEvent.keyDown(tablist, { key: 'ArrowLeft' });
  expect(mockOnTabSelected).not.toBeCalledWith(0);
  expect(document.activeElement).toBe(tabs[0]);

  // select 0
  fireEvent.keyDown(tablist, { key: ' ' });
  expect(mockOnTabSelected).toBeCalledWith(0);
});

it('should set focused index when tab is clicked', () => {
  const mockOnTabSelected = jest.fn();
  const { container } = renderComponent({ onTabSelected: mockOnTabSelected });

  const tablist = container.querySelector('.iui-tabs') as HTMLElement;
  const tabs = Array.from(tablist.querySelectorAll('.iui-tab'));

  // click 1
  fireEvent.click(tabs[1]);
  expect(mockOnTabSelected).toBeCalledWith(1);
  expect(document.activeElement).toBe(tabs[1]);

  // 1 -> 2
  fireEvent.keyDown(tablist, { key: 'ArrowRight' });
  expect(mockOnTabSelected).toBeCalledWith(2);
  expect(document.activeElement).toBe(tabs[2]);
});

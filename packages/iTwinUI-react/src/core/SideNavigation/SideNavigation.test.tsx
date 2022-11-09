/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { SideNavigation, SideNavigationProps } from './SideNavigation';
import { SidenavButton } from './SidenavButton';
import { SidenavSubmenu } from './SidenavSubmenu';
import { SvgMore as SvgPlaceholder, SvgChevronRight } from '../utils/';
import userEvent from '@testing-library/user-event';

function renderComponent(props?: Partial<SideNavigationProps>) {
  return render(
    <SideNavigation
      items={[
        <SidenavButton startIcon={<SvgPlaceholder />} key={0}>
          mockbutton 0
        </SidenavButton>,
        <SidenavButton startIcon={<SvgPlaceholder />} key={1}>
          mockbutton 1
        </SidenavButton>,
        <SidenavButton startIcon={<SvgPlaceholder />} key={2}>
          mockbutton 2
        </SidenavButton>,
      ]}
      {...props}
    />,
  );
}

it('should render in its most basic state', () => {
  const { container } = renderComponent();
  expect(container.querySelector('.iui-side-navigation-wrapper')).toBeTruthy();
  expect(container.querySelector('.iui-side-navigation')).toBeTruthy();
  expect(container.querySelector('.iui-sidenav-content')).toBeTruthy();
  expect(container.querySelector('.iui-expand')).toBeTruthy();

  const {
    container: { firstChild: placeholderIcon },
  } = render(<SvgPlaceholder />);

  const mainItems = container.querySelectorAll('.iui-top .iui-sidenav-button');
  expect(mainItems).toHaveLength(3);
  mainItems.forEach((item, index) => {
    expect(item).toBeTruthy();

    const buttonIcon = item.querySelector('.iui-button-icon');
    const svg = buttonIcon?.querySelector('svg');

    expect(buttonIcon).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toEqual(placeholderIcon);

    expect(item.querySelector('span:last-of-type')?.textContent).toBe(
      `mockbutton ${index}`,
    );
  });
});

it('should render secondary items', () => {
  const { container } = renderComponent({
    secondaryItems: [
      <SidenavButton startIcon={<SvgPlaceholder />} key={0}>
        mock secondary 0
      </SidenavButton>,
      <SidenavButton startIcon={<SvgPlaceholder />} key={1}>
        mock secondary 1
      </SidenavButton>,
    ],
  });
  expect(container.querySelector('.iui-side-navigation')).toBeTruthy();
  const mainItems = container.querySelectorAll('.iui-top .iui-sidenav-button');
  expect(mainItems).toHaveLength(3);

  const {
    container: { firstChild: placeholderIcon },
  } = render(<SvgPlaceholder />);

  const secondaryItems = container.querySelectorAll(
    '.iui-bottom .iui-sidenav-button',
  );
  expect(secondaryItems).toHaveLength(2);

  secondaryItems.forEach((item, index) => {
    expect(item).toBeTruthy();

    const buttonIcon = item.querySelector('.iui-button-icon');
    const svg = buttonIcon?.querySelector('svg');

    expect(buttonIcon).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toEqual(placeholderIcon);

    expect(item.querySelector('span:last-of-type')?.textContent).toBe(
      `mock secondary ${index}`,
    );
  });
});

it('should place expand button correctly in the DOM tree', () => {
  // top
  const { container: root1 } = renderComponent();
  const sidebar1 = root1.querySelector('.iui-side-navigation') as HTMLElement;
  expect(sidebar1).toBeTruthy();

  const expander1 = sidebar1.firstElementChild as HTMLElement;
  expect(expander1.classList).toContain('iui-expand');

  // bottom
  const { container: root2 } = renderComponent({
    expanderPlacement: 'bottom',
  });
  const sidebar2 = root2.querySelector('.iui-side-navigation') as HTMLElement;
  expect(sidebar2).toBeTruthy();

  const expander2 = sidebar2.lastElementChild as HTMLElement;
  expect(expander2.classList).toContain('iui-expand');

  // hidden
  const { container: root3 } = renderComponent({
    expanderPlacement: 'hidden',
  });
  expect(root3.querySelector('.iui-side-navigation')).toBeTruthy();
  expect(root3.querySelector('.iui-expand')).toBeFalsy();
});

it('should render expand button svg correctly', () => {
  const { container } = renderComponent();
  expect(container.querySelector('.iui-side-navigation')).toBeTruthy();

  const {
    container: { firstChild: expandIcon },
  } = render(<SvgChevronRight />);

  const buttonIcon = container.querySelector('.iui-expand .iui-button-icon');
  const svg = buttonIcon?.querySelector('svg');

  expect(buttonIcon).toHaveAttribute('aria-hidden', 'true');
  expect(svg).toEqual(expandIcon);
});

it('should handle clicking on expand button', async () => {
  const mockFn = jest.fn();
  const { container } = renderComponent({ onExpanderClick: mockFn });
  expect(
    container.querySelector('.iui-side-navigation.iui-collapsed'),
  ).toBeTruthy();

  const expandButton = container.querySelector('.iui-expand') as HTMLElement;
  await userEvent.click(expandButton);
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(
    container.querySelector('.iui-side-navigation.iui-expanded'),
  ).toBeTruthy();

  await userEvent.click(expandButton);
  expect(mockFn).toHaveBeenCalledTimes(2);
  expect(
    container.querySelector('.iui-side-navigation.iui-collapsed'),
  ).toBeTruthy();
});

it('should work with controlled isExpanded prop', () => {
  const { container: sidebar1 } = renderComponent({ isExpanded: true });
  expect(
    sidebar1.querySelector('.iui-side-navigation.iui-expanded'),
  ).toBeTruthy();

  const { container: sidebar2 } = renderComponent({ isExpanded: false });
  expect(
    sidebar2.querySelector('.iui-side-navigation.iui-collapsed'),
  ).toBeTruthy();
});

it('should only add tooltips to items when collapsed', async () => {
  // collapsed
  const { container, getByText, queryByText } = renderComponent();
  expect(container.querySelector('.iui-side-navigation')).toBeTruthy();

  const mainItems = container.querySelectorAll('.iui-top .iui-sidenav-button');
  expect(mainItems).toHaveLength(3);
  mainItems.forEach((item, index) => {
    expect(
      queryByText(`mockbutton ${index}`, { selector: '.iui-tooltip' }),
    ).toBeFalsy();
    fireEvent.mouseEnter(item);
    getByText(`mockbutton ${index}`, { selector: '.iui-tooltip' });
  });

  // expanded
  const expandButton = container.querySelector('.iui-expand') as HTMLElement;
  await userEvent.click(expandButton);
  expect(queryByText('mockbutton 0', { selector: '.iui-tooltip' })).toBeFalsy();
});

it('should render active and disabled sidebar buttons', () => {
  const { container } = renderComponent({
    items: [
      <SidenavButton startIcon={<SvgPlaceholder />} key={0} isActive>
        mockbutton 0
      </SidenavButton>,
      <SidenavButton startIcon={<SvgPlaceholder />} key={1} disabled>
        mockbutton 1
      </SidenavButton>,
      <SidenavButton startIcon={<SvgPlaceholder />} key={2} isSubmenuOpen>
        mockbutton 2
      </SidenavButton>,
    ],
  });
  expect(container.querySelector('.iui-side-navigation')).toBeTruthy();

  const mainItems = container.querySelectorAll('.iui-top .iui-sidenav-button');
  expect(mainItems).toHaveLength(3);

  expect(mainItems[0]).toHaveAttribute('data-iui-active', 'true');
  expect(mainItems[1]).toBeDisabled();
  expect(mainItems[2]).toHaveClass('iui-submenu-open');
});

it('should handle custom class and style', () => {
  const { container } = renderComponent({
    className: 'test-class',
    style: { height: 200 },
  });

  const sidebar = container.querySelector(
    '.iui-side-navigation-wrapper',
  ) as HTMLElement;

  expect(sidebar).toHaveClass('test-class');
  expect(sidebar).toHaveStyle('height: 200px');
});

it('should render with submenu', () => {
  const { container } = renderComponent({
    submenu: <SidenavSubmenu>submenu content</SidenavSubmenu>,
    isSubmenuOpen: true,
  });

  const wrapper = container.querySelector(
    '.iui-side-navigation-wrapper',
  ) as HTMLElement;

  expect(wrapper.querySelector('.iui-side-navigation')).toBeTruthy();
  expect(wrapper.querySelector('.iui-sidenav-content')).toBeTruthy();

  expect(
    wrapper.querySelector('.iui-side-navigation-submenu'),
  ).toHaveTextContent('submenu content');

  expect(screen.getByText('submenu content')).toHaveClass(
    'iui-side-navigation-submenu-content',
  );
});

it('should not show submenu if isSubmenuOpen is false', () => {
  const { container } = renderComponent({
    submenu: <SidenavSubmenu>submenu content</SidenavSubmenu>,
    isSubmenuOpen: false,
  });

  const wrapper = container.querySelector(
    '.iui-side-navigation-wrapper',
  ) as HTMLElement;

  expect(wrapper.querySelector('.iui-side-navigation')).toBeTruthy();
  expect(wrapper.querySelector('.iui-sidenav-content')).toBeTruthy();

  expect(wrapper.querySelector('.iui-side-navigation-submenu')).toBeFalsy();
  expect(screen.queryByText('submenu content')).toBeFalsy();
});

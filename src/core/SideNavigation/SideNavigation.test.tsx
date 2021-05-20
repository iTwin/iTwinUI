/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { SideNavigation, SideNavigationProps } from './SideNavigation';
import { SidenavButton } from './SidenavButton';
import SvgPlaceholder from '@itwin/itwinui-icons-react/cjs/icons/Placeholder';
import SvgChevronRight from '@itwin/itwinui-icons-react/cjs/icons/ChevronRight';

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
  expect(container.querySelector('.iui-side-navigation')).toBeTruthy();
  expect(container.querySelector('.iui-sidenav-content')).toBeTruthy();
  expect(container.querySelector('.iui-expand')).toBeTruthy();

  const {
    container: { firstChild: placeholderIcon },
  } = render(<SvgPlaceholder className='iui-icon' />);

  const mainItems = container.querySelectorAll('.iui-top .iui-sidenav-button');
  expect(mainItems).toHaveLength(3);
  mainItems.forEach((item, index) => {
    expect(item).toBeTruthy();
    expect(item.querySelector('.iui-icon')).toEqual(placeholderIcon);
    expect(item.querySelector('.iui-label')?.textContent).toBe(
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
  } = render(<SvgPlaceholder className='iui-icon' />);

  const secondaryItems = container.querySelectorAll(
    '.iui-bottom .iui-sidenav-button',
  );
  expect(secondaryItems).toHaveLength(2);

  secondaryItems.forEach((item, index) => {
    expect(item).toBeTruthy();
    expect(item.querySelector('.iui-icon')).toEqual(placeholderIcon);
    expect(item.querySelector('.iui-label')?.textContent).toBe(
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
  } = render(<SvgChevronRight className='iui-icon' aria-hidden />);
  expect(container.querySelector('.iui-expand .iui-icon')).toEqual(expandIcon);
});

it('should handle clicking on expand button', () => {
  const mockFn = jest.fn();
  const { container } = renderComponent({ onExpanderClick: mockFn });
  expect(
    container.querySelector('.iui-side-navigation.iui-collapsed'),
  ).toBeTruthy();

  const expandButton = container.querySelector('.iui-expand') as HTMLElement;
  expandButton.click();
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(
    container.querySelector('.iui-side-navigation.iui-expanded'),
  ).toBeTruthy();

  expandButton.click();
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

it('should only add tooltips to items when collapsed', () => {
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
  expandButton.click();
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
    ],
  });
  expect(container.querySelector('.iui-side-navigation')).toBeTruthy();

  const mainItems = container.querySelectorAll('.iui-top .iui-sidenav-button');
  expect(mainItems).toHaveLength(2);

  expect(mainItems[0].classList).toContain('iui-active');
  expect((mainItems[1] as HTMLButtonElement).disabled).toBeTruthy();
});

it('should handle custom class and style', () => {
  const { container } = renderComponent({
    className: 'test-class',
    style: { height: 200 },
  });

  const sidebar = container.querySelector(
    '.iui-side-navigation.test-class',
  ) as HTMLElement;

  expect(sidebar).toBeTruthy();
  expect(sidebar.style.height).toEqual('200px');
});

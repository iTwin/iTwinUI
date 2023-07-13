/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { Tabs } from './Tabs.js';
import { SvgMore as SvgPlaceholder } from '../utils/index.js';

type TabsProps = React.ComponentProps<typeof Tabs>;

const renderComponent = (
  initialProps?: Partial<TabsProps>,
  initialChildren?: React.ReactNode,
) => {
  const defaultChildren = (
    <>
      <Tabs.TabList>
        <Tabs.Tab key={1}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 1</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={2}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 2</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={3}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 3</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.Panels>
        <Tabs.Panel>Test Content 1</Tabs.Panel>
        <Tabs.Panel>Test Content 2</Tabs.Panel>
        <Tabs.Panel>Test Content 3</Tabs.Panel>
      </Tabs.Panels>
    </>
  );
  const props: TabsProps = { ...initialProps } as TabsProps;
  const children = initialChildren ?? defaultChildren;
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
  screen.getByText('Test Content 1');
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
  const { container, queryByText } = renderComponent({
    orientation: 'vertical',
  });

  expect(
    container.querySelector('.iui-tabs-wrapper.iui-vertical'),
  ).toBeTruthy();
  expect(container.querySelector('.iui-tabs')).toBeTruthy();
  expect(container.querySelector('.iui-tab')).toBeTruthy();
  expect(queryByText('Test Content 1')).toHaveClass('iui-tabs-content');
});

it('should allow horizontal scrolling when overflowOptions useOverflow is true', () => {
  const { container } = renderComponent(
    {
      overflowOptions: { useOverflow: true },
    },
    <>
      <Tabs.TabList>
        <Tabs.Tab key={1}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 1</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={2}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 2</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={3}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 3</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={4}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 4</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={5}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 5</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={6}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 6</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={7}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 7</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={8}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 8</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={9}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 9</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.Panels>
        <Tabs.Panel>Test Content 1</Tabs.Panel>
        <Tabs.Panel>Test Content 2</Tabs.Panel>
        <Tabs.Panel>Test Content 3</Tabs.Panel>
        <Tabs.Panel>Test Content 4</Tabs.Panel>
        <Tabs.Panel>Test Content 5</Tabs.Panel>
        <Tabs.Panel>Test Content 6</Tabs.Panel>
        <Tabs.Panel>Test Content 7</Tabs.Panel>
        <Tabs.Panel>Test Content 8</Tabs.Panel>
        <Tabs.Panel>Test Content 9</Tabs.Panel>
      </Tabs.Panels>
    </>,
  );

  const tabContainer = container.querySelector('.iui-tabs') as HTMLElement;
  expect(tabContainer).toBeTruthy();
  expect(tabContainer).toHaveAttribute('data-iui-overflow', 'true');

  const tabs = container.querySelectorAll('.iui-tab');
  expect(tabs.length).toBe(9);
});

it('should allow vertical scrolling when overflowOptions useOverflow is true', () => {
  const { container } = renderComponent(
    {
      orientation: 'vertical',
      overflowOptions: { useOverflow: true },
    },
    <>
      <Tabs.TabList>
        <Tabs.Tab key={1}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 1</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={2}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 2</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={3}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 3</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={4}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 4</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={5}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 5</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={6}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 6</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={7}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 7</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={8}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 8</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={9}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Label 9</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.Panels>
        <Tabs.Panel>Test Content 1</Tabs.Panel>
        <Tabs.Panel>Test Content 2</Tabs.Panel>
        <Tabs.Panel>Test Content 3</Tabs.Panel>
        <Tabs.Panel>Test Content 4</Tabs.Panel>
        <Tabs.Panel>Test Content 5</Tabs.Panel>
        <Tabs.Panel>Test Content 6</Tabs.Panel>
        <Tabs.Panel>Test Content 7</Tabs.Panel>
        <Tabs.Panel>Test Content 8</Tabs.Panel>
        <Tabs.Panel>Test Content 9</Tabs.Panel>
      </Tabs.Panels>
    </>,
  );

  const tabContainer = container.querySelector('.iui-tabs') as HTMLElement;
  expect(tabContainer).toBeTruthy();
  expect(tabContainer).toHaveAttribute('data-iui-overflow', 'true');

  const tabs = container.querySelectorAll('.iui-tab');
  expect(tabs.length).toBe(9);
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

it('should add .iui-large if tabs have sublabel', () => {
  const { container } = renderComponent(
    {},
    <>
      <Tabs.TabList>
        <Tabs.Tab key={0}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>item0</Tabs.TabLabel>
            <Tabs.TabDescription>Sublabel0</Tabs.TabDescription>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={1}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>item1</Tabs.TabLabel>
            <Tabs.TabDescription>Sublabel1</Tabs.TabDescription>
          </Tabs.TabInfo>
        </Tabs.Tab>
        <Tabs.Tab key={2}>
          <Tabs.TabInfo>
            <Tabs.TabLabel>item2</Tabs.TabLabel>
            <Tabs.TabDescription>Sublabel2</Tabs.TabDescription>
          </Tabs.TabInfo>
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.Panels>
        <Tabs.Panel>Test Content 1</Tabs.Panel>
        <Tabs.Panel>Test Content 2</Tabs.Panel>
        <Tabs.Panel>Test Content 3</Tabs.Panel>
      </Tabs.Panels>
    </>,
  );
  expect(container.querySelector('.iui-tabs.iui-large')).toBeTruthy();

  const tabs = container.querySelectorAll('.iui-tab');
  expect(tabs.length).toBe(3);
  tabs.forEach((tab, index) => {
    const label = tab.querySelector('.iui-tab-label') as HTMLElement;
    expect(label.textContent).toEqual(`item${index}Sublabel${index}`);
  });
});

it.each(['horizontal', 'vertical'] as const)(
  'should handle keypresses',
  async (orientation) => {
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

it('should handle keypresses when focusActivationMode is manual', async () => {
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

it('should render a Tab in its most basic state', () => {
  const { container } = render(
    <Tabs>
      <Tabs.TabList>
        <Tabs.Tab>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Tab label</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
      </Tabs.TabList>
    </Tabs>,
  );
  expect(container.querySelector('button.iui-tab')).toBeTruthy();

  const label = container.querySelector('.iui-tab-label > div') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('Tab label');
});

it('should render with sublabel', () => {
  const { container } = render(
    <Tabs>
      <Tabs.TabList>
        <Tabs.Tab>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Tab label</Tabs.TabLabel>
            <Tabs.TabDescription>Sub-label</Tabs.TabDescription>
          </Tabs.TabInfo>
        </Tabs.Tab>
      </Tabs.TabList>
    </Tabs>,
  );
  expect(container.querySelector('button.iui-tab')).toBeTruthy();

  const label = container.querySelector('.iui-tab-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.firstElementChild?.textContent).toBe('Tab label');

  const sublabel = label.querySelector('.iui-tab-description') as HTMLElement;
  expect(sublabel.textContent).toEqual('Sub-label');
});

it('should render with icon', () => {
  const { container } = render(
    <Tabs>
      <Tabs.TabList>
        <Tabs.Tab>
          <Tabs.TabIcon>
            <SvgPlaceholder />
          </Tabs.TabIcon>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Tab label</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
      </Tabs.TabList>
    </Tabs>,
  );
  expect(container.querySelector('button.iui-tab')).toBeTruthy();

  const label = container.querySelector('.iui-tab-label > div') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('Tab label');

  const {
    container: { firstChild: placeholderIcon },
  } = render(<SvgPlaceholder />);
  expect(container.querySelector('.iui-tab-icon svg')).toEqual(placeholderIcon);
});

it('should render in disabled state', () => {
  const { container } = render(
    <Tabs>
      <Tabs.TabList>
        <Tabs.Tab disabled>
          <Tabs.TabInfo>
            <Tabs.TabLabel>Tab label</Tabs.TabLabel>
          </Tabs.TabInfo>
        </Tabs.Tab>
      </Tabs.TabList>
    </Tabs>,
  );

  const tab = container.querySelector('button.iui-tab') as HTMLButtonElement;
  expect(tab).toBeTruthy();
  expect(tab.disabled).toBeTruthy();

  const label = container.querySelector('.iui-tab-label > div') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('Tab label');
});

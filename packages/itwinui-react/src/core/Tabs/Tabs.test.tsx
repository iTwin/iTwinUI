/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { Tabs } from './Tabs.js';
import { SvgMore as SvgPlaceholder } from '../utils/index.js';

type TabsProps = React.ComponentProps<typeof Tabs>;
type TabsTabListProps = React.ComponentProps<typeof Tabs.TabList>;

const renderComponent = (
  initialProps?: Partial<TabsProps>,
  initialTabListProps?: Partial<TabsTabListProps>,
  initialChildren?: React.ReactNode,
) => {
  const tabListProps: TabsTabListProps = {
    ...initialTabListProps,
  } as TabsTabListProps;
  const defaultChildren = (
    <>
      <Tabs.TabList {...tabListProps}>
        <Tabs.Tab key={1} label='Label 1' />
        <Tabs.Tab key={2} label='Label 2' />
        <Tabs.Tab key={3} label='Label 3' />
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
    {},
    <>
      <Tabs.TabList>
        <Tabs.Tab key={1} label='Label 1' />
        <Tabs.Tab key={2} label='Label 2' />
        <Tabs.Tab key={3} label='Label 3' />
        <Tabs.Tab key={4} label='Label 4' />
        <Tabs.Tab key={5} label='Label 5' />
        <Tabs.Tab key={6} label='Label 6' />
        <Tabs.Tab key={7} label='Label 7' />
        <Tabs.Tab key={8} label='Label 8' />
        <Tabs.Tab key={9} label='Label 9' />
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
    {},
    <>
      <Tabs.TabList>
        <Tabs.Tab key={1} label='Label 1' />
        <Tabs.Tab key={2} label='Label 2' />
        <Tabs.Tab key={3} label='Label 3' />
        <Tabs.Tab key={4} label='Label 4' />
        <Tabs.Tab key={5} label='Label 5' />
        <Tabs.Tab key={6} label='Label 6' />
        <Tabs.Tab key={7} label='Label 7' />
        <Tabs.Tab key={8} label='Label 8' />
        <Tabs.Tab key={9} label='Label 9' />
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
  const { container } = renderComponent({}, { color: 'green' });

  const tabContainer = container.querySelector('.iui-tabs') as HTMLElement;
  expect(tabContainer).toBeTruthy();
  expect(tabContainer.className).toContain('iui-green');
});

it('should call onActiveChange when switching tabs', () => {
  const onActiveChange = jest.fn();

  const { container } = renderComponent(
    {},
    {},
    <>
      <Tabs.TabList>
        <Tabs.Tab key={0} label='Label 0' />
        <Tabs.Tab key={1} label='Label 1' />
        <Tabs.Tab onActiveChange={onActiveChange()} key={2} label='Label 2' />
      </Tabs.TabList>

      <Tabs.Panels>
        <Tabs.Panel>Test Content 1</Tabs.Panel>
        <Tabs.Panel>Test Content 2</Tabs.Panel>
        <Tabs.Panel>Test Content 3</Tabs.Panel>
      </Tabs.Panels>
    </>,
  );

  const tabs = container.querySelectorAll('.iui-tab');
  expect(tabs.length).toBe(3);
  fireEvent.click(tabs[2]);
  expect(onActiveChange).toHaveBeenCalled();
});

it('should set active tab', () => {
  const { container } = renderComponent(
    {},
    {},
    <>
      <Tabs.TabList>
        <Tabs.Tab key={0} label='Label 0' />
        <Tabs.Tab key={1} label='Label 1' />
        <Tabs.Tab isActive key={2} label='Label 2' />
      </Tabs.TabList>

      <Tabs.Panels>
        <Tabs.Panel>Test Content 1</Tabs.Panel>
        <Tabs.Panel>Test Content 2</Tabs.Panel>
        <Tabs.Panel>Test Content 3</Tabs.Panel>
      </Tabs.Panels>
    </>,
  );

  const tabs = container.querySelectorAll('.iui-tab');
  expect(tabs.length).toBe(3);
  expect(tabs[0].className).not.toContain('iui-tab iui-active');
  expect(tabs[1].className).not.toContain('iui-tab iui-active');
  expect(tabs[2].className).toContain('iui-tab iui-active');
});

it('should add .iui-large if tabs have sublabel', () => {
  const { container } = renderComponent(
    {},
    {},
    <>
      <Tabs.TabList>
        <Tabs.Tab key={0}>
          <Tabs.TabLabel>item0</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel0</Tabs.TabDescription>
        </Tabs.Tab>
        <Tabs.Tab key={1}>
          <Tabs.TabLabel>item1</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel1</Tabs.TabDescription>
        </Tabs.Tab>
        <Tabs.Tab key={2}>
          <Tabs.TabLabel>item2</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel2</Tabs.TabDescription>
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
    expect(label.textContent).toEqual(`item${index}`);
    const description = tab.querySelector(
      '.iui-tab-description',
    ) as HTMLElement;
    expect(description.textContent).toEqual(`Sublabel${index}`);
  });
});

it.each(['horizontal', 'vertical'] as const)(
  'should handle keypresses',
  async (orientation) => {
    const mockOnActiveChange0 = jest.fn();
    const mockOnActiveChange1 = jest.fn();
    const mockOnActiveChange2 = jest.fn();

    const { container } = renderComponent(
      { orientation: orientation },
      {},
      <>
        <Tabs.TabList>
          <Tabs.Tab
            isActive
            onActiveChange={mockOnActiveChange0}
            key={0}
            label='Label 0'
          />
          <Tabs.Tab
            onActiveChange={mockOnActiveChange1}
            key={1}
            label='Label 1'
          />
          <Tabs.Tab
            onActiveChange={mockOnActiveChange2}
            key={2}
            label='Label 2'
          />
        </Tabs.TabList>

        <Tabs.Panels>
          <Tabs.Panel>Test Content 1</Tabs.Panel>
          <Tabs.Panel>Test Content 2</Tabs.Panel>
          <Tabs.Panel>Test Content 3</Tabs.Panel>
        </Tabs.Panels>
      </>,
    );

    const nextTabKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
    const previousTabKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';

    const tablist = container.querySelector('.iui-tabs') as HTMLElement;
    const tabs = Array.from(tablist.querySelectorAll('.iui-tab'));

    // alt key
    fireEvent.keyDown(tabs[0], { key: nextTabKey, altKey: true });
    expect(mockOnActiveChange0).not.toHaveBeenCalled();

    // 0 -> 1
    fireEvent.keyDown(tabs[0], { key: nextTabKey });
    expect(mockOnActiveChange1).toBeCalled();
    expect(document.activeElement).toBe(tabs[1]);

    // 1 -> 2
    fireEvent.keyDown(tabs[1], { key: nextTabKey });
    expect(mockOnActiveChange2).toBeCalled();
    expect(document.activeElement).toBe(tabs[2]);

    // 2 -> 0
    fireEvent.keyDown(tabs[2], { key: nextTabKey });
    expect(mockOnActiveChange0).toBeCalled();
    expect(document.activeElement).toBe(tabs[0]);

    // 0 -> 2
    fireEvent.keyDown(tabs[0], { key: previousTabKey });
    expect(mockOnActiveChange2).toBeCalled();
    expect(document.activeElement).toBe(tabs[2]);

    // 2 -> 1
    fireEvent.keyDown(tabs[2], { key: previousTabKey });
    expect(mockOnActiveChange1).toBeCalled();
    expect(document.activeElement).toBe(tabs[1]);
  },
);

it('should handle keypresses when focusActivationMode is manual', async () => {
  const mockOnActiveChange0 = jest.fn();
  const mockOnActiveChange1 = jest.fn();

  const { container } = renderComponent(
    {},
    {},
    <>
      <Tabs.TabList focusActivationMode='manual'>
        <Tabs.Tab
          onActiveChange={mockOnActiveChange0}
          isActive
          key={0}
          label='Label 0'
        />
        <Tabs.Tab
          onActiveChange={mockOnActiveChange1}
          key={1}
          label='Label 1'
        />
        <Tabs.Tab key={2} label='Label 2' />
      </Tabs.TabList>

      <Tabs.Panels>
        <Tabs.Panel>Test Content 1</Tabs.Panel>
        <Tabs.Panel>Test Content 2</Tabs.Panel>
        <Tabs.Panel>Test Content 3</Tabs.Panel>
      </Tabs.Panels>
    </>,
  );

  const tablist = container.querySelector('.iui-tabs') as HTMLElement;
  const tabs = Array.from(tablist.querySelectorAll('.iui-tab'));

  // 0 -> 1
  fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
  expect(mockOnActiveChange1).not.toBeCalled();
  expect(document.activeElement).toBe(tabs[1]);

  // select 1
  fireEvent.keyDown(tabs[1], { key: 'Enter' });
  expect(mockOnActiveChange1).toBeCalled();

  // 1 -> 0
  fireEvent.keyDown(tabs[1], { key: 'ArrowLeft' });
  expect(mockOnActiveChange0).not.toBeCalled();
  expect(document.activeElement).toBe(tabs[0]);

  // select 0
  fireEvent.keyDown(tabs[0], { key: ' ' });
  expect(mockOnActiveChange0).toBeCalled();
});

it('should set focused index when tab is clicked', () => {
  const { container } = renderComponent();

  const tablist = container.querySelector('.iui-tabs') as HTMLElement;
  const tabs = Array.from(tablist.querySelectorAll('.iui-tab'));

  // click 1
  fireEvent.click(tabs[1]);
  expect(document.activeElement).toBe(tabs[1]);

  // 1 -> 2
  fireEvent.keyDown(tabs[1], { key: 'ArrowRight' });
  expect(document.activeElement).toBe(tabs[2]);
});

it('should render a Tab in its most basic state', () => {
  const { container } = render(
    <Tabs>
      <Tabs.TabList>
        <Tabs.Tab label='Tab label' />
      </Tabs.TabList>
    </Tabs>,
  );
  expect(container.querySelector('button.iui-tab')).toBeTruthy();

  const label = container.querySelector('.iui-tab-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('Tab label');
});

it('should render with sublabel', () => {
  const { container } = render(
    <Tabs>
      <Tabs.TabList>
        <Tabs.Tab>
          <Tabs.TabLabel>Tab label</Tabs.TabLabel>
          <Tabs.TabDescription>Sub-label</Tabs.TabDescription>
        </Tabs.Tab>
      </Tabs.TabList>
    </Tabs>,
  );
  expect(container.querySelector('button.iui-tab')).toBeTruthy();

  const label = container.querySelector('.iui-tab-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('Tab label');

  const description = container.querySelector(
    '.iui-tab-description',
  ) as HTMLElement;
  expect(description.textContent).toBe('Sub-label');
});

it('should render with icon', () => {
  const { container } = render(
    <Tabs>
      <Tabs.TabList>
        <Tabs.Tab>
          <Tabs.TabIcon>
            <SvgPlaceholder />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Tab label</Tabs.TabLabel>
        </Tabs.Tab>
      </Tabs.TabList>
    </Tabs>,
  );
  expect(container.querySelector('button.iui-tab')).toBeTruthy();

  const label = container.querySelector('.iui-tab-label') as HTMLElement;
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
        <Tabs.Tab disabled label='Tab label' />
      </Tabs.TabList>
    </Tabs>,
  );

  const tab = container.querySelector('button.iui-tab') as HTMLButtonElement;
  expect(tab).toBeTruthy();
  expect(tab.disabled).toBeTruthy();

  const label = container.querySelector('.iui-tab-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('Tab label');
});

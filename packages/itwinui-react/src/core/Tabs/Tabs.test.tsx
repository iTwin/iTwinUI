/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { Tabs, Tab } from './Tabs.js';
import { SvgMore as SvgPlaceholder } from '../../utils/index.js';
import { userEvent } from '@testing-library/user-event';
import { Button } from '../Buttons/Button.js';

type TabsProps = React.ComponentProps<typeof Tabs.Wrapper>;
type TabListProps = React.ComponentProps<typeof Tabs.TabList>;

const renderComponent = (
  initialProps?: Partial<TabsProps>,
  initialTabListProps?: Partial<TabListProps>,
  initialChildren?: React.ReactNode,
) => {
  const tabListProps: TabListProps = {
    ...initialTabListProps,
  } as TabListProps;
  const defaultChildren = (
    <>
      <Tabs.TabList {...tabListProps}>
        <Tabs.Tab value={'tab1'} key={1} label='Label 1' />
        <Tabs.Tab value={'tab2'} key={2} label='Label 2' />
        <Tabs.Tab value={'tab3'} key={3} label='Label 3' />
      </Tabs.TabList>

      <Tabs.Panel value={'tab1'}>Test Content 1</Tabs.Panel>
      <Tabs.Panel value={'tab2'}>Test Content 2</Tabs.Panel>
      <Tabs.Panel value={'tab3'}>Test Content 3</Tabs.Panel>
    </>
  );
  const props: TabsProps = { ...initialProps } as TabsProps;
  const children = initialChildren ?? defaultChildren;
  return render(<Tabs.Wrapper {...props}>{children}</Tabs.Wrapper>);
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
    {},
    {},
    <>
      <Tabs.TabList>
        <Tabs.Tab value='tab1' key={1} label='Label 1' />
        <Tabs.Tab value='tab2' key={2} label='Label 2' />
        <Tabs.Tab value='tab3' key={3} label='Label 3' />
        <Tabs.Tab value='tab4' key={4} label='Label 4' />
        <Tabs.Tab value='tab5' key={5} label='Label 5' />
        <Tabs.Tab value='tab6' key={6} label='Label 6' />
        <Tabs.Tab value='tab7' key={7} label='Label 7' />
        <Tabs.Tab value='tab8' key={8} label='Label 8' />
        <Tabs.Tab value='tab9' key={9} label='Label 9' />
      </Tabs.TabList>

      <Tabs.Panel value='tab1'>Test Content 1</Tabs.Panel>
      <Tabs.Panel value='tab2'>Test Content 2</Tabs.Panel>
      <Tabs.Panel value='tab3'>Test Content 3</Tabs.Panel>
      <Tabs.Panel value='tab4'>Test Content 4</Tabs.Panel>
      <Tabs.Panel value='tab5'>Test Content 5</Tabs.Panel>
      <Tabs.Panel value='tab6'>Test Content 6</Tabs.Panel>
      <Tabs.Panel value='tab7'>Test Content 7</Tabs.Panel>
      <Tabs.Panel value='tab8'>Test Content 8</Tabs.Panel>
      <Tabs.Panel value='tab9'>Test Content 9</Tabs.Panel>
    </>,
  );

  const tabContainer = container.querySelector('.iui-tabs') as HTMLElement;
  expect(tabContainer).toBeTruthy();

  const tabs = container.querySelectorAll('.iui-tab');
  expect(tabs.length).toBe(9);
});

it('should allow vertical scrolling when overflowOptions useOverflow is true', () => {
  const { container } = renderComponent(
    {
      orientation: 'vertical',
    },
    {},
    <>
      <Tabs.TabList>
        <Tabs.Tab value='tab1' key={1} label='Label 1' />
        <Tabs.Tab value='tab2' key={2} label='Label 2' />
        <Tabs.Tab value='tab3' key={3} label='Label 3' />
        <Tabs.Tab value='tab4' key={4} label='Label 4' />
        <Tabs.Tab value='tab5' key={5} label='Label 5' />
        <Tabs.Tab value='tab6' key={6} label='Label 6' />
        <Tabs.Tab value='tab7' key={7} label='Label 7' />
        <Tabs.Tab value='tab8' key={8} label='Label 8' />
        <Tabs.Tab value='tab9' key={9} label='Label 9' />
      </Tabs.TabList>

      <Tabs.Panel value='tab1'>Test Content 1</Tabs.Panel>
      <Tabs.Panel value='tab2'>Test Content 2</Tabs.Panel>
      <Tabs.Panel value='tab3'>Test Content 3</Tabs.Panel>
      <Tabs.Panel value='tab4'>Test Content 4</Tabs.Panel>
      <Tabs.Panel value='tab5'>Test Content 5</Tabs.Panel>
      <Tabs.Panel value='tab6'>Test Content 6</Tabs.Panel>
      <Tabs.Panel value='tab7'>Test Content 7</Tabs.Panel>
      <Tabs.Panel value='tab8'>Test Content 8</Tabs.Panel>
      <Tabs.Panel value='tab9'>Test Content 9</Tabs.Panel>
    </>,
  );

  const tabContainer = container.querySelector('.iui-tabs') as HTMLElement;
  expect(tabContainer).toBeTruthy();

  const tabs = container.querySelectorAll('.iui-tab');
  expect(tabs.length).toBe(9);
});

it('should render green tabs', () => {
  const { container } = renderComponent({ color: 'green' }, {});

  const tabContainer = container.querySelector('.iui-tabs') as HTMLElement;
  expect(tabContainer).toBeTruthy();
  expect(tabContainer.className).toContain('iui-green');
});

it('should call onValueChange when switching tabs', () => {
  const onActivated = vi.fn();

  const { container } = renderComponent(
    { onValueChange: onActivated },
    {},
    <>
      <Tabs.TabList>
        <Tabs.Tab value='tab0' key={0} label='Label 0' />
        <Tabs.Tab value='tab1' key={1} label='Label 1' />
        <Tabs.Tab value='tab2' key={2} label='Label 2' />
      </Tabs.TabList>

      <Tabs.Panel value='tab0'>Test Content 0</Tabs.Panel>
      <Tabs.Panel value='tab1'>Test Content 1</Tabs.Panel>
      <Tabs.Panel value='tab2'>Test Content 2</Tabs.Panel>
    </>,
  );

  const tabs = container.querySelectorAll('.iui-tab');
  expect(tabs.length).toBe(3);
  fireEvent.click(tabs[2]);
  expect(onActivated).toHaveBeenCalled();
});

it('should set active tab', () => {
  const { container } = renderComponent(
    { value: 'tab2' },
    {},
    <>
      <Tabs.TabList>
        <Tabs.Tab value='tab0' key={0} label='Label 0' />
        <Tabs.Tab value='tab1' key={1} label='Label 1' />
        <Tabs.Tab value='tab2' key={2} label='Label 2' />
      </Tabs.TabList>

      <Tabs.Panel value='tab0'>Test Content 0</Tabs.Panel>
      <Tabs.Panel value='tab1'>Test Content 1</Tabs.Panel>
      <Tabs.Panel value='tab2'>Test Content 2</Tabs.Panel>
    </>,
  );

  const tabs = container.querySelectorAll('.iui-tab');
  expect(tabs.length).toBe(3);
  expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
  expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
  expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
});

it('should add .iui-large if tabs have sublabel', () => {
  const { container } = renderComponent(
    {},
    {},
    <>
      <Tabs.TabList>
        <Tabs.Tab value='tab0' key={0}>
          <Tabs.TabLabel>item0</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel0</Tabs.TabDescription>
        </Tabs.Tab>
        <Tabs.Tab value='tab1' key={1}>
          <Tabs.TabLabel>item1</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel1</Tabs.TabDescription>
        </Tabs.Tab>
        <Tabs.Tab value='tab2' key={2}>
          <Tabs.TabLabel>item2</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel2</Tabs.TabDescription>
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.Panel value='tab0'>Test Content 0</Tabs.Panel>
      <Tabs.Panel value='tab1'>Test Content 1</Tabs.Panel>
      <Tabs.Panel value='tab2'>Test Content 2</Tabs.Panel>
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
  'should handle keypresses (orientation=%s)',
  async (orientation) => {
    const mockonActivated = vi.fn();

    const { container } = renderComponent(
      {
        orientation: orientation,
        onValueChange: mockonActivated,
      },
      {},
      <>
        <Tabs.TabList>
          <Tabs.Tab value='tab0' key={0} label='Label 0' />
          <Tabs.Tab value='tab1' key={1} label='Label 1' />
          <Tabs.Tab value='tab2' key={2} label='Label 2' />
        </Tabs.TabList>

        <Tabs.Panel value='tab0'>Test Content 0</Tabs.Panel>
        <Tabs.Panel value='tab1'>Test Content 1</Tabs.Panel>
        <Tabs.Panel value='tab2'>Test Content 2</Tabs.Panel>
      </>,
    );

    const nextTabKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
    const previousTabKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';

    const tablist = container.querySelector('.iui-tabs') as HTMLElement;
    const tabs = Array.from(tablist.querySelectorAll('.iui-tab'));

    // alt key
    expect(mockonActivated).toBeCalledTimes(1); // Always one call when in uncontrolled mode
    expect(mockonActivated).toBeCalledWith('tab0');
    fireEvent.keyDown(tabs[0], { key: nextTabKey, altKey: true });
    expect(mockonActivated).toBeCalledTimes(1);

    // 0 -> 1
    fireEvent.keyDown(tabs[0], { key: nextTabKey });
    expect(mockonActivated).toBeCalledTimes(2);
    expect(mockonActivated).toBeCalledWith('tab1');
    expect(document.activeElement).toBe(tabs[1]);

    // 1 -> 2
    fireEvent.keyDown(tabs[1], { key: nextTabKey });
    expect(mockonActivated).toBeCalledTimes(3);
    expect(mockonActivated).toBeCalledWith('tab2');
    expect(document.activeElement).toBe(tabs[2]);

    // 2 -> 0
    fireEvent.keyDown(tabs[2], { key: nextTabKey });
    expect(mockonActivated).toBeCalledTimes(4);
    expect(mockonActivated).toBeCalledWith('tab0');
    expect(document.activeElement).toBe(tabs[0]);

    // 0 -> 2
    fireEvent.keyDown(tabs[0], { key: previousTabKey });
    expect(mockonActivated).toBeCalledTimes(5);
    expect(mockonActivated).toBeCalledWith('tab2');
    expect(document.activeElement).toBe(tabs[2]);

    // 2 -> 1
    fireEvent.keyDown(tabs[2], { key: previousTabKey });
    expect(mockonActivated).toBeCalledTimes(6);
    expect(mockonActivated).toBeCalledWith('tab1');
    expect(document.activeElement).toBe(tabs[1]);
  },
);

it('should handle keypresses when focusActivationMode is manual', async () => {
  const mockonActivated = vi.fn();

  const { container } = renderComponent(
    {
      focusActivationMode: 'manual',
      onValueChange: mockonActivated,
      defaultValue: 'tab0',
    },
    {},
    <>
      <Tabs.TabList>
        <Tabs.Tab value='tab0' key={0} label='Label 0' />
        <Tabs.Tab value='tab1' key={1} label='Label 1' />
        <Tabs.Tab value='tab2' key={2} label='Label 2' />
      </Tabs.TabList>

      <Tabs.Panel value='tab0'>Test Content 0</Tabs.Panel>
      <Tabs.Panel value='tab1'>Test Content 1</Tabs.Panel>
      <Tabs.Panel value='tab2'>Test Content 2</Tabs.Panel>
    </>,
  );

  const tablist = container.querySelector('.iui-tabs') as HTMLElement;
  const tabs = Array.from(tablist.querySelectorAll('.iui-tab'));

  // 0 -> 1
  fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
  expect(mockonActivated).not.toBeCalled();
  expect(document.activeElement).toBe(tabs[1]);

  // select 1
  await userEvent.keyboard('{enter}');
  expect(mockonActivated).toBeCalledWith('tab1');

  // 1 -> 0
  fireEvent.keyDown(tabs[1], { key: 'ArrowLeft' });
  expect(mockonActivated).not.toBeCalledTimes(2);
  expect(document.activeElement).toBe(tabs[0]);

  // select 0
  await userEvent.keyboard('{enter}');
  expect(mockonActivated).toBeCalledWith('tab0');
});

it('should set focused index when tab is clicked', () => {
  const { container } = renderComponent();

  const tablist = container.querySelector('.iui-tabs') as HTMLElement;
  const tabs = Array.from(tablist.querySelectorAll('.iui-tab'));

  // click 1
  fireEvent.click(tabs[1]);
  expect(tabs[1]).toHaveAttribute('aria-selected', 'true');

  // 1 -> 2
  fireEvent.keyDown(tabs[1], { key: 'ArrowRight' });
  expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
});

it('should render a Tab in its most basic state', () => {
  const { container } = render(
    <Tabs.Wrapper>
      <Tabs.TabList>
        <Tabs.Tab value='tab' label='Tab label' />
        <Tabs.Tab value='tab2' label='Tab label 2' />
      </Tabs.TabList>
    </Tabs.Wrapper>,
  );

  const tabs = container.querySelectorAll('button.iui-tab');
  expect(tabs.length).toBe(2);
  expect(tabs[0]).toBeTruthy();

  const label = tabs[0].querySelector('.iui-tab-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('Tab label');
});

it('should render with sublabel', () => {
  const { container } = render(
    <Tabs.Wrapper>
      <Tabs.TabList>
        <Tabs.Tab value='tab'>
          <Tabs.TabLabel>Tab label</Tabs.TabLabel>
          <Tabs.TabDescription>Sub-label</Tabs.TabDescription>
        </Tabs.Tab>
        <Tabs.Tab value='tab2'>
          <Tabs.TabLabel>Tab label 2</Tabs.TabLabel>
          <Tabs.TabDescription>Sub-label 2</Tabs.TabDescription>
        </Tabs.Tab>
      </Tabs.TabList>
    </Tabs.Wrapper>,
  );
  const tabs = container.querySelectorAll('button.iui-tab');
  expect(tabs.length).toBe(2);
  expect(tabs[0]).toBeTruthy();

  const label = tabs[0].querySelector('.iui-tab-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('Tab label');

  const description = tabs[0].querySelector(
    '.iui-tab-description',
  ) as HTMLElement;
  expect(description.textContent).toBe('Sub-label');
});

it('should render with icon', () => {
  const { container } = render(
    <Tabs.Wrapper>
      <Tabs.TabList>
        <Tabs.Tab value='tab'>
          <Tabs.TabIcon>
            <SvgPlaceholder />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Tab label</Tabs.TabLabel>
        </Tabs.Tab>
        <Tabs.Tab value='tab2'>
          <Tabs.TabIcon>
            <SvgPlaceholder />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Tab label 2</Tabs.TabLabel>
        </Tabs.Tab>
      </Tabs.TabList>
    </Tabs.Wrapper>,
  );
  const tabs = container.querySelectorAll('button.iui-tab');
  expect(tabs.length).toBe(2);
  expect(tabs[0]).toBeTruthy();

  const label = tabs[0].querySelector('.iui-tab-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('Tab label');

  const {
    container: { firstChild: placeholderIcon },
  } = render(<SvgPlaceholder />);
  expect(tabs[0].querySelector('.iui-tab-icon svg')).toEqual(placeholderIcon);
});

it('should render in disabled state', () => {
  const { container } = render(
    <Tabs.Wrapper>
      <Tabs.TabList>
        <Tabs.Tab value='tab' disabled label='Tab label' />
        <Tabs.Tab value='tab2' disabled label='Tab label 2' />
      </Tabs.TabList>
    </Tabs.Wrapper>,
  );
  const tabs = container.querySelectorAll('button.iui-tab');
  expect(tabs.length).toBe(2);
  expect(tabs[0]).toBeTruthy();

  const tab = tabs[0] as HTMLButtonElement;
  expect(tab).toBeTruthy();
  expect(tab).toHaveAttribute('aria-disabled', 'true');

  const label = tab.querySelector('.iui-tab-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('Tab label');
});

it('should support Tabs with legacy api', () => {
  const { container } = render(
    <Tabs
      labels={[
        <Tab key='tab1' label='Label 1' />,
        <Tab key='tab2' label='Label 2' />,
        <Tab key='tab3' label='Label 3' />,
      ]}
      actions={[
        <Button key='action-button' size='small'>
          Test Button
        </Button>,
      ]}
    >
      Test Content 1
    </Tabs>,
  );

  const tabContainer = container.querySelector('.iui-tabs') as HTMLElement;
  expect(tabContainer).toBeTruthy();
  expect(tabContainer).toHaveClass('iui-default');
  expect(tabContainer.querySelectorAll('.iui-tab').length).toBe(3);
  screen.getByText('Test Content 1');
});

it('should show the stripe in the correct position', () => {
  // TabsList
  Object.defineProperty(HTMLDivElement.prototype, 'getBoundingClientRect', {
    value: () => ({
      width: 600.23,
      height: 40,
      x: 400.34,
      y: 0,
    }),
  });
  // First Tab
  Object.defineProperty(HTMLButtonElement.prototype, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({
      width: 200.47,
      height: 40,
      x: 400.34,
      y: 0,
    }),
  });

  const { container } = render(
    <Tabs.Wrapper type='pill'>
      <Tabs.TabList>
        <Tabs.Tab value='tab1' label='Tab 1' />
        <Tabs.Tab value='tab2' label='Tab 2' />
        <Tabs.Tab value='tab3' label='Tab 3' />
      </Tabs.TabList>
    </Tabs.Wrapper>,
  );

  const tabsWrapper = container.querySelector(
    '.iui-tabs-wrapper.iui-horizontal',
  ) as HTMLElement;

  // The values should be exact and not rounded
  expect(tabsWrapper).toHaveStyle('--iui-tabs-stripe-size: 200.47px;');
  expect(tabsWrapper).toHaveStyle('--iui-tabs-stripe-position: 0px;');

  const tabs = container.querySelectorAll('.iui-tab');
  const lastTab = tabs[tabs.length - 1];

  // Last Tab
  Object.defineProperty(HTMLButtonElement.prototype, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({
      width: 200.47,
      height: 40,
      x: 1000.38,
      y: 0,
    }),
  });

  act(() => {
    fireEvent.click(lastTab);
  });

  // The values should be exact and not rounded
  expect(tabsWrapper).toHaveStyle('--iui-tabs-stripe-size: 200.47px;');
  expect(tabsWrapper).toHaveStyle('--iui-tabs-stripe-position: 600.04px;'); // 600.04 = 1000.38 - 400.34
});

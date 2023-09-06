/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable react/jsx-key */
import SvgStar from '@itwin/itwinui-icons-react/cjs/icons/Star';
import { Meta, Story } from '@storybook/react/';
import React from 'react';
import { Button, NewTabs } from '@itwin/itwinui-react';

type TabsProps = React.ComponentProps<typeof NewTabs>;

export default {
  title: 'Core/Tabs',
  component: NewTabs,
  args: {
    focusActivationMode: 'auto',
    color: 'blue',
    orientation: 'horizontal',
  },
  argTypes: {
    children: { control: { disable: true } },
    style: { control: { disable: true } },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
} as Meta<TabsProps>;

export const DefaultTabs: Story<Partial<TabsProps>> = (args) => {
  return (
    <NewTabs.Wrapper {...args}>
      <NewTabs.TabList>
        <NewTabs.Tab label='Item1' value='tab1' />
        <NewTabs.Tab label='Item2' value='tab2' />
        <NewTabs.Tab label='Item3' value='tab3' />
      </NewTabs.TabList>

      <NewTabs.ActionsWrapper>
        <NewTabs.Actions>
          <Button key={'Small'} size={'small'}>
            Small size button
          </Button>
          <Button key={'Normal'}>Normal size button</Button>
        </NewTabs.Actions>
      </NewTabs.ActionsWrapper>

      <NewTabs.Panel value='tab1'>
        Bentley Systems, Incorporated, is an American-based software development
        company that develops, manufactures, licenses, sells and supports
        computer software and services for the design, construction, and
        operation of infrastructure. The company&apos;s software serves the
        building, plant, civil, and geospatial markets in the areas of
        architecture, engineering, construction (AEC) and operations. Their
        software products are used to design, engineer, build, and operate large
        constructed assets such as roadways, railways, bridges, buildings,
        industrial plants, power plants, and utility networks. The company
        re-invests 20% of their revenues in research and development.
      </NewTabs.Panel>
      <NewTabs.Panel value='tab2'>
        Bentley Systems is headquartered in Exton, Pennsylvania, United States,
        but has development, sales and other departments in over 50 countries.
        The company had revenues of $700 million in 2018.
      </NewTabs.Panel>
      <NewTabs.Panel value='tab3'>
        Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.
        They introduced the commercial version of PseudoStation in 1985, which
        allowed users of Intergraphs VAX systems to use low-cost graphics
        terminals to view and modify the designs on their Intergraph IGDS
        (Interactive Graphics Design System) installations. Their first product
        was shown to potential users who were polled as to what they would be
        willing to pay for it. They averaged the answers, arriving at a price of
        $7,943. A DOS-based version of MicroStation was introduced in 1986.
      </NewTabs.Panel>
    </NewTabs.Wrapper>
  );
};
DefaultTabs.args = {
  type: 'default',
};

export const BorderlessTabs: Story<Partial<TabsProps>> = (args) => {
  return (
    <NewTabs.Wrapper type='borderless' {...args}>
      <NewTabs.TabList>
        <NewTabs.Tab value='item1' label='Item1' />
        <NewTabs.Tab value='item2' label='Item2' />
        <NewTabs.Tab value='item3' label='Item3' />
      </NewTabs.TabList>

      <NewTabs.ActionsWrapper>
        <NewTabs.Actions>
          <Button key={'Small'} size={'small'}>
            Small size button
          </Button>
          <Button key={'Normal'}>Normal size button</Button>
        </NewTabs.Actions>
      </NewTabs.ActionsWrapper>

      <NewTabs.Panel value='item1'>
        Bentley Systems, Incorporated, is an American-based software development
        company that develops, manufactures, licenses, sells and supports
        computer software and services for the design, construction, and
        operation of infrastructure. The company&apos;s software serves the
        building, plant, civil, and geospatial markets in the areas of
        architecture, engineering, construction (AEC) and operations. Their
        software products are used to design, engineer, build, and operate large
        constructed assets such as roadways, railways, bridges, buildings,
        industrial plants, power plants, and utility networks. The company
        re-invests 20% of their revenues in research and development.
      </NewTabs.Panel>
      <NewTabs.Panel value='item2'>
        Bentley Systems is headquartered in Exton, Pennsylvania, United States,
        but has development, sales and other departments in over 50 countries.
        The company had revenues of $700 million in 2018.
      </NewTabs.Panel>
      <NewTabs.Panel value='item3'>
        Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.
        They introduced the commercial version of PseudoStation in 1985, which
        allowed users of Intergraphs VAX systems to use low-cost graphics
        terminals to view and modify the designs on their Intergraph IGDS
        (Interactive Graphics Design System) installations. Their first product
        was shown to potential users who were polled as to what they would be
        willing to pay for it. They averaged the answers, arriving at a price of
        $7,943. A DOS-based version of MicroStation was introduced in 1986.
      </NewTabs.Panel>
    </NewTabs.Wrapper>
  );
};
BorderlessTabs.args = {
  type: 'borderless',
};

export const PillTabs: Story<Partial<TabsProps>> = (args) => {
  return (
    <NewTabs.Wrapper type='pill' {...args}>
      <NewTabs.TabList>
        <NewTabs.Tab value='item1'>
          <NewTabs.TabIcon>
            <SvgStar />
          </NewTabs.TabIcon>
        </NewTabs.Tab>

        <NewTabs.Tab value='item2'>
          <NewTabs.TabIcon>
            <SvgStar />
          </NewTabs.TabIcon>
        </NewTabs.Tab>

        <NewTabs.Tab value='item3'>
          <NewTabs.TabIcon>
            <SvgStar />
          </NewTabs.TabIcon>
        </NewTabs.Tab>
      </NewTabs.TabList>

      <NewTabs.Panel value='item1'>
        Bentley Systems, Incorporated, is an American-based software development
        company that develops, manufactures, licenses, sells and supports
        computer software and services for the design, construction, and
        operation of infrastructure. The company&apos;s software serves the
        building, plant, civil, and geospatial markets in the areas of
        architecture, engineering, construction (AEC) and operations. Their
        software products are used to design, engineer, build, and operate large
        constructed assets such as roadways, railways, bridges, buildings,
        industrial plants, power plants, and utility networks. The company
        re-invests 20% of their revenues in research and development.
      </NewTabs.Panel>
      <NewTabs.Panel value='item2'>
        Bentley Systems is headquartered in Exton, Pennsylvania, United States,
        but has development, sales and other departments in over 50 countries.
        The company had revenues of $700 million in 2018.
      </NewTabs.Panel>
      <NewTabs.Panel value='item3'>
        Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.
        They introduced the commercial version of PseudoStation in 1985, which
        allowed users of Intergraphs VAX systems to use low-cost graphics
        terminals to view and modify the designs on their Intergraph IGDS
        (Interactive Graphics Design System) installations. Their first product
        was shown to potential users who were polled as to what they would be
        willing to pay for it. They averaged the answers, arriving at a price of
        $7,943. A DOS-based version of MicroStation was introduced in 1986.
      </NewTabs.Panel>
    </NewTabs.Wrapper>
  );
};
PillTabs.args = {
  type: 'pill',
};
PillTabs.argTypes = {
  orientation: { control: { disable: true } },
};

export const SublabelsAndIcons: Story<Partial<TabsProps>> = (args) => {
  return (
    <NewTabs.Wrapper type='borderless' {...args}>
      <NewTabs.TabList>
        <NewTabs.Tab value='item0'>
          <NewTabs.TabIcon>
            <SvgStar />
          </NewTabs.TabIcon>
          <NewTabs.TabLabel>Item0</NewTabs.TabLabel>
          <NewTabs.TabDescription>Sublabel 0</NewTabs.TabDescription>
        </NewTabs.Tab>

        <NewTabs.Tab value='item1'>
          <NewTabs.TabIcon>
            <SvgStar />
          </NewTabs.TabIcon>
          <NewTabs.TabLabel>Item1</NewTabs.TabLabel>
          <NewTabs.TabDescription>Sublabel 1</NewTabs.TabDescription>
        </NewTabs.Tab>

        <NewTabs.Tab value='item2' disabled>
          <NewTabs.TabIcon>
            <SvgStar />
          </NewTabs.TabIcon>
          <NewTabs.TabLabel>Item2</NewTabs.TabLabel>
          <NewTabs.TabDescription>Sublabel 2</NewTabs.TabDescription>
        </NewTabs.Tab>
      </NewTabs.TabList>

      <NewTabs.ActionsWrapper>
        <NewTabs.Actions>
          <Button key={'Small'} size={'small'}>
            Small size button
          </Button>
          <Button key={'Normal'}>Normal size button</Button>
        </NewTabs.Actions>
      </NewTabs.ActionsWrapper>

      <NewTabs.Panel value='item0'>
        Bentley Systems, Incorporated, is an American-based software development
        company that develops, manufactures, licenses, sells and supports
        computer software and services for the design, construction, and
        operation of infrastructure. The company&apos;s software serves the
        building, plant, civil, and geospatial markets in the areas of
        architecture, engineering, construction (AEC) and operations. Their
        software products are used to design, engineer, build, and operate large
        constructed assets such as roadways, railways, bridges, buildings,
        industrial plants, power plants, and utility networks. The company
        re-invests 20% of their revenues in research and development.
      </NewTabs.Panel>
      <NewTabs.Panel value='item1'>
        Bentley Systems is headquartered in Exton, Pennsylvania, United States,
        but has development, sales and other departments in over 50 countries.
        The company had revenues of $700 million in 2018.
      </NewTabs.Panel>
      <NewTabs.Panel value='item2'>
        Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.
        They introduced the commercial version of PseudoStation in 1985, which
        allowed users of Intergraphs VAX systems to use low-cost graphics
        terminals to view and modify the designs on their Intergraph IGDS
        (Interactive Graphics Design System) installations. Their first product
        was shown to potential users who were polled as to what they would be
        willing to pay for it. They averaged the answers, arriving at a price of
        $7,943. A DOS-based version of MicroStation was introduced in 1986.
      </NewTabs.Panel>
    </NewTabs.Wrapper>
  );
};
SublabelsAndIcons.args = {
  type: 'borderless',
};

export const HorizontalOverflow: Story<Partial<TabsProps>> = (args) => {
  const [active, setActive] = React.useState('Item 11');

  const tabData = [
    { name: 'Item 1', disabled: false },
    { name: 'Item 2', disabled: false },
    { name: 'Item 3', disabled: false },
    { name: 'Item 4', disabled: false },
    { name: 'Item 5', disabled: false },
    { name: 'Item 6', disabled: true },
    { name: 'Item 7', disabled: false },
    { name: 'Item 8', disabled: false },
    { name: 'Item 9', disabled: true },
    { name: 'Item 10', disabled: false },
    { name: 'Item 11', disabled: false },
    { name: 'Item 12', disabled: false },
    { name: 'Very long item number thirteen', disabled: false },
  ];

  return (
    <div
      style={{
        width: '50%',
        maxWidth: 800,
        minWidth: 250,
        border: '1px solid lightpink',
        padding: 8,
      }}
    >
      <NewTabs.Wrapper overflowOptions={{ useOverflow: true }} {...args}>
        <NewTabs.TabList>
          {tabData?.map((item, index) => {
            return (
              <NewTabs.Tab
                value={`tab${index + 1}`}
                isActive={item.name === active}
                disabled={item.disabled}
                label={item.name}
                onActivated={() => {
                  setActive(item.name);
                }}
              />
            );
          })}
        </NewTabs.TabList>

        <NewTabs.ActionsWrapper>
          <NewTabs.Actions>
            <Button key={'button'}>Button</Button>
          </NewTabs.Actions>
        </NewTabs.ActionsWrapper>

        <NewTabs.Panel value='tab1'>Tab Content One</NewTabs.Panel>
        <NewTabs.Panel value='tab2'>Tab Content Two</NewTabs.Panel>
        <NewTabs.Panel value='tab3'>Tab Content Three</NewTabs.Panel>
        <NewTabs.Panel value='tab4'>Tab Content Four</NewTabs.Panel>
        <NewTabs.Panel value='tab5'>Tab Content Five</NewTabs.Panel>
        <NewTabs.Panel value='tab6'>Tab Content Six</NewTabs.Panel>
        <NewTabs.Panel value='tab7'>Tab Content Seven</NewTabs.Panel>
        <NewTabs.Panel value='tab8'>Tab Content Eight</NewTabs.Panel>
        <NewTabs.Panel value='tab9'>Tab Content Nine</NewTabs.Panel>
        <NewTabs.Panel value='tab10'>Tab Content Ten</NewTabs.Panel>
        <NewTabs.Panel value='tab11'>Tab Content Eleven</NewTabs.Panel>
        <NewTabs.Panel value='tab12'>Tab Content Twelve</NewTabs.Panel>
        <NewTabs.Panel value='tab13'>Tab Content Thirteen</NewTabs.Panel>
      </NewTabs.Wrapper>
    </div>
  );
};
HorizontalOverflow.args = {
  type: 'default',
};
HorizontalOverflow.argTypes = {
  type: { options: ['default', 'borderless'] },
  orientation: { control: { disable: true } },
};

export const VerticalOverflow: Story<Partial<TabsProps>> = (args) => {
  const [active, setActive] = React.useState('Item 11');

  const tabData = [
    { name: 'Item 1', disabled: false },
    { name: 'Item 2', disabled: false },
    { name: 'Item 3', disabled: false },
    { name: 'Item 4', disabled: false },
    { name: 'Item 5', disabled: false },
    { name: 'Item 6', disabled: true },
    { name: 'Item 7', disabled: false },
    { name: 'Item 8', disabled: false },
    { name: 'Item 9', disabled: true },
    { name: 'Item 10', disabled: false },
    { name: 'Item 11', disabled: false },
    { name: 'Item 12', disabled: false },
    { name: 'Very long item number thirteen', disabled: false },
  ];
  return (
    <div
      style={{
        height: '50vh',
        maxHeight: 400,
        minHeight: 100,
        border: '1px solid lightpink',
        padding: 8,
      }}
    >
      <NewTabs.Wrapper
        orientation='vertical'
        overflowOptions={{ useOverflow: true }}
        {...args}
      >
        <NewTabs.TabList>
          {tabData?.map((item, index) => {
            return (
              <NewTabs.Tab
                value={`tab${index + 1}`}
                isActive={item.name === active}
                disabled={item.disabled}
                label={item.name}
                onActivated={() => {
                  setActive(item.name);
                }}
              />
            );
          })}
        </NewTabs.TabList>

        <NewTabs.ActionsWrapper>
          <NewTabs.Actions>
            <Button key={'button'}>Button</Button>
          </NewTabs.Actions>
        </NewTabs.ActionsWrapper>

        <NewTabs.Panel value='tab1'>Tab Content One</NewTabs.Panel>
        <NewTabs.Panel value='tab2'>Tab Content Two</NewTabs.Panel>
        <NewTabs.Panel value='tab3'>Tab Content Three</NewTabs.Panel>
        <NewTabs.Panel value='tab4'>Tab Content Four</NewTabs.Panel>
        <NewTabs.Panel value='tab5'>Tab Content Five</NewTabs.Panel>
        <NewTabs.Panel value='tab6'>Tab Content Six</NewTabs.Panel>
        <NewTabs.Panel value='tab7'>Tab Content Seven</NewTabs.Panel>
        <NewTabs.Panel value='tab8'>Tab Content Eight</NewTabs.Panel>
        <NewTabs.Panel value='tab9'>Tab Content Nine</NewTabs.Panel>
        <NewTabs.Panel value='tab10'>Tab Content Ten</NewTabs.Panel>
        <NewTabs.Panel value='tab11'>Tab Content Eleven</NewTabs.Panel>
        <NewTabs.Panel value='tab12'>Tab Content Twelve</NewTabs.Panel>
        <NewTabs.Panel value='tab13'>Tab Content Thirteen</NewTabs.Panel>
      </NewTabs.Wrapper>
    </div>
  );
};
VerticalOverflow.args = {
  orientation: 'vertical',
  type: 'default',
};
VerticalOverflow.argTypes = {
  type: { options: ['default', 'borderless'] },
  orientation: { control: { disable: true } },
};

export const Vertical: Story<Partial<TabsProps>> = (args) => {
  return (
    <NewTabs.Wrapper orientation='vertical' type='borderless' {...args}>
      <NewTabs.TabList>
        <NewTabs.Tab value='item0'>
          <NewTabs.TabIcon>
            <SvgStar />
          </NewTabs.TabIcon>
          <NewTabs.TabLabel>Item0</NewTabs.TabLabel>
          <NewTabs.TabDescription>Sublabel 0</NewTabs.TabDescription>
        </NewTabs.Tab>

        <NewTabs.Tab value='item1'>
          <NewTabs.TabIcon>
            <SvgStar />
          </NewTabs.TabIcon>
          <NewTabs.TabLabel>Item1</NewTabs.TabLabel>
          <NewTabs.TabDescription>Sublabel 1</NewTabs.TabDescription>
        </NewTabs.Tab>

        <NewTabs.Tab value='item2'>
          <NewTabs.TabIcon>
            <SvgStar />
          </NewTabs.TabIcon>
          <NewTabs.TabLabel>Item2</NewTabs.TabLabel>
          <NewTabs.TabDescription>Sublabel 2</NewTabs.TabDescription>
        </NewTabs.Tab>
      </NewTabs.TabList>

      <NewTabs.ActionsWrapper>
        <NewTabs.Actions>
          <Button key={'Small'} size={'small'}>
            Small size button
          </Button>
          <Button key={'Normal'}>Normal size button</Button>
        </NewTabs.Actions>
      </NewTabs.ActionsWrapper>

      <NewTabs.Panel value='item0'>
        Bentley Systems, Incorporated, is an American-based software development
        company that develops, manufactures, licenses, sells and supports
        computer software and services for the design, construction, and
        operation of infrastructure. The company&apos;s software serves the
        building, plant, civil, and geospatial markets in the areas of
        architecture, engineering, construction (AEC) and operations. Their
        software products are used to design, engineer, build, and operate large
        constructed assets such as roadways, railways, bridges, buildings,
        industrial plants, power plants, and utility networks. The company
        re-invests 20% of their revenues in research and development.
      </NewTabs.Panel>
      <NewTabs.Panel value='item1'>
        Bentley Systems is headquartered in Exton, Pennsylvania, United States,
        but has development, sales and other departments in over 50 countries.
        The company had revenues of $700 million in 2018.
      </NewTabs.Panel>
      <NewTabs.Panel value='item2'>
        Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.
        They introduced the commercial version of PseudoStation in 1985, which
        allowed users of Intergraphs VAX systems to use low-cost graphics
        terminals to view and modify the designs on their Intergraph IGDS
        (Interactive Graphics Design System) installations. Their first product
        was shown to potential users who were polled as to what they would be
        willing to pay for it. They averaged the answers, arriving at a price of
        $7,943. A DOS-based version of MicroStation was introduced in 1986.
      </NewTabs.Panel>
    </NewTabs.Wrapper>
  );
};
Vertical.args = {
  orientation: 'vertical',
  type: 'borderless',
};
Vertical.argTypes = {
  type: { options: ['default', 'borderless'] },
  orientation: { control: { disable: true } },
};

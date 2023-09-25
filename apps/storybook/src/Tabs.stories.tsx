/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable react/jsx-key */
import SvgStar from '@itwin/itwinui-icons-react/cjs/icons/Star';
import React from 'react';
import { Button, Tabs, Tab } from '@itwin/itwinui-react';

export default {
  title: 'Core/Tabs',
  component: Tabs,
};

export const DefaultTabs = () => {
  return (
    <Tabs.Wrapper>
      <Tabs.TabList>
        <Tabs.Tab label='Item1' value='tab1' />
        <Tabs.Tab label='Item2' value='tab2' />
        <Tabs.Tab label='Item3' value='tab3' />
      </Tabs.TabList>

      <Tabs.Actions>
        <Button key={'Small'} size={'small'}>
          Small size button
        </Button>
        <Button key={'Normal'}>Normal size button</Button>
      </Tabs.Actions>

      <Tabs.Panel value='tab1'>
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
      </Tabs.Panel>
      <Tabs.Panel value='tab2'>
        Bentley Systems is headquartered in Exton, Pennsylvania, United States,
        but has development, sales and other departments in over 50 countries.
        The company had revenues of $700 million in 2018.
      </Tabs.Panel>
      <Tabs.Panel value='tab3'>
        Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.
        They introduced the commercial version of PseudoStation in 1985, which
        allowed users of Intergraphs VAX systems to use low-cost graphics
        terminals to view and modify the designs on their Intergraph IGDS
        (Interactive Graphics Design System) installations. Their first product
        was shown to potential users who were polled as to what they would be
        willing to pay for it. They averaged the answers, arriving at a price of
        $7,943. A DOS-based version of MicroStation was introduced in 1986.
      </Tabs.Panel>
    </Tabs.Wrapper>
  );
};
DefaultTabs.args = {
  type: 'default',
};

export const BorderlessTabs = () => {
  return (
    <Tabs.Wrapper type='borderless'>
      <Tabs.TabList>
        <Tabs.Tab value='item1' label='Item1' />
        <Tabs.Tab value='item2' label='Item2' />
        <Tabs.Tab value='item3' label='Item3' />
      </Tabs.TabList>

      <Tabs.Actions>
        <Button key={'Small'} size={'small'}>
          Small size button
        </Button>
        <Button key={'Normal'}>Normal size button</Button>
      </Tabs.Actions>

      <Tabs.Panel value='item1'>
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
      </Tabs.Panel>
      <Tabs.Panel value='item2'>
        Bentley Systems is headquartered in Exton, Pennsylvania, United States,
        but has development, sales and other departments in over 50 countries.
        The company had revenues of $700 million in 2018.
      </Tabs.Panel>
      <Tabs.Panel value='item3'>
        Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.
        They introduced the commercial version of PseudoStation in 1985, which
        allowed users of Intergraphs VAX systems to use low-cost graphics
        terminals to view and modify the designs on their Intergraph IGDS
        (Interactive Graphics Design System) installations. Their first product
        was shown to potential users who were polled as to what they would be
        willing to pay for it. They averaged the answers, arriving at a price of
        $7,943. A DOS-based version of MicroStation was introduced in 1986.
      </Tabs.Panel>
    </Tabs.Wrapper>
  );
};
BorderlessTabs.args = {
  type: 'borderless',
};

export const PillTabs = () => {
  return (
    <Tabs.Wrapper type='pill'>
      <Tabs.TabList>
        <Tabs.Tab value='item1'>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
        </Tabs.Tab>

        <Tabs.Tab value='item2'>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
        </Tabs.Tab>

        <Tabs.Tab value='item3'>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.Panel value='item1'>
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
      </Tabs.Panel>
      <Tabs.Panel value='item2'>
        Bentley Systems is headquartered in Exton, Pennsylvania, United States,
        but has development, sales and other departments in over 50 countries.
        The company had revenues of $700 million in 2018.
      </Tabs.Panel>
      <Tabs.Panel value='item3'>
        Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.
        They introduced the commercial version of PseudoStation in 1985, which
        allowed users of Intergraphs VAX systems to use low-cost graphics
        terminals to view and modify the designs on their Intergraph IGDS
        (Interactive Graphics Design System) installations. Their first product
        was shown to potential users who were polled as to what they would be
        willing to pay for it. They averaged the answers, arriving at a price of
        $7,943. A DOS-based version of MicroStation was introduced in 1986.
      </Tabs.Panel>
    </Tabs.Wrapper>
  );
};
PillTabs.args = {
  type: 'pill',
};
PillTabs.argTypes = {
  orientation: { control: { disable: true } },
};

export const SublabelsAndIcons = () => {
  return (
    <Tabs.Wrapper type='borderless'>
      <Tabs.TabList>
        <Tabs.Tab value='item0'>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Item0</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel 0</Tabs.TabDescription>
        </Tabs.Tab>

        <Tabs.Tab value='item1'>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Item1</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel 1</Tabs.TabDescription>
        </Tabs.Tab>

        <Tabs.Tab value='item2' disabled>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Item2</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel 2</Tabs.TabDescription>
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.Actions>
        <Button key={'Small'} size={'small'}>
          Small size button
        </Button>
        <Button key={'Normal'}>Normal size button</Button>
      </Tabs.Actions>

      <Tabs.Panel value='item0'>
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
      </Tabs.Panel>
      <Tabs.Panel value='item1'>
        Bentley Systems is headquartered in Exton, Pennsylvania, United States,
        but has development, sales and other departments in over 50 countries.
        The company had revenues of $700 million in 2018.
      </Tabs.Panel>
      <Tabs.Panel value='item2'>
        Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.
        They introduced the commercial version of PseudoStation in 1985, which
        allowed users of Intergraphs VAX systems to use low-cost graphics
        terminals to view and modify the designs on their Intergraph IGDS
        (Interactive Graphics Design System) installations. Their first product
        was shown to potential users who were polled as to what they would be
        willing to pay for it. They averaged the answers, arriving at a price of
        $7,943. A DOS-based version of MicroStation was introduced in 1986.
      </Tabs.Panel>
    </Tabs.Wrapper>
  );
};
SublabelsAndIcons.args = {
  type: 'borderless',
};

export const HorizontalOverflow = () => {
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
      <Tabs.Wrapper overflowOptions={{ useOverflow: true }}>
        <Tabs.TabList>
          {tabData?.map((item, index) => {
            return (
              <Tabs.Tab
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
        </Tabs.TabList>

        <Tabs.Actions>
          <Button key={'button'}>Button</Button>
        </Tabs.Actions>

        <Tabs.Panel value='tab1'>Tab Content One</Tabs.Panel>
        <Tabs.Panel value='tab2'>Tab Content Two</Tabs.Panel>
        <Tabs.Panel value='tab3'>Tab Content Three</Tabs.Panel>
        <Tabs.Panel value='tab4'>Tab Content Four</Tabs.Panel>
        <Tabs.Panel value='tab5'>Tab Content Five</Tabs.Panel>
        <Tabs.Panel value='tab6'>Tab Content Six</Tabs.Panel>
        <Tabs.Panel value='tab7'>Tab Content Seven</Tabs.Panel>
        <Tabs.Panel value='tab8'>Tab Content Eight</Tabs.Panel>
        <Tabs.Panel value='tab9'>Tab Content Nine</Tabs.Panel>
        <Tabs.Panel value='tab10'>Tab Content Ten</Tabs.Panel>
        <Tabs.Panel value='tab11'>Tab Content Eleven</Tabs.Panel>
        <Tabs.Panel value='tab12'>Tab Content Twelve</Tabs.Panel>
        <Tabs.Panel value='tab13'>Tab Content Thirteen</Tabs.Panel>
      </Tabs.Wrapper>
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

export const VerticalOverflow = () => {
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
      <Tabs.Wrapper
        orientation='vertical'
        overflowOptions={{ useOverflow: true }}
      >
        <Tabs.TabList>
          {tabData?.map((item, index) => {
            return (
              <Tabs.Tab
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
        </Tabs.TabList>

        <Tabs.Actions>
          <Button key={'button'}>Button</Button>
        </Tabs.Actions>

        <Tabs.Panel value='tab1'>Tab Content One</Tabs.Panel>
        <Tabs.Panel value='tab2'>Tab Content Two</Tabs.Panel>
        <Tabs.Panel value='tab3'>Tab Content Three</Tabs.Panel>
        <Tabs.Panel value='tab4'>Tab Content Four</Tabs.Panel>
        <Tabs.Panel value='tab5'>Tab Content Five</Tabs.Panel>
        <Tabs.Panel value='tab6'>Tab Content Six</Tabs.Panel>
        <Tabs.Panel value='tab7'>Tab Content Seven</Tabs.Panel>
        <Tabs.Panel value='tab8'>Tab Content Eight</Tabs.Panel>
        <Tabs.Panel value='tab9'>Tab Content Nine</Tabs.Panel>
        <Tabs.Panel value='tab10'>Tab Content Ten</Tabs.Panel>
        <Tabs.Panel value='tab11'>Tab Content Eleven</Tabs.Panel>
        <Tabs.Panel value='tab12'>Tab Content Twelve</Tabs.Panel>
        <Tabs.Panel value='tab13'>Tab Content Thirteen</Tabs.Panel>
      </Tabs.Wrapper>
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

export const Vertical = () => {
  return (
    <Tabs.Wrapper orientation='vertical' type='borderless'>
      <Tabs.TabList>
        <Tabs.Tab value='item0'>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Item0</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel 0</Tabs.TabDescription>
        </Tabs.Tab>

        <Tabs.Tab value='item1'>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Item1</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel 1</Tabs.TabDescription>
        </Tabs.Tab>

        <Tabs.Tab value='item2'>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Item2</Tabs.TabLabel>
          <Tabs.TabDescription>Sublabel 2</Tabs.TabDescription>
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.Actions>
        <Button key={'Small'} size={'small'}>
          Small size button
        </Button>
        <Button key={'Normal'}>Normal size button</Button>
      </Tabs.Actions>

      <Tabs.Panel value='item0'>
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
      </Tabs.Panel>
      <Tabs.Panel value='item1'>
        Bentley Systems is headquartered in Exton, Pennsylvania, United States,
        but has development, sales and other departments in over 50 countries.
        The company had revenues of $700 million in 2018.
      </Tabs.Panel>
      <Tabs.Panel value='item2'>
        Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.
        They introduced the commercial version of PseudoStation in 1985, which
        allowed users of Intergraphs VAX systems to use low-cost graphics
        terminals to view and modify the designs on their Intergraph IGDS
        (Interactive Graphics Design System) installations. Their first product
        was shown to potential users who were polled as to what they would be
        willing to pay for it. They averaged the answers, arriving at a price of
        $7,943. A DOS-based version of MicroStation was introduced in 1986.
      </Tabs.Panel>
    </Tabs.Wrapper>
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

export const LegacyTabs = () => {
  const [index, setIndex] = React.useState(0);
  const getContent = () => {
    switch (index) {
      case 0:
        return "Bentley Systems, Incorporated, is an American-based software development company that develops, manufactures, licenses, sells and supports computer software and services for the design, construction, and operation of infrastructure. The company's software serves the building, plant, civil, and geospatial markets in the areas of architecture, engineering, construction (AEC) and operations. Their software products are used to design, engineer, build, and operate large constructed assets such as roadways, railways, bridges, buildings, industrial plants, power plants, and utility networks. The company re-invests 20% of their revenues in research and development.";
      case 1:
        return 'Bentley Systems is headquartered in Exton, Pennsylvania, United States, but has development, sales and other departments in over 50 countries. The company had revenues of $700 million in 2018.';
      default:
        return 'Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984. They introduced the commercial version of PseudoStation in 1985, which allowed users of Intergraphs VAX systems to use low-cost graphics terminals to view and modify the designs on their Intergraph IGDS (Interactive Graphics Design System) installations. Their first product was shown to potential users who were polled as to what they would be willing to pay for it. They averaged the answers, arriving at a price of $7,943. A DOS-based version of MicroStation was introduced in 1986.';
    }
  };
  return (
    <Tabs
      labels={[
        <Tab key={1} label='Item1' />,
        <Tab key={2} label='Item2' />,
        <Tab key={3} label='Item3' />,
      ]}
      onTabSelected={setIndex}
      actions={[
        <Button key={'Small'} size={'small'}>
          Small size button
        </Button>,
        <Button key={'Normal'}>Normal size button</Button>,
      ]}
    >
      {getContent()}
    </Tabs>
  );
};

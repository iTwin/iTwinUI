/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgStar from '@itwin/itwinui-icons-react/cjs/icons/Star';
import { Meta, Story } from '@storybook/react/';
import React from 'react';
import { Button, Tab } from '@itwin/itwinui-react';
import { Tabs, TabsProps } from '@itwin/itwinui-react/esm/core/Tabs/Tabs';

export default {
  title: 'Core/Tabs',
  component: Tabs,
  subcomponents: { Tab },
  args: {
    focusActivationMode: 'auto',
    color: 'blue',
    orientation: 'horizontal',
    actions: [
      <Button key={'Small'} size={'small'}>
        Small size button
      </Button>,
      <Button key={'Normal'}>Normal size button</Button>,
    ],
  },
  argTypes: {
    children: { control: { disable: true } },
    style: { control: { disable: true } },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
} as Meta<TabsProps>;

export const DefaultTabs: Story<Partial<TabsProps>> = (args) => {
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
      {...args}
      onTabSelected={setIndex}
    >
      {getContent()}
    </Tabs>
  );
};
DefaultTabs.args = {
  type: 'default',
  labels: [
    <Tab key={1} label='Item1' />,
    <Tab key={2} label='Item2' />,
    <Tab key={3} label='Item3' />,
  ],
};

export const BorderlessTabs: Story<Partial<TabsProps>> = (args) => {
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
      type='borderless'
      {...args}
      onTabSelected={setIndex}
    >
      {getContent()}
    </Tabs>
  );
};
BorderlessTabs.args = {
  labels: [
    <Tab key={1} label='Item1' />,
    <Tab key={2} label='Item2' />,
    <Tab key={3} label='Item3' />,
  ],
  type: 'borderless',
};

export const PillTabs: Story<Partial<TabsProps>> = (args) => {
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
      labels={Array(3)
        .fill(null)
        .map((_, index) => (
          <Tab key={index} startIcon={<SvgStar />} />
        ))}
      type='pill'
      {...args}
      onTabSelected={setIndex}
    >
      {getContent()}
    </Tabs>
  );
};
PillTabs.args = {
  labels: Array(3)
    .fill(null)
    .map((_, index) => <Tab key={index} startIcon={<SvgStar />} />),
  type: 'pill',
};
PillTabs.argTypes = {
  orientation: { control: { disable: true } },
  actions: { control: { disable: true } },
};

export const SublabelsAndIcons: Story<Partial<TabsProps>> = (args) => {
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
      labels={Array(3)
        .fill(null)
        .map((_, index) => (
          <Tab
            key={index}
            label={`Item${index}`}
            sublabel={`Sublabel ${index}`}
            startIcon={<SvgStar />}
            disabled={index === 2}
          />
        ))}
      type='borderless'
      {...args}
      onTabSelected={setIndex}
    >
      {getContent()}
    </Tabs>
  );
};
SublabelsAndIcons.args = {
  labels: Array(3)
    .fill(null)
    .map((_, index) => (
      <Tab
        key={index}
        label={`Item${index}`}
        sublabel={`Sublabel ${index}`}
        startIcon={<SvgStar />}
        disabled={index === 2}
      />
    )),
  type: 'borderless',
};

export const HorizontalOverflow: Story<Partial<TabsProps>> = (args) => {
  const [activeIndex, setActiveIndex] = React.useState(10);
  const getContent = () => {
    switch (activeIndex) {
      case 0:
        return 'Tab Content One';
      case 1:
        return 'Tab Content Two';
      case 2:
        return 'Tab Content Three';
      case 3:
        return 'Tab Content Four';
      case 4:
        return 'Tab Content Five';
      case 5:
        return 'Tab Content Six';
      case 6:
        return 'Tab Content Seven';
      case 7:
        return 'Tab Content Eight';
      case 8:
        return 'Tab Content Nine';
      case 9:
        return 'Tab Content Ten';
      case 10:
        return 'Tab Content Eleven';
      case 11:
        return 'Tab Content Twelve';
      default:
        return 'Tab Content Thirteen';
    }
  };
  const labels = [
    <Tab key={1} label='Item 1' />,
    <Tab key={2} label='Item 2' />,
    <Tab key={3} label='Item 3' />,
    <Tab key={4} label='Item 4' />,
    <Tab key={5} label='Item 5' />,
    <Tab key={6} label='Item 6' disabled />,
    <Tab key={7} label='Item 7' />,
    <Tab key={8} label='Item 8' />,
    <Tab key={9} label='Item 9' disabled />,
    <Tab key={10} label='Item 10' />,
    <Tab key={11} label='Item 11' />,
    <Tab key={12} label='Item 12' />,
    <Tab key={13} label='Very long item number thirteen' />,
  ];

  return (
    <div
      style={{
        width: '50%',
        maxWidth: 1000,
        minWidth: 250,
        border: '1px solid lightpink',
        padding: 8,
      }}
    >
      <Tabs
        type='default'
        labels={labels}
        overflowOptions={{ useOverflow: true }}
        {...args}
        onTabSelected={setActiveIndex}
        activeIndex={activeIndex}
        actions={[<Button key={'button'}>Button</Button>]}
      >
        {getContent()}
      </Tabs>
    </div>
  );
};
HorizontalOverflow.args = {
  type: 'default',
  labels: [
    <Tab key={1} label='Item 1' />,
    <Tab key={2} label='Item 2' />,
    <Tab key={3} label='Item 3' />,
    <Tab key={4} label='Item 4' />,
    <Tab key={5} label='Item 5' />,
    <Tab key={6} label='Item 6' disabled />,
    <Tab key={7} label='Item 7' />,
    <Tab key={8} label='Item 8' />,
    <Tab key={9} label='Item 9' disabled />,
    <Tab key={10} label='Item 10' />,
    <Tab key={11} label='Item 11' />,
    <Tab key={12} label='Item 12' />,
    <Tab key={13} label='Very long item number thirteen' />,
  ],
};
HorizontalOverflow.argTypes = {
  type: { options: ['default', 'borderless'] },
  orientation: { control: { disable: true } },
  actions: { control: { disable: true } },
};

export const VerticalOverflow: Story<Partial<TabsProps>> = (args) => {
  const [activeIndex, setActiveIndex] = React.useState(10);
  const getContent = () => {
    switch (activeIndex) {
      case 0:
        return 'Tab Content One';
      case 1:
        return 'Tab Content Two';
      case 2:
        return 'Tab Content Three';
      case 3:
        return 'Tab Content Four';
      case 4:
        return 'Tab Content Five';
      case 5:
        return 'Tab Content Six';
      case 6:
        return 'Tab Content Seven';
      case 7:
        return 'Tab Content Eight';
      case 8:
        return 'Tab Content Nine';
      case 9:
        return 'Tab Content Ten';
      case 10:
        return 'Tab Content Eleven';
      case 11:
        return 'Tab Content Twelve';
      default:
        return 'Tab Content Thirteen';
    }
  };
  const labels = [
    <Tab key={1} label='Item 1' />,
    <Tab key={2} label='Item 2' />,
    <Tab key={3} label='Item 3' />,
    <Tab key={4} label='Item 4' />,
    <Tab key={5} label='Item 5' />,
    <Tab key={6} label='Item 6' disabled />,
    <Tab key={7} label='Item 7' />,
    <Tab key={8} label='Item 8' />,
    <Tab key={9} label='Item 9' disabled />,
    <Tab key={10} label='Item 10' />,
    <Tab key={11} label='Item 11' />,
    <Tab key={12} label='Item 12' />,
    <Tab key={13} label='Very long item number thirteen' />,
  ];

  return (
    <div
      style={{
        height: '50vh',
        maxHeight: 1000,
        minHeight: 250,
        border: '1px solid lightpink',
        padding: 8,
      }}
    >
      <Tabs
        orientation='vertical'
        type='default'
        labels={labels}
        overflowOptions={{ useOverflow: true }}
        {...args}
        onTabSelected={setActiveIndex}
        activeIndex={activeIndex}
        actions={[<Button key={'button'}>Button</Button>]}
      >
        {getContent()}
      </Tabs>
    </div>
  );
};
VerticalOverflow.args = {
  orientation: 'vertical',
  type: 'default',
  labels: [
    <Tab key={1} label='Item 1' />,
    <Tab key={2} label='Item 2' />,
    <Tab key={3} label='Item 3' />,
    <Tab key={4} label='Item 4' />,
    <Tab key={5} label='Item 5' />,
    <Tab key={6} label='Item 6' disabled />,
    <Tab key={7} label='Item 7' />,
    <Tab key={8} label='Item 8' />,
    <Tab key={9} label='Item 9' disabled />,
    <Tab key={10} label='Item 10' />,
    <Tab key={11} label='Item 11' />,
    <Tab key={12} label='Item 12' />,
    <Tab key={13} label='Very long item number thirteen' />,
  ],
};
VerticalOverflow.argTypes = {
  type: { options: ['default', 'borderless'] },
  orientation: { control: { disable: true } },
  actions: { control: { disable: true } },
};

export const Vertical: Story<Partial<TabsProps>> = (args) => {
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
      orientation='vertical'
      type='borderless'
      labels={Array(3)
        .fill(null)
        .map((_, index) => (
          <Tab
            key={index}
            label={`Item${index}`}
            sublabel={`Sublabel ${index}`}
            startIcon={<SvgStar />}
          />
        ))}
      {...args}
      onTabSelected={setIndex}
    >
      {getContent()}
    </Tabs>
  );
};
Vertical.args = {
  orientation: 'vertical',
  labels: Array(3)
    .fill(null)
    .map((_, index) => (
      <Tab
        key={index}
        label={`Item${index}`}
        sublabel={`Sublabel ${index}`}
        startIcon={<SvgStar />}
      />
    )),
  type: 'borderless',
};
Vertical.argTypes = {
  type: { options: ['default', 'borderless'] },
  orientation: { control: { disable: true } },
};

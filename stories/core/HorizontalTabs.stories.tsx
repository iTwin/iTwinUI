// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { SvgStar } from '@bentley/icons-generic-react';
import { useState } from '@storybook/addons';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { HorizontalTabs } from '../../src/core';
import { HorizontalTabsProps } from '../../src/core/HorizontalTabs/HorizontalTabs';

export default {
  title: 'Core/HorizontalTabs',
  component: HorizontalTabs,
  parameters: {
    docs: {
      description: {
        component:
          'Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.',
      },
    },
  },
} as Meta<HorizontalTabsProps>;

const Template: Story<HorizontalTabsProps> = (args) => {
  const [index, setIndex] = useState(0);
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
    <HorizontalTabs onTabSelected={setIndex} {...args}>
      {getContent()}
    </HorizontalTabs>
  );
};

export const DefaultTabs = Template.bind({});

DefaultTabs.args = {
  labels: ['Item1', 'Item2', 'Item3'],
};

export const BorderlessTabs = Template.bind({});

BorderlessTabs.args = {
  labels: ['Item1', 'Item2', 'Item3'],
  type: 'borderless',
};

export const PillTabs = Template.bind({});

const style: React.CSSProperties = {
  width: 16,
  height: 16,
};
PillTabs.args = {
  labels: [...new Array(3)].map((_, index) => (
    <SvgStar key={index} style={style} />
  )),
  type: 'pill',
};

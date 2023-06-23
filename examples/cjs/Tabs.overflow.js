/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tabs, Tab } from '@itwin/itwinui-react';
export default () => {
  const [index, setIndex] = React.useState(0);
  const getContent = () => {
    switch (index) {
      case 0:
        return 'Bentley Systems, Incorporated, is an American-based software development company that develops, manufactures, licenses, sells and supports computer software and services for the design, construction, and operation of infrastructure.';
      case 1:
        return "The company's software serves the building, plant, civil, and geospatial markets in the areas of architecture, engineering, construction (AEC) and operations.";
      case 2:
        return 'Their software products are used to design, engineer, build, and operate large constructed assets such as roadways, railways, bridges, buildings, industrial plants, power plants, and utility networks.';
      case 3:
        return 'The company re-invests 20% of their revenues in research and development.';
      case 4:
        return 'Bentley Systems is headquartered in Exton, Pennsylvania, United States, but has development, sales and other departments in over 50 countries.';
      case 5:
        return 'The company had revenues of $700 million in 2018.';
      case 6:
        return 'Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.';
      default:
        return 'They introduced the commercial version of PseudoStation in 1985, which allowed users of Intergraphs VAX systems to use low-cost graphics terminals to view and modify the designs on their Intergraph IGDS (Interactive Graphics Design System) installations.';
    }
  };
  const labels = [
    React.createElement(Tab, { key: 1, label: 'Bentley Overview' }),
    React.createElement(Tab, { key: 2, label: 'Markets' }),
    React.createElement(Tab, { key: 3, label: 'Uses' }),
    React.createElement(Tab, { key: 4, label: 'Reinvestment' }),
    React.createElement(Tab, { key: 5, label: 'Location' }),
    React.createElement(Tab, { key: 6, label: 'Revenue' }),
    React.createElement(Tab, { key: 7, label: 'Founders' }),
    React.createElement(Tab, { key: 8, label: 'History' }),
  ];
  return React.createElement(
    'div',
    { style: { maxWidth: 425, border: '1px solid lightpink', padding: 8 } },
    React.createElement(
      Tabs,
      {
        labels: labels,
        overflowOptions: { useOverflow: true },
        onTabSelected: setIndex,
        activeIndex: index,
      },
      getContent(),
    ),
  );
};

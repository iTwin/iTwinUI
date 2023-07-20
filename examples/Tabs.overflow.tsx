/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tabs } from '@itwin/itwinui-react';

export default () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <div style={{ maxWidth: 425, border: '1px solid lightpink', padding: 8 }}>
      <Tabs
        overflowOptions={{ useOverflow: true }}
        activeIndex={activeIndex}
        onTabSelected={setActiveIndex}
      >
        <Tabs.TabList>
          <Tabs.Tab label='Bentley Overview' />
          <Tabs.Tab label='Markets' />
          <Tabs.Tab label='Uses' />
          <Tabs.Tab label='Reinvestment' />
          <Tabs.Tab label='Location' />
          <Tabs.Tab label='Revenue' />
          <Tabs.Tab label='Founders' />
          <Tabs.Tab label='History' />
        </Tabs.TabList>

        <Tabs.Panels>
          <Tabs.Panel>
            Bentley Systems, Incorporated, is an American-based software
            development company that develops, manufactures, licenses, sells and
            supports computer software and services for the design,
            construction, and operation of infrastructure.
          </Tabs.Panel>
          <Tabs.Panel>
            The company's software serves the building, plant, civil, and
            geospatial markets in the areas of architecture, engineering,
            construction (AEC) and operations.
          </Tabs.Panel>
          <Tabs.Panel>
            Their software products are used to design, engineer, build, and
            operate large constructed assets such as roadways, railways,
            bridges, buildings, industrial plants, power plants, and utility
            networks.
          </Tabs.Panel>
          <Tabs.Panel>
            The company re-invests 20% of their revenues in research and
            development.
          </Tabs.Panel>
          <Tabs.Panel>
            Bentley Systems is headquartered in Exton, Pennsylvania, United
            States, but has development, sales and other departments in over 50
            countries.
          </Tabs.Panel>
          <Tabs.Panel>
            The company had revenues of $700 million in 2018.
          </Tabs.Panel>
          <Tabs.Panel>
            Keith A. Bentley and Barry J. Bentley founded Bentley Systems in
            1984.
          </Tabs.Panel>
          <Tabs.Panel>
            They introduced the commercial version of PseudoStation in 1985,
            which allowed users of Intergraphs VAX systems to use low-cost
            graphics terminals to view and modify the designs on their
            Intergraph IGDS (Interactive Graphics Design System) installations.
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </div>
  );
};

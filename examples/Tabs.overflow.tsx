/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tabs } from '@itwin/itwinui-react';

export default () => {
  const [active, setActive] = React.useState('Bentley Overview');

  const [tabData] = React.useState([
    { name: 'Bentley Overview' },
    { name: 'Markets' },
    { name: 'Uses' },
    { name: 'Reinvestment' },
    { name: 'Location' },
    { name: 'Revenue' },
    { name: 'Founders' },
    { name: 'History' },
  ]);

  return (
    <div style={{ maxWidth: 425, border: '1px solid lightpink', padding: 8 }}>
      <Tabs.Wrapper overflowOptions={{ useOverflow: true }}>
        <Tabs.TabList>
          {tabData?.map((item, index) => {
            return (
              <Tabs.Tab
                value={`tab${index}`}
                isActive={item.name === active}
                label={item.name}
                onActivated={() => {
                  setActive(item.name);
                }}
              />
            );
          })}
        </Tabs.TabList>

        <Tabs.Panel value='tab0'>
          Bentley Systems, Incorporated, is an American-based software
          development company that develops, manufactures, licenses, sells and
          supports computer software and services for the design, construction,
          and operation of infrastructure.
        </Tabs.Panel>
        <Tabs.Panel value='tab1'>
          The company's software serves the building, plant, civil, and
          geospatial markets in the areas of architecture, engineering,
          construction (AEC) and operations.
        </Tabs.Panel>
        <Tabs.Panel value='tab2'>
          Their software products are used to design, engineer, build, and
          operate large constructed assets such as roadways, railways, bridges,
          buildings, industrial plants, power plants, and utility networks.
        </Tabs.Panel>
        <Tabs.Panel value='tab3'>
          The company re-invests 20% of their revenues in research and
          development.
        </Tabs.Panel>
        <Tabs.Panel value='tab4'>
          Bentley Systems is headquartered in Exton, Pennsylvania, United
          States, but has development, sales and other departments in over 50
          countries.
        </Tabs.Panel>
        <Tabs.Panel value='tab5'>
          The company had revenues of $700 million in 2018.
        </Tabs.Panel>
        <Tabs.Panel value='tab6'>
          Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.
        </Tabs.Panel>
        <Tabs.Panel value='tab7'>
          They introduced the commercial version of PseudoStation in 1985, which
          allowed users of Intergraphs VAX systems to use low-cost graphics
          terminals to view and modify the designs on their Intergraph IGDS
          (Interactive Graphics Design System) installations.
        </Tabs.Panel>
      </Tabs.Wrapper>
    </div>
  );
};

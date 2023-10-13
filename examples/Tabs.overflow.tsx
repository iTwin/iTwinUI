/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tabs } from '@itwin/itwinui-react';

const tabData = [
  {
    name: 'Apple',
    content: `An apple is a round, edible fruit produced by an apple tree (Malus
    domestica). Apple trees are cultivated worldwide and are the most widely
    grown species in the genus Malus.`,
  },
  {
    name: 'Orange',
    content: `An orange is a fruit of various citrus species in the family Rutaceae
  (see list of plants known as orange); it primarily refers to Citrus x
  sinensis, which is also called sweet orange, to distinguish it from the
  related Citrus x aurantium, referred to as bitter orange.`,
  },
  {
    name: 'Pear',
    content: `Pears are fruits produced and consumed around the world, growing on a
  tree and harvested in late summer into mid-autumn.`,
  },
  {
    name: 'Grape',
    content: `A grape is a fruit, botanically a berry, of the deciduous woody vines of
  the flowering plant genus Vitis. Grapes are a non-climacteric type of
  fruit, generally occurring in clusters.`,
  },
  {
    name: 'Cherry',
    content: `A cherry is the fruit of many plants of the genus Prunus, and is a
  fleshy drupe (stone fruit). Commercial cherries are obtained from
  cultivars of several species, such as the sweet Prunus avium and the
  sour Prunus cerasus.`,
  },
  {
    name: 'Peach',
    content: `The peach (Prunus persica) is a deciduous tree first domesticated and
  cultivated in Zhejiang province of Eastern China.`,
  },
];

export default () => {
  const [active, setActive] = React.useState('Cherry');

  return (
    <div style={{ maxWidth: 425, border: '1px solid lightpink', padding: 8 }}>
      <Tabs.Wrapper
        value={active}
        onValueChange={(value) => {
          setActive(value);
        }}
      >
        <Tabs.TabList>
          {tabData?.map((item) => {
            return (
              <Tabs.Tab key={item.name} value={item.name} label={item.name} />
            );
          })}
        </Tabs.TabList>

        {tabData.map((item) => (
          <Tabs.Panel key={item.name} value={item.name}>
            {item.content}
          </Tabs.Panel>
        ))}
      </Tabs.Wrapper>
    </div>
  );
};

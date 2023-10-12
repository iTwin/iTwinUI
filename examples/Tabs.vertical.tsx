/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tabs } from '@itwin/itwinui-react';
import {
  SvgDocument,
  SvgFilter,
  SvgAirplane,
} from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Tabs.Wrapper orientation='vertical'>
      <Tabs.TabList>
        <Tabs.Tab value='apple' key='apple'>
          <Tabs.TabIcon>
            <SvgDocument />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Apple</Tabs.TabLabel>
          <Tabs.TabDescription>A red fruit</Tabs.TabDescription>
        </Tabs.Tab>
        <Tabs.Tab value='orange' key='orange' disabled>
          <Tabs.TabIcon>
            <SvgFilter />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Orange</Tabs.TabLabel>
          <Tabs.TabDescription>A disabled fruit</Tabs.TabDescription>
        </Tabs.Tab>
        <Tabs.Tab value='pear' key='pear'>
          <Tabs.TabIcon>
            <SvgAirplane />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Pear</Tabs.TabLabel>
          <Tabs.TabDescription>A green fruit</Tabs.TabDescription>
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.Panel value='apple' key='apple'>
        An apple is a round, edible fruit produced by an apple tree (Malus
        domestica). Apple trees are cultivated worldwide and are the most widely
        grown species in the genus Malus.
      </Tabs.Panel>
      <Tabs.Panel value='orange' key='orange'>
        An orange is a fruit of various citrus species in the family Rutaceae
        (see list of plants known as orange); it primarily refers to Citrus x
        sinensis, which is also called sweet orange, to distinguish it from the
        related Citrus x aurantium, referred to as bitter orange.
      </Tabs.Panel>
      <Tabs.Panel value='pear' key='pear'>
        Pears are fruits produced and consumed around the world, growing on a
        tree and harvested in late summer into mid-autumn.
      </Tabs.Panel>
    </Tabs.Wrapper>
  );
};

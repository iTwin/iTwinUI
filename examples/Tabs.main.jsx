/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tabs } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <Tabs.Wrapper>
        <Tabs.TabList>
          <Tabs.Tab value='apple' label='Apple' key='apple' />
          <Tabs.Tab value='orange' label='Orange' key='orange' />
          <Tabs.Tab value='pear' label='Pear' key='pear' />
        </Tabs.TabList>

        <Tabs.Panel value='apple' key='apple'>
          An apple is a round, edible fruit produced by an apple tree (Malus
          domestica). Apple trees are cultivated worldwide and are the most
          widely grown species in the genus Malus.
        </Tabs.Panel>
        <Tabs.Panel value='orange' key='orange'>
          An orange is a fruit of various citrus species in the family Rutaceae
          (see list of plants known as orange); it primarily refers to Citrus x
          sinensis, which is also called sweet orange, to distinguish it from
          the related Citrus x aurantium, referred to as bitter orange.
        </Tabs.Panel>
        <Tabs.Panel value='pear' key='pear'>
          Pears are fruits produced and consumed around the world, growing on a
          tree and harvested in late summer into mid-autumn.
        </Tabs.Panel>
      </Tabs.Wrapper>
    </div>
  );
};

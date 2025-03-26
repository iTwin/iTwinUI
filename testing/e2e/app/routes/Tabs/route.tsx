import { Tabs } from '@itwin/itwinui-react';

export default function TabsTest() {
  return (
    <div data-testid='test-wrapper'>
      <Tabs.Wrapper type='borderless' data-testid='tabs-wrapper'>
        <Tabs.TabList>
          <Tabs.Tab
            value='apple'
            label='Apple That Will Overflow This Tab Label For Testing Purposes'
            key='apple'
          />
          <Tabs.Tab
            value='orange'
            label='Orange That Will Also Overflow This Tab'
            key='orange'
          />
          <Tabs.Tab
            value='test1'
            label='Test1'
            key='test1'
            data-testid='test1'
          />
          <Tabs.Tab value='test2' label='Test2' key='test2' />
          <Tabs.Tab value='test3' label='Test3' key='test3' />
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
}

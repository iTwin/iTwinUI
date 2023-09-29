/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
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
        <Tabs.Tab label='Apple' value='tab1' />
        <Tabs.Tab label='Orange' value='tab2' />
        <Tabs.Tab label='Grape' value='tab3' />
      </Tabs.TabList>

      <Tabs.Actions>
        <Button key={'Small'} size={'small'}>
          Small size button
        </Button>
        <Button key={'Normal'}>Normal size button</Button>
      </Tabs.Actions>

      <Tabs.Panel value='tab1'>
        An apple is a round, edible fruit produced by an apple tree (Malus
        domestica). Apple trees are cultivated worldwide and are the most widely
        grown species in the genus Malus. The tree originated in Central Asia,
        where its wild ancestor, Malus sieversii, is still found. Apples have
        been grown for thousands of years in Asia and Europe and were introduced
        to North America by European colonists. Apples have religious and
        mythological significance in many cultures, including Norse, Greek, and
        European Christian tradition.
      </Tabs.Panel>
      <Tabs.Panel value='tab2'>
        An orange is a fruit of various citrus species in the family Rutaceae
        (see list of plants known as orange); it primarily refers to Citrus x
        sinensis, which is also called sweet orange, to distinguish it from the
        related Citrus x aurantium, referred to as bitter orange. The sweet
        orange reproduces asexually (apomixis through nucellar embryony);
        varieties of the sweet orange arise through mutations.
      </Tabs.Panel>
      <Tabs.Panel value='tab3'>
        A grape is a fruit, botanically a berry, of the deciduous woody vines of
        the flowering plant genus Vitis. Grapes are a non-climacteric type of
        fruit, generally occurring in clusters. The cultivation of grapes began
        perhaps 8,000 years ago, and the fruit has been used as human food over
        history. Eaten fresh or in dried form (as raisins, currants and
        sultanas), grapes also hold cultural significance in many parts of the
        world, particularly for their role in winemaking. Other grape-derived
        products include various types of jam, juice, vinegar and oil.
      </Tabs.Panel>
    </Tabs.Wrapper>
  );
};

export const BorderlessTabs = () => {
  return (
    <Tabs.Wrapper type='borderless'>
      <Tabs.TabList>
        <Tabs.Tab value='item1' label='Pear' />
        <Tabs.Tab value='item2' label='Cherry' />
        <Tabs.Tab value='item3' label='Peach' />
      </Tabs.TabList>

      <Tabs.Actions>
        <Button key={'Small'} size={'small'}>
          Small size button
        </Button>
        <Button key={'Normal'}>Normal size button</Button>
      </Tabs.Actions>

      <Tabs.Panel value='item1'>
        Pears are fruits produced and consumed around the world, growing on a
        tree and harvested in late summer into mid-autumn. The pear tree and
        shrub are a species of genus Pyrus, in the family Rosaceae, bearing the
        pomaceous fruit of the same name. Several species of pears are valued
        for their edible fruit and juices, while others are cultivated as trees.
      </Tabs.Panel>
      <Tabs.Panel value='item2'>
        {`A cherry is the fruit of many plants of the genus Prunus, and is a
        fleshy drupe (stone fruit). Commercial cherries are obtained from
        cultivars of several species, such as the sweet Prunus avium and the
        sour Prunus cerasus. The name "cherry" also refers to the cherry tree
        and its wood, and is sometimes applied to almonds and visually similar
        flowering trees in the genus Prunus, as in "ornamental cherry" or
        "cherry blossom". Wild cherry may refer to any of the cherry species
        growing outside cultivation, although Prunus avium is often referred to
        specifically by the name "wild cherry" in the British Isles.`}
      </Tabs.Panel>
      <Tabs.Panel value='item3'>
        The peach (Prunus persica) is a deciduous tree first domesticated and
        cultivated in Zhejiang province of Eastern China. It bears edible juicy
        fruits with various characteristics, most called peaches and others (the
        glossy-skinned, non-fuzzy varieties), nectarines.
      </Tabs.Panel>
    </Tabs.Wrapper>
  );
};

export const PillTabs = () => {
  return (
    <Tabs.Wrapper type='pill'>
      <Tabs.TabList>
        <Tabs.Tab value='tab1'>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
        </Tabs.Tab>

        <Tabs.Tab value='tab2'>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
        </Tabs.Tab>

        <Tabs.Tab value='tab3'>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.Panel value='tab1'>
        An apple is a round, edible fruit produced by an apple tree (Malus
        domestica). Apple trees are cultivated worldwide and are the most widely
        grown species in the genus Malus. The tree originated in Central Asia,
        where its wild ancestor, Malus sieversii, is still found. Apples have
        been grown for thousands of years in Asia and Europe and were introduced
        to North America by European colonists. Apples have religious and
        mythological significance in many cultures, including Norse, Greek, and
        European Christian tradition.
      </Tabs.Panel>
      <Tabs.Panel value='tab2'>
        An orange is a fruit of various citrus species in the family Rutaceae
        (see list of plants known as orange); it primarily refers to Citrus x
        sinensis, which is also called sweet orange, to distinguish it from the
        related Citrus x aurantium, referred to as bitter orange. The sweet
        orange reproduces asexually (apomixis through nucellar embryony);
        varieties of the sweet orange arise through mutations.
      </Tabs.Panel>
      <Tabs.Panel value='tab3'>
        A grape is a fruit, botanically a berry, of the deciduous woody vines of
        the flowering plant genus Vitis. Grapes are a non-climacteric type of
        fruit, generally occurring in clusters. The cultivation of grapes began
        perhaps 8,000 years ago, and the fruit has been used as human food over
        history. Eaten fresh or in dried form (as raisins, currants and
        sultanas), grapes also hold cultural significance in many parts of the
        world, particularly for their role in winemaking. Other grape-derived
        products include various types of jam, juice, vinegar and oil.
      </Tabs.Panel>
    </Tabs.Wrapper>
  );
};

export const SublabelsAndIcons = () => {
  return (
    <Tabs.Wrapper type='borderless'>
      <Tabs.TabList>
        <Tabs.Tab value='tab0'>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Apple</Tabs.TabLabel>
          <Tabs.TabDescription>Red fruit</Tabs.TabDescription>
        </Tabs.Tab>

        <Tabs.Tab value='tab1'>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Orange</Tabs.TabLabel>
          <Tabs.TabDescription>Orange fruit</Tabs.TabDescription>
        </Tabs.Tab>

        <Tabs.Tab value='tab2' disabled>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Grape</Tabs.TabLabel>
          <Tabs.TabDescription>Green fruit</Tabs.TabDescription>
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.Actions>
        <Button key={'Small'} size={'small'}>
          Small size button
        </Button>
        <Button key={'Normal'}>Normal size button</Button>
      </Tabs.Actions>

      <Tabs.Panel value='tab0'>
        An apple is a round, edible fruit produced by an apple tree (Malus
        domestica). Apple trees are cultivated worldwide and are the most widely
        grown species in the genus Malus. The tree originated in Central Asia,
        where its wild ancestor, Malus sieversii, is still found. Apples have
        been grown for thousands of years in Asia and Europe and were introduced
        to North America by European colonists. Apples have religious and
        mythological significance in many cultures, including Norse, Greek, and
        European Christian tradition.
      </Tabs.Panel>
      <Tabs.Panel value='tab1'>
        An orange is a fruit of various citrus species in the family Rutaceae
        (see list of plants known as orange); it primarily refers to Citrus x
        sinensis, which is also called sweet orange, to distinguish it from the
        related Citrus x aurantium, referred to as bitter orange. The sweet
        orange reproduces asexually (apomixis through nucellar embryony);
        varieties of the sweet orange arise through mutations.
      </Tabs.Panel>
      <Tabs.Panel value='tab2'>
        A grape is a fruit, botanically a berry, of the deciduous woody vines of
        the flowering plant genus Vitis. Grapes are a non-climacteric type of
        fruit, generally occurring in clusters. The cultivation of grapes began
        perhaps 8,000 years ago, and the fruit has been used as human food over
        history. Eaten fresh or in dried form (as raisins, currants and
        sultanas), grapes also hold cultural significance in many parts of the
        world, particularly for their role in winemaking. Other grape-derived
        products include various types of jam, juice, vinegar and oil.
      </Tabs.Panel>
    </Tabs.Wrapper>
  );
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
                key={`tab${index + 1}`}
                value={`tab${index + 1}`}
                isActive={item.name === active}
                disabled={item.disabled}
                label={item.name}
                onActiveChange={() => {
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
                key={`tab${index + 1}`}
                value={`tab${index + 1}`}
                isActive={item.name === active}
                disabled={item.disabled}
                label={item.name}
                onActiveChange={() => {
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

export const Vertical = () => {
  return (
    <Tabs.Wrapper orientation='vertical' type='borderless'>
      <Tabs.TabList>
        <Tabs.Tab value='tab1'>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Apple</Tabs.TabLabel>
          <Tabs.TabDescription>Red fruit</Tabs.TabDescription>
        </Tabs.Tab>

        <Tabs.Tab value='tab2'>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Orange</Tabs.TabLabel>
          <Tabs.TabDescription>Orange fruit</Tabs.TabDescription>
        </Tabs.Tab>

        <Tabs.Tab value='tab3'>
          <Tabs.TabIcon>
            <SvgStar />
          </Tabs.TabIcon>
          <Tabs.TabLabel>Grape</Tabs.TabLabel>
          <Tabs.TabDescription>Green fruit</Tabs.TabDescription>
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.Actions>
        <Button key={'Small'} size={'small'}>
          Small size button
        </Button>
        <Button key={'Normal'}>Normal size button</Button>
      </Tabs.Actions>

      <Tabs.Panel value='tab1'>
        An apple is a round, edible fruit produced by an apple tree (Malus
        domestica). Apple trees are cultivated worldwide and are the most widely
        grown species in the genus Malus. The tree originated in Central Asia,
        where its wild ancestor, Malus sieversii, is still found. Apples have
        been grown for thousands of years in Asia and Europe and were introduced
        to North America by European colonists. Apples have religious and
        mythological significance in many cultures, including Norse, Greek, and
        European Christian tradition.
      </Tabs.Panel>
      <Tabs.Panel value='tab2'>
        An orange is a fruit of various citrus species in the family Rutaceae
        (see list of plants known as orange); it primarily refers to Citrus x
        sinensis, which is also called sweet orange, to distinguish it from the
        related Citrus x aurantium, referred to as bitter orange. The sweet
        orange reproduces asexually (apomixis through nucellar embryony);
        varieties of the sweet orange arise through mutations.
      </Tabs.Panel>
      <Tabs.Panel value='tab3'>
        A grape is a fruit, botanically a berry, of the deciduous woody vines of
        the flowering plant genus Vitis. Grapes are a non-climacteric type of
        fruit, generally occurring in clusters. The cultivation of grapes began
        perhaps 8,000 years ago, and the fruit has been used as human food over
        history. Eaten fresh or in dried form (as raisins, currants and
        sultanas), grapes also hold cultural significance in many parts of the
        world, particularly for their role in winemaking. Other grape-derived
        products include various types of jam, juice, vinegar and oil.
      </Tabs.Panel>
    </Tabs.Wrapper>
  );
};

export const LegacyTabs = () => {
  const [index, setIndex] = React.useState(0);
  const getContent = () => {
    switch (index) {
      case 0:
        return `An apple is a round, edible fruit produced by an apple tree (Malus
          domestica). Apple trees are cultivated worldwide and are the most widely
          grown species in the genus Malus. The tree originated in Central Asia,
          where its wild ancestor, Malus sieversii, is still found. Apples have
          been grown for thousands of years in Asia and Europe and were introduced
          to North America by European colonists. Apples have religious and
          mythological significance in many cultures, including Norse, Greek, and
          European Christian tradition.`;
      case 1:
        return `An orange is a fruit of various citrus species in the family Rutaceae
        (see list of plants known as orange); it primarily refers to Citrus x
        sinensis, which is also called sweet orange, to distinguish it from the
        related Citrus x aurantium, referred to as bitter orange. The sweet
        orange reproduces asexually (apomixis through nucellar embryony);
        varieties of the sweet orange arise through mutations.`;
      default:
        return `A grape is a fruit, botanically a berry, of the deciduous woody vines of
        the flowering plant genus Vitis. Grapes are a non-climacteric type of
        fruit, generally occurring in clusters. The cultivation of grapes began
        perhaps 8,000 years ago, and the fruit has been used as human food over
        history. Eaten fresh or in dried form (as raisins, currants and
        sultanas), grapes also hold cultural significance in many parts of the
        world, particularly for their role in winemaking. Other grape-derived
        products include various types of jam, juice, vinegar and oil.`;
    }
  };
  return (
    <Tabs
      labels={[
        <Tab key={1} label='Apple' />,
        <Tab key={2} label='Orange' />,
        <Tab key={3} label='Grape' />,
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

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tabs, Tab, Button } from '@itwin/itwinui-react';

export default () => {
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
      activeIndex={index}
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

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    /* '2xl' gap between all items that don't specify `gapBefore` or `gapAfter` */
    <Flex gap='2xl'>
      <Flex.Item>
        <MyItem>1</MyItem>
      </Flex.Item>

      <Flex.Item>
        <MyItem>2</MyItem>
      </Flex.Item>

      {/* ⬇️ will always have 's' gap between 3 and 4  */}
      <Flex.Item gapAfter='s'>
        <MyItem>3</MyItem>
      </Flex.Item>

      <Flex.Item>
        <MyItem>4</MyItem>
      </Flex.Item>

      {/* ⬇️ will always have '3xs' gap between 4 and 5 */}
      <Flex.Item gapBefore='3xs'>
        <MyItem>5</MyItem>
      </Flex.Item>

      <Flex.Item>
        <MyItem>6</MyItem>
      </Flex.Item>
    </Flex>
  );
};

const MyItem = ({ children = '' }) => (
  <div className='demo-item-container'>{children}</div>
);

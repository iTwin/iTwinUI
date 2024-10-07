/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex className='demo-container'>
      <Flex.Item flex='1'>
        <MyItem>1</MyItem>
      </Flex.Item>

      <Flex.Item flex='3'>
        <MyItem>2</MyItem>
      </Flex.Item>

      <Flex.Item flex='1'>
        <MyItem>3</MyItem>
      </Flex.Item>
    </Flex>
  );
};

const MyItem = ({ children = '' }) => (
  <div className='demo-item-container'>{children}</div>
);

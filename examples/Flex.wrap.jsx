/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex className='demo-container' flexWrap='wrap'>
      <MyItem>1</MyItem>
      <MyItem>2</MyItem>
      <MyItem>3</MyItem>
      <MyItem>4</MyItem>
      <MyItem>5</MyItem>
      <MyItem>6</MyItem>
    </Flex>
  );
};

const MyItem = ({ children = '' }) => (
  <div className='demo-item-container'>{children}</div>
);

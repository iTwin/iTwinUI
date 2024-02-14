/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex>
      <MyItem>1</MyItem>
      <MyItem>2</MyItem>
      <MyItem>3</MyItem>
    </Flex>
  );
};

const MyItem = ({ children = '' }) => (
  <div className='demo-item-container'>{children}</div>
);

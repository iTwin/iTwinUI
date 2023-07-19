/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Input, Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex flexDirection='column'>
      <Input placeholder='Small' localSize='small' />
      <Input placeholder='Medium' />
      <Input placeholder='Large' localSize='large' />
    </Flex>
  );
};

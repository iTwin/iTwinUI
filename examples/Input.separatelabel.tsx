/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Input, Label, Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex>
      <Flex
        flexDirection='column'
        alignItems='flex-end'
        gap='var(--iui-size-m)'
      >
        <Label htmlFor='first-name'>First name</Label>
        <Label htmlFor='middle-initial'>Middle initial</Label>
        <Label htmlFor='last-name'>Last name</Label>
      </Flex>
      <Flex flexDirection='column' alignItems='flex-start'>
        <Input id='first-name' />
        <Input id='middle-initial' maxlength='1' />
        <Input id='last-name' />
      </Flex>
    </Flex>
  );
};

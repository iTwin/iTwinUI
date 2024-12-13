/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Flex, Label, Text } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex justifyContent='center' className='demo-container'>
      <Label displayStyle='inline' as='div'>
        <Text isMuted>Name:</Text>
      </Label>
      <Text>James Bond</Text>
    </Flex>
  );
};

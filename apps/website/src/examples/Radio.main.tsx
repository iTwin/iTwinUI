/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Flex, Radio } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <Radio label='Option 1' defaultChecked />
      <Radio label='Option 2' />
      <Radio label='Option 3' defaultChecked disabled />
      <Radio label='Option 4' disabled />
    </Flex>
  );
};

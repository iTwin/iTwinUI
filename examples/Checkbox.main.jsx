/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Checkbox, Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <Checkbox label='Option 1' defaultChecked />
      <Checkbox label='Option 2' />
      <Checkbox label='Option 3' defaultChecked disabled />
      <Checkbox label='Option 4' disabled />
    </Flex>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Checkbox, Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <Checkbox label='Option 1' variant='eyeball' indeterminate defaultChecked />
      <Flex
        flexDirection='column'
        alignItems='flex-start'
        style={{ marginLeft: 'var(--iui-size-l)' }}
      >
        <Checkbox label='Option 1.1' variant='eyeball' />
        <Checkbox label='Option 1.2' variant='eyeball' defaultChecked />
        <Checkbox label='Option 1.3' variant='eyeball' />
      </Flex>
    </Flex>
  );
};

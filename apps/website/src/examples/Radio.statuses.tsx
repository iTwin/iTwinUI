/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Radio, Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <Radio name='Options' label='Default' />
      <Radio name='Options' label='Positive' status='positive' />
      <Radio name='Options' label='Warning' status='warning' />
      <Radio name='Options' label='Negative' status='negative' />
    </Flex>
  );
};

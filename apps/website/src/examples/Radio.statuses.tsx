/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Radio, Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <Radio label='Default' />
      <Radio label='Positive' status='positive' />
      <Radio label='Warning' status='warning' />
      <Radio label='Negative' status='negative' />
    </Flex>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Checkbox, Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <Checkbox label='Default' />
      <Checkbox label='Positive' status='positive' />
      <Checkbox label='Warning' status='warning' />
      <Checkbox label='Negative' status='negative' />
    </Flex>
  );
};

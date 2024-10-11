/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ProgressRadial, Text } from '@itwin/itwinui-react';

export default () => {
  return (
    <ProgressRadial value={100} status='positive' size='large'>
      <Text variant='small'>100%</Text>
    </ProgressRadial>
  );
};

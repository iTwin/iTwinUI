/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { LabeledInput, Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex>
      <LabeledInput
        label='Positive input'
        message='Happy message'
        status='positive'
        placeholder='Labeled input'
      />
      <LabeledInput
        label='Warning input'
        message='Cautious message'
        status='warning'
        placeholder='Labeled input'
      />
      <LabeledInput
        label='Negative input'
        message='Angry message'
        status='negative'
        placeholder='Labeled input'
      />
    </Flex>
  );
};

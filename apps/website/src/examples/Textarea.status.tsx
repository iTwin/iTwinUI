/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { LabeledTextarea, Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex>
      <LabeledTextarea
        label='Positive text area'
        message='Happy message'
        status='positive'
        placeholder='Labeled text area'
      />
      <LabeledTextarea
        label='Warning text area'
        message='Cautious message'
        status='warning'
        placeholder='Labeled text area'
      />
      <LabeledTextarea
        label='Negative text area'
        message='Angry message'
        status='negative'
        placeholder='Labeled text area'
      />
    </Flex>
  );
};

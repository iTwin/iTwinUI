/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { LabeledTextarea } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <LabeledTextarea
        label='Positive textarea'
        message='Happy message'
        status='positive'
        placeholder='Labeled textarea'
      />
      <LabeledTextarea
        label='Warning textarea'
        message='Cautious message'
        status='warning'
        placeholder='Labeled textarea'
      />
      <LabeledTextarea
        label='Negative textarea'
        message='Angry message'
        status='negative'
        placeholder='Labeled textarea'
      />
    </div>
  );
};

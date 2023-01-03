/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Textarea, LabeledTextarea } from '@itwin/itwinui-react';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <Textarea placeholder={'This is a textarea'} />
      <LabeledTextarea
        label='Textarea label'
        message='Help message'
        placeholder='Labeled textarea'
      />
    </div>
  );
};

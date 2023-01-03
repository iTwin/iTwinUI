/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Input, LabeledInput } from '@itwin/itwinui-react';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
      <Input placeholder='Basic input' />
      <LabeledInput label='Labeled input' message='Input message' />
      <LabeledInput label='Input with status' message='Warning message' status='warning' />
    </div>
  );
};

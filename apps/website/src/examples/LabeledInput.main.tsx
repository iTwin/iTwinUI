/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { LabeledInput } from '@itwin/itwinui-react';

export default () => {
  return (
    <div>
      <LabeledInput label='Input label' message='Help message' placeholder='Labeled input' />
    </div>
  );
};

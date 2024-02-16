/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Checkbox } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <Checkbox label='Default' />
      <Checkbox label='Positive' status='positive' />
      <Checkbox label='Warning' status='warning' />
      <Checkbox label='Negative' status='negative' />
    </div>
  );
};

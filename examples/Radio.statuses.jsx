/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Radio } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <Radio name='Options' label='Default' />
      <Radio name='Options' label='Positive' status='positive' />
      <Radio name='Options' label='Warning' status='warning' />
      <Radio name='Options' label='Negative' status='negative' />
    </div>
  );
};

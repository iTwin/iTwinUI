/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ProgressLinear, ProgressRadial } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <ProgressLinear value={20} style={{ width: '100%' }} />
      <ProgressRadial value={50} />
    </div>
  );
};

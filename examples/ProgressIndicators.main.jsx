/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ProgressLinear, ProgressRadial } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <ProgressLinear style={{ width: '100%' }} />
      <ProgressRadial />
    </div>
  );
};

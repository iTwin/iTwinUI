/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ProgressRadial } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <ProgressRadial size='x-small' />
      <ProgressRadial size='small' />
      <ProgressRadial />
      <ProgressRadial size='large' />
    </div>
  );
};

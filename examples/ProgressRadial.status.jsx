/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ProgressRadial } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <ProgressRadial value={100} status='positive' />
      <ProgressRadial value={50} status='negative' />
      <ProgressRadial value={75} status='warning' />
    </div>
  );
};

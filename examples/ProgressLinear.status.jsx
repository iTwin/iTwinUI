/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ProgressLinear } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <ProgressLinear
        value={100}
        labels={['Upload succeeded!']}
        status='positive'
      />
      <ProgressLinear
        value={50}
        labels={['Upload failed.', '50%']}
        status='negative'
      />
      <ProgressLinear
        value={75}
        labels={['Attention required.', '75%']}
        status='warning'
      />
    </div>
  );
};

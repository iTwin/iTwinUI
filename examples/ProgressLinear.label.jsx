/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ProgressLinear } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <ProgressLinear value={50} labels={['Centered Label']} />
      <ProgressLinear value={50} labels={['Loading...', '50%']} />
    </div>
  );
};

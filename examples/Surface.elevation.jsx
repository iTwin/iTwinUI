/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Surface } from '@itwin/itwinui-react';

export default () => {
  return (
    <>
      <div className='demo-container'>
        <Surface elevation={0} className='demo-card'>
          <p>Elevation 0 (0dp)</p>
        </Surface>
        <Surface elevation={1} className='demo-card'>
          <p>Elevation 1 (2dp)</p>
        </Surface>
        <Surface elevation={2} className='demo-card'>
          <p>Elevation 2 (4dp)</p>
        </Surface>
      </div>
      <div className='demo-container'>
        <Surface elevation={3} className='demo-card'>
          <p>Elevation 3 (8dp)</p>
        </Surface>
        <Surface elevation={4} className='demo-card'>
          <p>Elevation 4 (16dp)</p>
        </Surface>
        <Surface elevation={5} className='demo-card'>
          <p>Elevation 5 (24dp)</p>
        </Surface>
      </div>
    </>
  );
};

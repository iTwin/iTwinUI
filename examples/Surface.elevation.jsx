/*---------------------------------------------------------------------------------------------

* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Surface, Flex } from '@itwin/itwinui-react';
import './Surface.elevation.css';

export default () => {
  return (
    <>
      <Flex gap={'2xl'}>
        <Surface elevation={0} className='elevation-surface-card'>
          <p>Elevation 0 (0dp)</p>
        </Surface>
        <Surface elevation={1} className='elevation-surface-card'>
          <p>Elevation 1 (2dp)</p>
        </Surface>
        <Surface elevation={2} className='elevation-surface-card'>
          <p>Elevation 2 (4dp)</p>
        </Surface>
      </Flex>
      <Flex gap={'2xl'}>
        <Surface elevation={3} className='elevation-surface-card'>
          <p>Elevation 3 (8dp)</p>
        </Surface>
        <Surface elevation={4} className='elevation-surface-card'>
          <p>Elevation 4 (16dp)</p>
        </Surface>
        <Surface elevation={5} className='elevation-surface-card'>
          <p>Elevation 5 (24dp)</p>
        </Surface>
      </Flex>
    </>
  );
};

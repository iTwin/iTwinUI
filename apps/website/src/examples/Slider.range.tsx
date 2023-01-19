/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider } from '@itwin/itwinui-react';

export default () => {
  return (
    <div style={{ width: '300px' }}>
      <Slider
        values={[25, 75]}
        tickLabels={['0', '20', '40', '60', '80', '100']}
        min={0}
        max={100}
      />
    </div>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <Slider
        values={[50]}
        min={0}
        max={100}
        thumbProps={() => {
          return {
            'aria-label': `Choose a value`,
            className: 'demo-thumb',
            children: <span className='demo-thumb-children'>|||</span>,
          };
        }}
      />
    </div>
  );
};

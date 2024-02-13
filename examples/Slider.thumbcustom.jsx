/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider } from '@itwin/itwinui-react';
import './Slider.thumbcustom.css';

export default () => {
  return (
    <div className='thumb-custom-slider-container'>
      <Slider
        values={[50]}
        min={0}
        max={100}
        thumbProps={() => {
          return {
            'aria-label': `Choose a value`,
            className: 'thumb-custom-slider-thumb',
            children: (
              <span className='thumb-custom-slider-thumb-children'>|||</span>
            ),
          };
        }}
      />
    </div>
  );
};

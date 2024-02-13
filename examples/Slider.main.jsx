/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider, Label, InputGrid } from '@itwin/itwinui-react';
import './Slider.main.css';

export default () => {
  const labelId = React.useId();

  return (
    <InputGrid className='main-slider-input-grid'>
      <Label id={labelId} as='div'>
        Choose a value
      </Label>
      <Slider
        thumbProps={() => ({ 'aria-labelledby': labelId })}
        values={[50]}
        min={0}
        max={100}
      />
    </InputGrid>
  );
};

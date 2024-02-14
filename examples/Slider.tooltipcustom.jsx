/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider, Label, InputGrid } from '@itwin/itwinui-react';

export default () => {
  const labelId = React.useId();

  return (
    <InputGrid className='tooltip-custom-slider-input-grid'>
      <Label id={labelId} as='div'>
        Choose a value
      </Label>
      <Slider
        thumbProps={() => ({ 'aria-labelledby': labelId })}
        values={[50]}
        min={0}
        max={100}
        tickLabels={['0', '20', '40', '60', '80', '100']}
        tooltipProps={(index, val) => {
          return { placement: 'right', content: `\$${val}.00` };
        }}
      />
    </InputGrid>
  );
};

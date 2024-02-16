/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider, Label, InputGrid } from '@itwin/itwinui-react';

import {
  SvgSmileyHappyVery,
  SvgSmileySadVery,
} from '@itwin/itwinui-icons-react';

export default () => {
  const labelId = React.useId();

  return (
    <InputGrid className='demo-input-grid'>
      <Label id={labelId} as='div'>
        Choose a happiness level
      </Label>
      <Slider
        thumbProps={() => ({ 'aria-labelledby': labelId })}
        values={[50]}
        minLabel={<SvgSmileySadVery />}
        maxLabel={<SvgSmileyHappyVery />}
        tickLabels={['0', '20', '40', '60', '80', '100']}
        min={0}
        max={100}
        step={10}
      />
    </InputGrid>
  );
};

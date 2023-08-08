/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider, Label } from '@itwin/itwinui-react';

export default () => {
  const labelId = React.useId();

  return (
    <div style={{ width: 'min(100%, 300px)' }}>
      <Label id={labelId} as='div'>
        Choose ranges
      </Label>
      <Slider
        thumbProps={() => ({ 'aria-labelledby': labelId })}
        values={[20, 40, 60, 80]}
        min={0}
        max={100}
        thumbMode='allow-crossing'
        trackDisplayMode='even-segments'
      />
    </div>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider, Label, InputGrid } from '@itwin/itwinui-react';

export default () => {
  const labelId = React.useId();

  return (
    <InputGrid style={{ width: 'min(100%, 300px)' }}>
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

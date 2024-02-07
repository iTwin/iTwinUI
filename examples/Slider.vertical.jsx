/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider } from '@itwin/itwinui-react';

export default () => {
  return (
    <Slider
      thumbProps={() => ({ 'aria-label': `Choose a value` })}
      values={[50]}
      orientation='vertical'
      style={{ height: '300px' }}
    />
  );
};

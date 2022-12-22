/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider, ThemeProvider } from '@itwin/itwinui-react';

export default () => {
  return (
    <ThemeProvider theme='dark' style={{ width: '80%' }}>
      <Slider values={[50]} min={0} max={100} />
    </ThemeProvider>
  );
};

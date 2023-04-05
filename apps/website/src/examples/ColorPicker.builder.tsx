/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ColorBuilder, ColorPicker, ColorValue } from '@itwin/itwinui-react';

export default () => {
  return (
    <ColorPicker selectedColor={ColorValue.create('#8b73ba')}>
      <ColorBuilder />
    </ColorPicker>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ColorSwatch, ColorPicker } from '@itwin/itwinui-react';

export default () => {
  return (
    <ColorPicker>
      <ColorSwatch color='#1ea4fb' />
    </ColorPicker>
  );
};

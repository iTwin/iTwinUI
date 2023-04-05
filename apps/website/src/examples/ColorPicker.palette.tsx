/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ColorPalette, ColorSwatch, ColorPicker, ColorValue } from '@itwin/itwinui-react';

export default () => {
  return (
    <ColorPicker>
      <ColorPalette>
        <ColorSwatch color='#338833' />
        <ColorSwatch color='#448844' />
        <ColorSwatch color='#558855' />
        <ColorSwatch color='#668866' />
        <ColorSwatch color='#778877' />
        <ColorSwatch color='#888888' />
        <ColorSwatch color='#998899' />
        <ColorSwatch color='#aa88aa' />
        <ColorSwatch color='#bb88bb' />
        <ColorSwatch color='#cc88cc' />
      </ColorPalette>
    </ColorPicker>
  );
};

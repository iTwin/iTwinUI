/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Kbd, KbdKeys } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    'div',
    { style: { display: 'flex', gap: '12px' } },
    React.createElement(Kbd, null, KbdKeys.Enter),
    React.createElement(Kbd, null, KbdKeys.Command),
    React.createElement(Kbd, null, KbdKeys.Down),
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tooltip, Button } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Tooltip,
    { placement: 'top', content: 'I am a tooltip' },
    React.createElement(Button, null, 'Please, hover me!'),
  );
};

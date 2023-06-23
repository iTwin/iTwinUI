/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Code } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    React.Fragment,
    null,
    'This is some ',
    React.createElement(Code, null, 'inline code'),
    '.',
  );
};

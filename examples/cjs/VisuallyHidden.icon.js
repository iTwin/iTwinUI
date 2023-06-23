/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { VisuallyHidden } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { 'aria-hidden': 'true' },
      '\u2605\u2605\u2605\u2606\u2606',
    ),
    React.createElement(VisuallyHidden, null, '3 stars out of 5'),
  );
};

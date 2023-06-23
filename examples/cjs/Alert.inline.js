/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Alert } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      { style: { marginBottom: 12 } },
      'Page content before alert.',
    ),
    React.createElement(
      Alert,
      { style: { minWidth: 'min(100%, 280px)' } },
      React.createElement(Alert.Message, null, 'This is a inline alert.'),
    ),
    React.createElement(
      'p',
      { style: { marginTop: 12 } },
      'Page content after alert.',
    ),
  );
};

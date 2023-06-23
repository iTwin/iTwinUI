/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Breadcrumbs, Button } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    'div',
    {
      style: {
        width: '75%',
        minWidth: 150,
        maxWidth: 450,
        border: '1px solid pink',
        padding: 8,
      },
    },
    React.createElement(
      Breadcrumbs,
      null,
      React.createElement(Button, null, 'Root'),
      React.createElement(Button, null, 'My files'),
      React.createElement(Button, null, 'Documents'),
      React.createElement(Button, null, 'Status reports'),
      React.createElement(Button, null, 'December'),
    ),
  );
};

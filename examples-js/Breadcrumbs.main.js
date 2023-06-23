/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Breadcrumbs, Button } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Breadcrumbs,
    null,
    React.createElement(Button, null, 'Root'),
    React.createElement(Button, null, 'Item 1'),
    React.createElement(Button, null, 'Item 2'),
  );
};

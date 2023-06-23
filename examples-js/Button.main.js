/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, Flex } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Flex,
    null,
    React.createElement(Button, null, 'Default'),
    React.createElement(Button, { styleType: 'cta' }, 'Call-to-action'),
    React.createElement(
      Button,
      { styleType: 'high-visibility' },
      'High Visibility',
    ),
    React.createElement(Button, { styleType: 'borderless' }, 'Borderless'),
  );
};

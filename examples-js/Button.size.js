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
    React.createElement(Button, { size: 'small' }, 'Small'),
    React.createElement(Button, null, 'Medium'),
    React.createElement(Button, { size: 'large' }, 'Large'),
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Input, Flex } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Flex,
    { flexDirection: 'column' },
    React.createElement(Input, { placeholder: 'Small', size: 'small' }),
    React.createElement(Input, { placeholder: 'Medium' }),
    React.createElement(Input, { placeholder: 'Large', size: 'large' }),
  );
};

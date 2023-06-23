/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Flex, Radio } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Flex,
    { flexDirection: 'column', alignItems: 'flex-start' },
    React.createElement(Radio, {
      name: 'Options',
      label: 'Option 1',
      defaultChecked: true,
    }),
    React.createElement(Radio, { name: 'Options', label: 'Option 2' }),
    React.createElement(Radio, {
      name: 'Options',
      label: 'Option 3',
      disabled: true,
    }),
  );
};

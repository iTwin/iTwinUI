/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Radio, Flex } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Flex,
    { flexDirection: 'column', alignItems: 'flex-start' },
    React.createElement(Radio, { name: 'Options', label: 'Default' }),
    React.createElement(Radio, {
      name: 'Options',
      label: 'Positive',
      status: 'positive',
    }),
    React.createElement(Radio, {
      name: 'Options',
      label: 'Warning',
      status: 'warning',
    }),
    React.createElement(Radio, {
      name: 'Options',
      label: 'Negative',
      status: 'negative',
    }),
  );
};

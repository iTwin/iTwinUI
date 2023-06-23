/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Checkbox, Flex } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Flex,
    { flexDirection: 'column', alignItems: 'flex-start' },
    React.createElement(Checkbox, { label: 'Option 1', defaultChecked: true }),
    React.createElement(Checkbox, { label: 'Option 2' }),
    React.createElement(Checkbox, {
      label: 'Option 3',
      defaultChecked: true,
      disabled: true,
    }),
    React.createElement(Checkbox, { label: 'Option 4', disabled: true }),
  );
};

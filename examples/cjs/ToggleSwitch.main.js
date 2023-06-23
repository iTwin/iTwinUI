/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ToggleSwitch, Flex } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Flex,
    { flexDirection: 'column', alignItems: 'flex-start' },
    React.createElement(ToggleSwitch, {
      label: 'Option 1',
      defaultChecked: true,
    }),
    React.createElement(ToggleSwitch, {
      label: 'Option 2',
      defaultChecked: false,
    }),
    React.createElement(ToggleSwitch, {
      label: 'Option 3',
      defaultChecked: true,
      disabled: true,
    }),
    React.createElement(ToggleSwitch, {
      label: 'Option 4',
      defaultChecked: false,
      disabled: true,
    }),
  );
};

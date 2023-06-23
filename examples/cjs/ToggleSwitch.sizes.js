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
      label: 'Small',
      size: 'small',
      defaultChecked: true,
    }),
    React.createElement(ToggleSwitch, {
      label: 'Medium',
      defaultChecked: true,
    }),
  );
};

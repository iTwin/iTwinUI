/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ToggleSwitch, Flex } from '@itwin/itwinui-react';
import { SvgCheckmark } from '@itwin/itwinui-icons-react';
export default () => {
  return React.createElement(
    Flex,
    { flexDirection: 'column', alignItems: 'flex-start' },
    React.createElement(ToggleSwitch, {
      label: 'Option 1',
      icon: React.createElement(SvgCheckmark, null),
      defaultChecked: true,
    }),
    React.createElement(ToggleSwitch, {
      label: 'Option 2',
      icon: React.createElement(SvgCheckmark, null),
      defaultChecked: true,
      disabled: true,
    }),
  );
};

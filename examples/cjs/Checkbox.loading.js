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
    React.createElement(Checkbox, {
      label: 'Enable 2D mode',
      defaultChecked: true,
    }),
    React.createElement(Checkbox, { label: 'Enable 3D mode', isLoading: true }),
    React.createElement(Checkbox, { label: 'Enable 4D mode', disabled: true }),
  );
};

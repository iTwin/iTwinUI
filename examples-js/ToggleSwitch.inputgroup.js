/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ToggleSwitch, InputGroup } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    InputGroup,
    { label: 'Home lights' },
    React.createElement(ToggleSwitch, {
      label: 'Dining room',
      defaultChecked: true,
    }),
    React.createElement(ToggleSwitch, {
      label: 'Garage',
      defaultChecked: false,
    }),
    React.createElement(ToggleSwitch, {
      label: 'Kitchen',
      defaultChecked: true,
    }),
    React.createElement(ToggleSwitch, {
      label: 'Living room',
      defaultChecked: false,
    }),
  );
};

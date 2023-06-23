/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Fieldset,
  InputGroup,
  Radio,
  ToggleSwitch,
} from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Fieldset,
    {
      legend: 'General Settings',
      style: { display: 'flex', flexDirection: 'column', gap: 11 },
    },
    React.createElement(
      InputGroup,
      { label: 'Color Theme' },
      React.createElement(Radio, {
        name: 'choice',
        value: 'option1',
        label: 'Light',
      }),
      React.createElement(Radio, {
        name: 'choice',
        value: 'option2',
        label: 'Dark',
      }),
      React.createElement(Radio, {
        name: 'choice',
        value: 'option3',
        label: 'Match device',
      }),
    ),
    React.createElement(
      InputGroup,
      null,
      React.createElement(ToggleSwitch, { label: 'Share crash logs' }),
      React.createElement(ToggleSwitch, {
        disabled: true,
        label: 'Advanced settings',
      }),
    ),
  );
};

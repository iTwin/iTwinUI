/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { InputGroup, Surface, ToggleSwitch } from '@itwin/itwinui-react';
import { SvgCheckmark } from '@itwin/itwinui-icons-react';
export default () => {
  const [option1, setOption1] = React.useState(true);
  const [option2, setOption2] = React.useState(false);
  return React.createElement(
    Surface,
    null,
    React.createElement(
      InputGroup,
      { label: 'Toggle group', style: { padding: '12px' } },
      React.createElement(ToggleSwitch, {
        onChange: (event) => setOption1(event.target.checked),
        checked: option1,
        label: 'Toggle feature No.1',
        icon: React.createElement(SvgCheckmark, null),
      }),
      React.createElement(ToggleSwitch, {
        checked: true,
        disabled: true,
        label: 'This you cannot change',
      }),
      React.createElement(ToggleSwitch, {
        onChange: (event) => setOption2(event.target.checked),
        label: 'Toggle feature No.2',
        checked: option2,
      }),
    ),
  );
};

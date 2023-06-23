/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tooltip, Badge, Button } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        gap: 'var(--iui-size-s)',
        placeItems: 'center',
      },
    },
    React.createElement(
      Tooltip,
      { placement: 'left', content: 'left tooltip' },
      React.createElement(Button, null, 'Left'),
    ),
    React.createElement(
      Tooltip,
      { placement: 'top', content: 'top tooltip' },
      React.createElement(Button, null, 'Top'),
    ),
    React.createElement(
      Tooltip,
      { placement: 'bottom', content: 'bottom tooltip' },
      React.createElement(Button, null, 'Bottom'),
    ),
    React.createElement(
      Tooltip,
      { placement: 'right', content: 'right tooltip' },
      React.createElement(Button, null, 'Right'),
    ),
  );
};

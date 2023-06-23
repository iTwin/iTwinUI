/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { VisuallyHidden } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    'ul',
    null,
    React.createElement(
      'li',
      null,
      'Item 1',
      ' ',
      React.createElement(
        'button',
        null,
        'Delete ',
        React.createElement(VisuallyHidden, null, 'item 1'),
      ),
    ),
    React.createElement(
      'li',
      null,
      'Item 2',
      ' ',
      React.createElement(
        'button',
        null,
        'Delete ',
        React.createElement(VisuallyHidden, null, 'item 2'),
      ),
    ),
    React.createElement(
      'li',
      null,
      'Item 3',
      ' ',
      React.createElement(
        'button',
        null,
        'Delete ',
        React.createElement(VisuallyHidden, null, 'item 3'),
      ),
    ),
  );
};

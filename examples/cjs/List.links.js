/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { List, ListItem, LinkAction } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    List,
    null,
    React.createElement(
      ListItem,
      { actionable: true },
      React.createElement(
        LinkAction,
        { href: 'https://itwinui.bentley.com/docs/button' },
        'Buttons',
      ),
    ),
    React.createElement(
      ListItem,
      { actionable: true },
      React.createElement(
        LinkAction,
        { href: 'https://itwinui.bentley.com/docs/input' },
        'Inputs',
      ),
    ),
    React.createElement(
      ListItem,
      { actionable: true },
      React.createElement(
        LinkAction,
        { href: 'https://itwinui.bentley.com/docs/dialog' },
        'Dialog',
      ),
    ),
  );
};

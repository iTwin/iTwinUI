/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { List, ListItem } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    List,
    null,
    React.createElement(ListItem, null, 'Milk'),
    React.createElement(ListItem, null, 'Cheese'),
    React.createElement(ListItem, null, 'Yogurt'),
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { List, ListItem } from '@itwin/itwinui-react';
import { SvgPlaceholder, SvgCheckmarkSmall } from '@itwin/itwinui-icons-react';
export default () => {
  return React.createElement(
    List,
    null,
    React.createElement(
      ListItem,
      { size: 'large' },
      React.createElement(
        ListItem.Icon,
        null,
        React.createElement(SvgPlaceholder, null),
      ),
      React.createElement(
        ListItem.Content,
        null,
        React.createElement('div', null, 'Milk'),
        React.createElement(
          ListItem.Description,
          null,
          'Whole, almond or oat milk',
        ),
      ),
    ),
    React.createElement(
      ListItem,
      { size: 'large' },
      React.createElement(
        ListItem.Icon,
        null,
        React.createElement(SvgPlaceholder, null),
      ),
      React.createElement(
        ListItem.Content,
        null,
        React.createElement('div', null, 'Cheese'),
        React.createElement(ListItem.Description, null, 'Blue or feta'),
      ),
      React.createElement(
        ListItem.Icon,
        null,
        React.createElement(SvgCheckmarkSmall, null),
      ),
    ),
    React.createElement(
      ListItem,
      { size: 'large' },
      React.createElement(
        ListItem.Icon,
        null,
        React.createElement(SvgPlaceholder, null),
      ),
      'Yogurt',
    ),
  );
};

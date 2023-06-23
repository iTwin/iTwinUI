/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Breadcrumbs,
  Button,
  DropdownMenu,
  MenuItem,
  IconButton,
} from '@itwin/itwinui-react';
import { SvgMore } from '@itwin/itwinui-icons-react';
export default () => {
  const items = Array(10)
    .fill(null)
    .map((_, index) =>
      React.createElement(Button, { key: index }, 'Item ', index),
    );
  return React.createElement(
    'div',
    {
      style: {
        width: '75%',
        minWidth: 150,
        maxWidth: 425,
        border: '1px solid lightpink',
        padding: 8,
      },
    },
    React.createElement(
      Breadcrumbs,
      {
        overflowButton: (visibleCount) =>
          React.createElement(
            DropdownMenu,
            {
              menuItems: (close) =>
                Array(items.length - visibleCount)
                  .fill(null)
                  .map((_, _index) => {
                    const index = visibleCount > 1 ? _index + 1 : _index;
                    const onClick = () => {
                      // open breadcrumb
                      close();
                    };
                    return React.createElement(
                      MenuItem,
                      { key: index, onClick: onClick },
                      'Item ',
                      index,
                    );
                  }),
            },
            React.createElement(
              IconButton,
              { 'aria-label': 'Dropdown with more breadcrumbs' },
              React.createElement(SvgMore, null),
            ),
          ),
      },
      items,
    ),
  );
};

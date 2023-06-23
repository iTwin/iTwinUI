/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { MenuItem, DropdownMenu, IconButton } from '@itwin/itwinui-react';
import { SvgMore } from '@itwin/itwinui-icons-react';
export default () => {
  const dropdownMenuItems = (close) => [
    React.createElement(
      MenuItem,
      { key: 1, onClick: () => close() },
      'Item #1',
    ),
    React.createElement(
      MenuItem,
      { key: 2, onClick: () => close() },
      'Item #2',
    ),
    React.createElement(
      MenuItem,
      {
        key: 3,
        subMenuItems: [
          React.createElement(
            MenuItem,
            {
              key: 4,
              subMenuItems: [
                React.createElement(
                  MenuItem,
                  { key: 7, onClick: () => close() },
                  'Item #7',
                ),
                React.createElement(
                  MenuItem,
                  { key: 8, onClick: () => close() },
                  'Item #8',
                ),
              ],
            },
            'Item #4',
          ),
          React.createElement(
            MenuItem,
            { key: 5, onClick: () => close() },
            'Item #5',
          ),
          React.createElement(
            MenuItem,
            {
              key: 6,
              subMenuItems: [
                React.createElement(
                  MenuItem,
                  { key: 9, onClick: () => close() },
                  'Item #9',
                ),
                React.createElement(
                  MenuItem,
                  { key: 10, onClick: () => close() },
                  'Item #10',
                ),
              ],
            },
            'Item #6',
          ),
        ],
      },
      'Item #3',
    ),
  ];
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      DropdownMenu,
      { menuItems: dropdownMenuItems },
      React.createElement(
        IconButton,
        { 'aria-label': 'More options' },
        React.createElement(SvgMore, null),
      ),
    ),
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  MenuItem,
  DropdownMenu,
  IconButton,
  MenuDivider,
} from '@itwin/itwinui-react';
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
    React.createElement(MenuDivider, { key: 3 }),
    React.createElement(
      MenuItem,
      { key: 4, onClick: () => close(), disabled: true },
      'Item #3',
    ),
    React.createElement(
      MenuItem,
      { key: 5, onClick: () => close() },
      'Item #4',
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

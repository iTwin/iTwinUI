/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { MenuItem, DropdownMenu, IconButton } from '@itwin/itwinui-react';
import { SvgMore, SvgPlaceholder } from '@itwin/itwinui-icons-react';
export default () => {
  const dropdownMenuItems = (close) => [
    React.createElement(
      MenuItem,
      {
        key: 1,
        onClick: () => close(),
        startIcon: React.createElement(SvgPlaceholder, null),
        sublabel: 'Sublabel #1',
      },
      'Item #1',
    ),
    React.createElement(
      MenuItem,
      {
        key: 2,
        onClick: () => close(),
        startIcon: React.createElement(SvgPlaceholder, null),
        sublabel: 'Sublabel #2',
      },
      'Item #2',
    ),
    React.createElement(
      MenuItem,
      {
        key: 3,
        onClick: () => close(),
        startIcon: React.createElement(SvgPlaceholder, null),
        sublabel: 'Sublabel #3',
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

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { MenuItem, DropdownMenu, IconButton } from '@itwin/itwinui-react';
import {
  SvgMore,
  SvgCrop,
  SvgClipboard,
  SvgMove,
} from '@itwin/itwinui-icons-react';
export default () => {
  const dropdownMenuItems = (close) => [
    React.createElement(
      MenuItem,
      {
        key: 1,
        onClick: () => close(),
        startIcon: React.createElement(SvgCrop, null),
      },
      'Crop',
    ),
    React.createElement(
      MenuItem,
      {
        key: 2,
        onClick: () => close(),
        startIcon: React.createElement(SvgClipboard, null),
      },
      'Paste',
    ),
    React.createElement(
      MenuItem,
      {
        key: 3,
        onClick: () => close(),
        startIcon: React.createElement(SvgMove, null),
      },
      'Move',
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

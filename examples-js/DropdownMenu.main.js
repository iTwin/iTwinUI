/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Text,
  MenuExtraContent,
  MenuDivider,
  MenuItem,
  DropdownMenu,
  IconButton,
} from '@itwin/itwinui-react';
import { SvgMore } from '@itwin/itwinui-icons-react';
export default () => {
  const dropdownMenuItems = (close) => [
    React.createElement(
      MenuExtraContent,
      { key: 0 },
      React.createElement(
        React.Fragment,
        null,
        React.createElement(Text, { variant: 'leading' }, 'Terry Rivers'),
        React.createElement(Text, { isMuted: true }, 'terry.rivers@email.com'),
      ),
    ),
    React.createElement(MenuDivider, { key: 1 }),
    React.createElement(
      MenuItem,
      { key: 2, onClick: () => close() },
      'View profile',
    ),
    React.createElement(
      MenuItem,
      { key: 3, onClick: () => close() },
      'Sign out',
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

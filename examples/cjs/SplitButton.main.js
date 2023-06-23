/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { MenuItem, SplitButton } from '@itwin/itwinui-react';
export default () => {
  const onMenuItemClick = (index, close) => () => {
    close();
  };
  const buttonMenuItems = (close) => [
    React.createElement(
      MenuItem,
      { key: 1, onClick: onMenuItemClick(1, close) },
      'Item #1',
    ),
    React.createElement(
      MenuItem,
      { key: 2, onClick: onMenuItemClick(2, close) },
      'Item #2',
    ),
    React.createElement(
      MenuItem,
      { key: 3, onClick: onMenuItemClick(3, close) },
      'Item #3',
    ),
  ];
  return React.createElement(
    SplitButton,
    { onClick: () => {}, menuItems: buttonMenuItems, styleType: 'default' },
    'Default',
  );
};

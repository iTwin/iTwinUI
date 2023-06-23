/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  ButtonGroup,
  DropdownMenu,
  IconButton,
  MenuItem,
} from '@itwin/itwinui-react';
import { SvgMore, SvgPlaceholder } from '@itwin/itwinui-icons-react';
export default () => {
  const buttons = Array(12)
    .fill(null)
    .map((_, _index) => {
      return React.createElement(
        IconButton,
        null,
        React.createElement(SvgPlaceholder, null),
      );
    });
  return React.createElement(
    'div',
    { style: { maxWidth: '70%' } },
    React.createElement(
      ButtonGroup,
      {
        overflowButton: (overflowStart) =>
          React.createElement(
            DropdownMenu,
            {
              menuItems: (close) =>
                Array(buttons.length - overflowStart + 1)
                  .fill(null)
                  .map((_, _index) => {
                    const index = overflowStart + _index;
                    const onClick = () => {
                      close();
                    };
                    return React.createElement(
                      MenuItem,
                      {
                        key: index,
                        onClick: onClick,
                        startIcon: React.createElement(SvgPlaceholder, null),
                      },
                      'Button #',
                      index,
                    );
                  }),
            },
            React.createElement(
              IconButton,
              null,
              React.createElement(SvgMore, null),
            ),
          ),
      },
      buttons,
    ),
  );
};

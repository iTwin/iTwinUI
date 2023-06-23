/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ButtonGroup, IconButton, Flex, Button } from '@itwin/itwinui-react';
import {
  SvgAdd,
  SvgEdit,
  SvgDelete,
  SvgUndo,
  SvgSearch,
  SvgFilter,
} from '@itwin/itwinui-icons-react';
export default () => {
  return React.createElement(
    Flex,
    { style: { width: '60%' } },
    React.createElement(
      Button,
      {
        styleType: 'high-visibility',
        startIcon: React.createElement(SvgAdd, null),
      },
      'New',
    ),
    React.createElement(
      ButtonGroup,
      null,
      React.createElement(IconButton, null, React.createElement(SvgEdit, null)),
      React.createElement(
        IconButton,
        { disabled: true },
        React.createElement(SvgDelete, null),
      ),
      React.createElement(IconButton, null, React.createElement(SvgUndo, null)),
    ),
    React.createElement(Flex.Spacer, null),
    React.createElement(
      ButtonGroup,
      null,
      React.createElement(
        IconButton,
        { isActive: true },
        React.createElement(SvgFilter, null),
      ),
      React.createElement(
        IconButton,
        null,
        React.createElement(SvgSearch, null),
      ),
    ),
  );
};

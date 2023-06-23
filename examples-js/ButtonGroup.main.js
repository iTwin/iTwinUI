/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ButtonGroup, IconButton } from '@itwin/itwinui-react';
import {
  SvgAdd,
  SvgEdit,
  SvgDelete,
  SvgUndo,
} from '@itwin/itwinui-icons-react';
export default () => {
  return React.createElement(
    ButtonGroup,
    null,
    React.createElement(
      IconButton,
      { onClick: () => {} },
      React.createElement(SvgAdd, null),
    ),
    React.createElement(
      IconButton,
      { onClick: () => {}, isActive: true },
      React.createElement(SvgEdit, null),
    ),
    React.createElement(
      IconButton,
      { disabled: true, onClick: () => {} },
      React.createElement(SvgDelete, null),
    ),
    React.createElement(
      IconButton,
      { onClick: () => {} },
      React.createElement(SvgUndo, null),
    ),
  );
};

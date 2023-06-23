/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  ButtonGroup,
  IconButton,
  Input,
  Flex,
  Button,
} from '@itwin/itwinui-react';
import { SvgSearch } from '@itwin/itwinui-icons-react';
export default () => {
  return React.createElement(
    Flex,
    { flexDirection: 'column', gap: 'm' },
    React.createElement(
      ButtonGroup,
      null,
      React.createElement(Button, null, 'Button 1'),
      React.createElement(Input, null),
      React.createElement(
        IconButton,
        null,
        React.createElement(SvgSearch, null),
      ),
    ),
    React.createElement(
      ButtonGroup,
      null,
      React.createElement(Input, {
        value: 'https://itwinui.bentley.com/docs/buttongroup',
      }),
      React.createElement(Button, { styleType: 'high-visibility' }, 'Copy'),
    ),
  );
};

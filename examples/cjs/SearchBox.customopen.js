/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SearchBox, Divider, Flex, Text } from '@itwin/itwinui-react';
import {
  SvgCaretUpSmall,
  SvgCaretDownSmall,
  SvgCloseSmall,
} from '@itwin/itwinui-icons-react';
export default () => {
  return React.createElement(
    Flex,
    { style: { width: '70%' }, justifyContent: 'center' },
    React.createElement(
      SearchBox,
      null,
      React.createElement(SearchBox.Input, {
        placeholder: 'Basic search with custom interactions',
      }),
      React.createElement(
        Text,
        {
          isMuted: true,
          variant: 'body',
          as: 'p',
          style: { paddingRight: 'var(--iui-size-s)', alignSelf: 'center' },
        },
        '0/3',
      ),
      React.createElement(Divider, { orientation: 'vertical' }),
      React.createElement(
        SearchBox.Button,
        { label: 'Previous result' },
        React.createElement(SvgCaretUpSmall, null),
      ),
      React.createElement(
        SearchBox.Button,
        { label: 'Next result' },
        React.createElement(SvgCaretDownSmall, null),
      ),
      React.createElement(
        SearchBox.Button,
        { label: 'Clear search' },
        React.createElement(SvgCloseSmall, null),
      ),
    ),
  );
};

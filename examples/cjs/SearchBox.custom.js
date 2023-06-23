/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SearchBox, Divider, Flex } from '@itwin/itwinui-react';
import {
  SvgCaretUpSmall,
  SvgCaretDownSmall,
  SvgAirplane,
} from '@itwin/itwinui-icons-react';
export default () => {
  return React.createElement(
    Flex,
    {
      style: { width: '70%' },
      justifyContent: 'center',
      flexDirection: 'column',
    },
    React.createElement(
      SearchBox,
      { expandable: true },
      React.createElement(
        SearchBox.CollapsedState,
        null,
        React.createElement(
          SearchBox.ExpandButton,
          null,
          React.createElement(SvgAirplane, null),
        ),
      ),
      React.createElement(
        SearchBox.ExpandedState,
        null,
        React.createElement(SearchBox.Input, {
          placeholder: 'Expandable search with custom interactions',
        }),
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
        React.createElement(Divider, { orientation: 'vertical' }),
        React.createElement(SearchBox.CollapseButton, {
          label: 'Close search',
        }),
      ),
    ),
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Surface, Text, Flex, Anchor, Divider } from '@itwin/itwinui-react';
export default () => {
  const listStyle = {
    padding: 'var(--iui-size-s)',
    position: 'relative',
  };
  const cardStyle = {
    maxHeight: '300px',
  };
  return React.createElement(
    Surface,
    { elevation: 3, style: cardStyle },
    React.createElement(
      Surface.Header,
      null,
      React.createElement(
        Text,
        { variant: 'subheading', as: 'h2' },
        'Surface with overflow & no body padding',
      ),
    ),
    React.createElement(
      Surface.Body,
      { isPadded: false },
      React.createElement(
        Flex,
        { flexDirection: 'column', style: { flex: '1' } },
        React.createElement(
          'ul',
          {
            style: {
              width: '100%',
              listStyle: 'none',
              margin: '0',
              padding: '0',
            },
          },
          React.createElement(
            'li',
            { style: listStyle },
            React.createElement(Anchor, null, 'Daily log'),
          ),
          React.createElement(Divider, null),
          React.createElement(
            'li',
            { style: listStyle },
            React.createElement(Anchor, null, 'Inspections'),
          ),
          React.createElement(Divider, null),
          React.createElement(
            'li',
            { style: listStyle },
            React.createElement(Anchor, null, 'Issues'),
          ),
          React.createElement(Divider, null),
          React.createElement(
            'li',
            { style: listStyle },
            React.createElement(Anchor, null, 'Observations'),
          ),
          React.createElement(Divider, null),
          React.createElement(
            'li',
            { style: listStyle },
            React.createElement(Anchor, null, 'RFIs'),
          ),
          React.createElement(Divider, null),
          React.createElement(
            'li',
            { style: listStyle },
            React.createElement(Anchor, null, 'Weather delay notices'),
          ),
        ),
      ),
    ),
  );
};

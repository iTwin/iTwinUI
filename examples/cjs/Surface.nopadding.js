'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var listStyle = {
    padding: 'var(--iui-size-s)',
    position: 'relative',
  };
  var cardStyle = {
    maxHeight: '300px',
  };
  return (
    <itwinui_react_1.Surface elevation={3} style={cardStyle}>
      <itwinui_react_1.Surface.Header>
        <itwinui_react_1.Text variant='subheading' as='h2'>
          Surface with overflow & no body padding
        </itwinui_react_1.Text>
      </itwinui_react_1.Surface.Header>
      <itwinui_react_1.Surface.Body isPadded={false}>
        <itwinui_react_1.Flex flexDirection='column' style={{ flex: '1' }}>
          <ul
            style={{
              width: '100%',
              listStyle: 'none',
              margin: '0',
              padding: '0',
            }}
          >
            <li style={listStyle}>
              <itwinui_react_1.Anchor>Daily log</itwinui_react_1.Anchor>
            </li>
            <itwinui_react_1.Divider />
            <li style={listStyle}>
              <itwinui_react_1.Anchor>Inspections</itwinui_react_1.Anchor>
            </li>
            <itwinui_react_1.Divider />
            <li style={listStyle}>
              <itwinui_react_1.Anchor>Issues</itwinui_react_1.Anchor>
            </li>
            <itwinui_react_1.Divider />
            <li style={listStyle}>
              <itwinui_react_1.Anchor>Observations</itwinui_react_1.Anchor>
            </li>
            <itwinui_react_1.Divider />
            <li style={listStyle}>
              <itwinui_react_1.Anchor>RFIs</itwinui_react_1.Anchor>
            </li>
            <itwinui_react_1.Divider />
            <li style={listStyle}>
              <itwinui_react_1.Anchor>
                Weather delay notices
              </itwinui_react_1.Anchor>
            </li>
          </ul>
        </itwinui_react_1.Flex>
      </itwinui_react_1.Surface.Body>
    </itwinui_react_1.Surface>
  );
};

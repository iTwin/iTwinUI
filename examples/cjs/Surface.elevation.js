'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------

* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var cardStyle = {
    display: 'flex',
    width: '100px',
    padding: '12px',
    justifyContent: 'center',
    textAlign: 'center',
    flex: '1',
  };
  return (
    <>
      <itwinui_react_1.Flex gap={'2xl'}>
        <itwinui_react_1.Surface elevation={0} style={cardStyle}>
          <p>Elevation 0 (0dp)</p>
        </itwinui_react_1.Surface>
        <itwinui_react_1.Surface elevation={1} style={cardStyle}>
          <p>Elevation 1 (2dp)</p>
        </itwinui_react_1.Surface>
        <itwinui_react_1.Surface elevation={2} style={cardStyle}>
          <p>Elevation 2 (4dp)</p>
        </itwinui_react_1.Surface>
      </itwinui_react_1.Flex>
      <itwinui_react_1.Flex gap={'2xl'}>
        <itwinui_react_1.Surface elevation={3} style={cardStyle}>
          <p>Elevation 3 (8dp)</p>
        </itwinui_react_1.Surface>
        <itwinui_react_1.Surface elevation={4} style={cardStyle}>
          <p>Elevation 4 (16dp)</p>
        </itwinui_react_1.Surface>
        <itwinui_react_1.Surface elevation={5} style={cardStyle}>
          <p>Elevation 5 (24dp)</p>
        </itwinui_react_1.Surface>
      </itwinui_react_1.Flex>
    </>
  );
};

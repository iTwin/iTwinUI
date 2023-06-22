'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  return (
    <div>
      <p style={{ marginBottom: 12 }}>Page content before alert.</p>
      <itwinui_react_1.Alert style={{ minWidth: 'min(100%, 280px)' }}>
        <itwinui_react_1.Alert.Message>
          This is a inline alert.
        </itwinui_react_1.Alert.Message>
      </itwinui_react_1.Alert>
      <p style={{ marginTop: 12 }}>Page content after alert.</p>
    </div>
  );
};

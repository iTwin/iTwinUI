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
    <itwinui_react_1.Alert
      type='positive'
      style={{ minWidth: 'min(100%, 350px)' }}
    >
      <itwinui_react_1.Alert.Icon />
      <itwinui_react_1.Alert.Message>
        This is a positive alert
        <itwinui_react_1.Alert.Action
          onClick={function () {
            return console.log('Clicked more info!');
          }}
        >
          Learn more
        </itwinui_react_1.Alert.Action>
      </itwinui_react_1.Alert.Message>
      <itwinui_react_1.Alert.CloseButton
        onClick={function () {
          return console.log('CLOSED');
        }}
      />
    </itwinui_react_1.Alert>
  );
};

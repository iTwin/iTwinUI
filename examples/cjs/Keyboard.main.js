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
    <div style={{ display: 'flex', gap: '12px' }}>
      <itwinui_react_1.Kbd>{itwinui_react_1.KbdKeys.Enter}</itwinui_react_1.Kbd>
      <itwinui_react_1.Kbd>
        {itwinui_react_1.KbdKeys.Command}
      </itwinui_react_1.Kbd>
      <itwinui_react_1.Kbd>{itwinui_react_1.KbdKeys.Down}</itwinui_react_1.Kbd>
    </div>
  );
};

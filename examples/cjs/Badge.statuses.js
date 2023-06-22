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
    <div
      style={{
        display: 'flex',
        columnGap: 4,
        placeItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <itwinui_react_1.Badge>Default</itwinui_react_1.Badge>
      <itwinui_react_1.Badge backgroundColor='primary'>
        Informational
      </itwinui_react_1.Badge>
      <itwinui_react_1.Badge backgroundColor='positive'>
        Positive
      </itwinui_react_1.Badge>
      <itwinui_react_1.Badge backgroundColor='warning'>
        Warning
      </itwinui_react_1.Badge>
      <itwinui_react_1.Badge backgroundColor='negative'>
        Negative
      </itwinui_react_1.Badge>
    </div>
  );
};

'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var startDate = new Date(2023, 6, 5, 14, 55, 22);
  var endDate = new Date(2023, 6, 12, 14, 55, 27);
  return (
    <itwinui_react_1.DatePicker
      enableRangeSelect={true}
      startDate={startDate}
      endDate={endDate}
    />
  );
};

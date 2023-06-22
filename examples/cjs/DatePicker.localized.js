'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var _a = React.useState(new Date()),
    currentDate = _a[0],
    setCurrentDate = _a[1];
  var localizedNames = (0, itwinui_react_1.generateLocalizedStrings)('ja');
  return (
    <itwinui_react_1.DatePicker
      date={currentDate}
      localizedNames={localizedNames}
      onChange={function (date) {
        setCurrentDate(date);
      }}
    />
  );
};

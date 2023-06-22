'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
var itwinui_icons_react_1 = require('@itwin/itwinui-icons-react');
exports['default'] = function () {
  var _a = React.useState(new Date()),
    currentDate = _a[0],
    setCurrentDate = _a[1];
  var _b = React.useState(false),
    opened = _b[0],
    setOpened = _b[1];
  return (
    <>
      <itwinui_react_1.IconButton
        onClick={function () {
          return setOpened(!opened);
        }}
        id='picker-button'
      >
        <itwinui_icons_react_1.SvgCalendar />
      </itwinui_react_1.IconButton>
      <span style={{ marginLeft: 16 }}>{currentDate.toString()}</span>
      {opened && (
        <div style={{ marginTop: 4 }}>
          <itwinui_react_1.DatePicker
            showYearSelection
            date={currentDate}
            onChange={function (date) {
              setCurrentDate(date);
            }}
          />
        </div>
      )}
    </>
  );
};

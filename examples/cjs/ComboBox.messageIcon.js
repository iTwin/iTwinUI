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
  var _a = React.useState(''),
    value = _a[0],
    setValue = _a[1];
  var options = React.useMemo(function () {
    return [
      { label: '9:30 AM', value: '9:30' },
      { label: '10:00 AM', value: '10:00' },
      { label: '10:30 AM', value: '10:30' },
      { label: '1:00 PM', value: '1:00' },
      { label: '2:00 PM', value: '2:00' },
      { label: '2:30 PM', value: '2:30' },
      { label: '4:30 PM', value: '4:30' },
    ];
  }, []);
  return (
    <itwinui_react_1.ComboBox
      options={options}
      message={
        <itwinui_react_1.StatusMessage
          startIcon={<itwinui_icons_react_1.SvgClock />}
        >
          Appointments run for 30 minutes.
        </itwinui_react_1.StatusMessage>
      }
      inputProps={{ placeholder: 'Select appointment time' }}
      onChange={setValue}
      value={value}
    />
  );
};

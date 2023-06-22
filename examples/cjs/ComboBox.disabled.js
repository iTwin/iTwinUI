'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var _a = React.useState(''),
    value = _a[0],
    setValue = _a[1];
  var courses = React.useMemo(function () {
    return [
      { label: 'User Interface Design', value: '6620', hasPrereq: false },
      { label: 'Machine Learning', value: '6630', hasPrereq: false },
      { label: 'Quality Assurance', value: '5710', hasPrereq: true },
      { label: 'Data mining', value: '5130', hasPrereq: true },
      { label: 'Digital Forensics', value: '5350', hasPrereq: true },
      { label: 'Wireless and Mobile Networks', value: '3370', hasPrereq: true },
      {
        label: 'Software Reverse Engineering',
        value: '7720',
        hasPrereq: false,
      },
      { label: 'Web Application Development', value: '5000', hasPrereq: true },
      { label: 'Database Systems', value: '5120', hasPrereq: true },
    ];
  }, []);
  var options = React.useMemo(function () {
    return courses.map(function (course, index) {
      return __assign(__assign({}, course), {
        sublabel: 'COMP '
          .concat(course.value)
          .concat(course.hasPrereq ? ' - needs pre-requisite' : ''),
        disabled: course.hasPrereq,
      });
    });
  }, []);
  return (
    <itwinui_react_1.ComboBox
      options={options}
      value={value}
      onChange={setValue}
      inputProps={{ placeholder: 'Select elective' }}
    />
  );
};

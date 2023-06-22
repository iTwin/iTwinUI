'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var option1Label = 'Football';
  var option2Label = 'Hockey';
  var _a = React.useState(true),
    option1 = _a[0],
    setOption1 = _a[1];
  var _b = React.useState(false),
    option2 = _b[0],
    setOption2 = _b[1];
  var _c = React.useState(false),
    allOptions = _c[0],
    setAllOptions = _c[1];
  var _d = React.useState(true),
    isIndeterminate = _d[0],
    setIsIndeterminate = _d[1];
  React.useEffect(
    function () {
      if (option1 && option2) {
        setAllOptions(true);
        setIsIndeterminate(false);
        return;
      }
      if (option1 || option2) {
        setAllOptions(false);
        setIsIndeterminate(true);
      } else {
        setAllOptions(false);
        setIsIndeterminate(false);
      }
    },
    [option1, option2],
  );
  var onAllChange = function (value) {
    setAllOptions(value);
    setIsIndeterminate(false);
    setOption1(value);
    setOption2(value);
  };
  return (
    <itwinui_react_1.InputGroup
      label='Select your hobbies'
      message='Choose some hobbies'
    >
      <itwinui_react_1.Checkbox
        onChange={function (event) {
          return onAllChange(event.target.checked);
        }}
        label='Select all'
        indeterminate={isIndeterminate}
        checked={allOptions}
      />
      <itwinui_react_1.Checkbox
        onChange={function (event) {
          return setOption1(event.target.checked);
        }}
        label={option1Label}
        checked={option1}
      />
      <itwinui_react_1.Checkbox
        onChange={function (event) {
          return setOption2(event.target.checked);
        }}
        label={option2Label}
        checked={option2}
      />
    </itwinui_react_1.InputGroup>
  );
};

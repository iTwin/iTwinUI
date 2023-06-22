'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var _a = React.useState(false),
    option1 = _a[0],
    setOption1 = _a[1];
  var _b = React.useState(true),
    option2 = _b[0],
    setOption2 = _b[1];
  var allOptions = option1 && option2;
  var isIndeterminate = !(option1 && option2) && (option1 || option2);
  var onAllChange = function (value) {
    setOption1(value);
    setOption2(value);
  };
  return (
    <itwinui_react_1.Flex flexDirection='column' alignItems='flex-start'>
      <itwinui_react_1.Checkbox
        label='Option 1'
        onChange={function (event) {
          return onAllChange(event.target.checked);
        }}
        indeterminate={isIndeterminate}
        checked={allOptions}
      />
      <itwinui_react_1.Flex
        flexDirection='column'
        alignItems='flex-start'
        style={{ marginLeft: 'var(--iui-size-l)' }}
      >
        <itwinui_react_1.Checkbox
          label='Option 1.1'
          checked={option1}
          onChange={function (event) {
            return setOption1(event.target.checked);
          }}
        />
        <itwinui_react_1.Checkbox
          label='Option 1.2'
          checked={option2}
          onChange={function (event) {
            return setOption2(event.target.checked);
          }}
        />
      </itwinui_react_1.Flex>
    </itwinui_react_1.Flex>
  );
};

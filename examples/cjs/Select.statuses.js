'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var options = [
    {
      value: 'yellow',
      label: 'Yellow',
    },
    {
      value: 'green',
      label: 'Green',
    },
    {
      value: 'red',
      label: 'Red',
    },
  ];
  return (
    <itwinui_react_1.Select
      options={options}
      placeholder={'Placeholder text'}
      itemRenderer={function (option) {
        return (
          <itwinui_react_1.MenuItem
            style={{
              color: option.value,
            }}
          >
            {option.label}
          </itwinui_react_1.MenuItem>
        );
      }}
      selectedItemRenderer={function (option) {
        return (
          <span
            style={{
              backgroundColor: option.value,
            }}
          >
            {option.label}
          </span>
        );
      }}
    />
  );
};

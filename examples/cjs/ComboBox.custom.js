'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var options = React.useMemo(function () {
    return [
      { label: 'Hour', value: 'hour' },
      { label: 'Day', value: 'day' },
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' },
      { label: 'Year', value: 'year' },
    ];
  }, []);
  var _a = React.useState(''),
    selectedValue = _a[0],
    setSelectedValue = _a[1];
  var onChange = React.useCallback(function (value) {
    setSelectedValue(value);
  }, []);
  var itemRenderer = React.useCallback(function (_a, _b) {
    var value = _a.value,
      label = _a.label;
    var isSelected = _b.isSelected,
      id = _b.id;
    return (
      <itwinui_react_1.MenuItem
        key={id}
        id={id}
        isSelected={isSelected}
        value={value}
      >
        <em
          style={{
            textTransform: 'uppercase',
            fontWeight: isSelected ? 'bold' : undefined,
          }}
        >
          {label}
        </em>
      </itwinui_react_1.MenuItem>
    );
  }, []);
  return (
    <itwinui_react_1.ComboBox
      options={options}
      inputProps={{ placeholder: 'Select a country' }}
      value={selectedValue}
      onChange={onChange}
      itemRenderer={itemRenderer}
    />
  );
};

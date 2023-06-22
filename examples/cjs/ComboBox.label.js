'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var _a = React.useState(''),
    breakfast = _a[0],
    setBreakfast = _a[1];
  var _b = React.useState(''),
    lunch = _b[0],
    setLunch = _b[1];
  var breakfastOptions = React.useMemo(function () {
    return [
      { label: 'Oatmeal parfait', value: 'parfait' },
      { label: 'Waffle', value: 'waffle' },
      { label: 'Omelette', value: 'omelette' },
      { label: 'Breakfast sandwich', value: 'sandwich' },
    ];
  }, []);
  var lunchOptions = React.useMemo(function () {
    return [
      { label: 'BLT', value: 'blt' },
      { label: 'Salad', value: 'salad' },
      { label: 'Chicken sandwich', value: 'chicken' },
      { label: 'Tortilla soup', value: 'soup' },
      { label: 'Fettucini alfredo', value: 'pasta' },
    ];
  }, []);
  return (
    <div style={{ textAlign: 'left' }}>
      <itwinui_react_1.Label htmlFor='breakfast-input'>
        Breakfast
      </itwinui_react_1.Label>
      <itwinui_react_1.ComboBox
        options={breakfastOptions}
        value={breakfast}
        onChange={setBreakfast}
        inputProps={{
          id: 'breakfast-input',
          placeholder: 'Choose your meal',
        }}
      />
      <br />
      <itwinui_react_1.Label htmlFor='lunch-input'>Lunch</itwinui_react_1.Label>
      <itwinui_react_1.ComboBox
        options={lunchOptions}
        value={lunch}
        onChange={setLunch}
        inputProps={{
          id: 'lunch-input',
          placeholder: 'Choose your meal',
        }}
      />
    </div>
  );
};

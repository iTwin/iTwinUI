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
      { label: 'Apartments', value: 'apartments' },
      { label: 'Houses', value: 'houses' },
      { label: 'Lofts', value: 'lofts' },
      { label: 'Condos', value: 'condos' },
      { label: 'Townhomes', value: 'townhomes' },
    ];
  }, []);
  var _a = React.useState(['townhomes', 'condos']),
    selectedOptions = _a[0],
    setSelectedOptions = _a[1];
  return (
    <itwinui_react_1.ComboBox
      options={options}
      inputProps={{ placeholder: 'Housing type' }}
      multiple
      value={selectedOptions}
      onChange={function (selected) {
        setSelectedOptions(selected);
      }}
    />
  );
};

'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  return (
    <itwinui_react_1.Flex style={{ width: '70%' }} flexDirection='column'>
      <itwinui_react_1.SearchBox
        size='small'
        inputProps={{ placeholder: 'Small search...' }}
      />
      <itwinui_react_1.SearchBox
        inputProps={{ placeholder: 'Default search...' }}
      />
      <itwinui_react_1.SearchBox
        size='large'
        inputProps={{ placeholder: 'Large search...' }}
      />
    </itwinui_react_1.Flex>
  );
};

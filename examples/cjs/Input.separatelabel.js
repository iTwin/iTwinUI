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
    <itwinui_react_1.Flex>
      <itwinui_react_1.Flex
        flexDirection='column'
        alignItems='flex-end'
        gap='var(--iui-size-m)'
      >
        <itwinui_react_1.Label htmlFor='first-name'>
          First name
        </itwinui_react_1.Label>
        <itwinui_react_1.Label htmlFor='middle-initial'>
          Middle initial
        </itwinui_react_1.Label>
        <itwinui_react_1.Label htmlFor='last-name'>
          Last name
        </itwinui_react_1.Label>
      </itwinui_react_1.Flex>
      <itwinui_react_1.Flex flexDirection='column' alignItems='flex-start'>
        <itwinui_react_1.Input id='first-name' />
        <itwinui_react_1.Input id='middle-initial' maxlength='1' />
        <itwinui_react_1.Input id='last-name' />
      </itwinui_react_1.Flex>
    </itwinui_react_1.Flex>
  );
};

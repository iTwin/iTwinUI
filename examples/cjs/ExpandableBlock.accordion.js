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
    <div style={{ width: 'min(100%, 300px)' }}>
      <itwinui_react_1.ExpandableBlock title='Block #1'>
        Content in block!
      </itwinui_react_1.ExpandableBlock>
      <itwinui_react_1.ExpandableBlock title='Block #2'>
        Content in block!
      </itwinui_react_1.ExpandableBlock>
      <itwinui_react_1.ExpandableBlock title='Block #3'>
        Content in block!
      </itwinui_react_1.ExpandableBlock>
    </div>
  );
};

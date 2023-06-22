'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
var itwinui_icons_react_1 = require('@itwin/itwinui-icons-react');
exports['default'] = function () {
  return (
    <div style={{ width: 'min(100%, 300px)' }}>
      <itwinui_react_1.ExpandableBlock status='positive' title='Positive block'>
        Content in block!
      </itwinui_react_1.ExpandableBlock>
      <itwinui_react_1.ExpandableBlock status='negative' title='Negative block'>
        Content in block!
      </itwinui_react_1.ExpandableBlock>
      <itwinui_react_1.ExpandableBlock status='warning' title='Warning block'>
        Content in block!
      </itwinui_react_1.ExpandableBlock>
      <itwinui_react_1.ExpandableBlock
        status='informational'
        title='Informational block'
      >
        Content in block!
      </itwinui_react_1.ExpandableBlock>
      <itwinui_react_1.ExpandableBlock
        endIcon={<itwinui_icons_react_1.SvgSmileyHappy />}
        title='Happy block'
      >
        Content in block!
      </itwinui_react_1.ExpandableBlock>
    </div>
  );
};

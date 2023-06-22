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
    <div
      style={{
        display: 'flex',
        gap: 'var(--iui-size-s)',
        placeItems: 'center',
      }}
    >
      <itwinui_react_1.Tooltip placement='left' content='left tooltip'>
        <itwinui_react_1.Button>Left</itwinui_react_1.Button>
      </itwinui_react_1.Tooltip>
      <itwinui_react_1.Tooltip placement='top' content='top tooltip'>
        <itwinui_react_1.Button>Top</itwinui_react_1.Button>
      </itwinui_react_1.Tooltip>
      <itwinui_react_1.Tooltip placement='bottom' content='bottom tooltip'>
        <itwinui_react_1.Button>Bottom</itwinui_react_1.Button>
      </itwinui_react_1.Tooltip>
      <itwinui_react_1.Tooltip placement='right' content='right tooltip'>
        <itwinui_react_1.Button>Right</itwinui_react_1.Button>
      </itwinui_react_1.Tooltip>
    </div>
  );
};

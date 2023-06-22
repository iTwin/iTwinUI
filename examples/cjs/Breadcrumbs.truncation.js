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
        width: '75%',
        minWidth: 150,
        maxWidth: 450,
        border: '1px solid pink',
        padding: 8,
      }}
    >
      <itwinui_react_1.Breadcrumbs>
        <itwinui_react_1.Button>Root</itwinui_react_1.Button>
        <itwinui_react_1.Button>My files</itwinui_react_1.Button>
        <itwinui_react_1.Button>Documents</itwinui_react_1.Button>
        <itwinui_react_1.Button>Status reports</itwinui_react_1.Button>
        <itwinui_react_1.Button>December</itwinui_react_1.Button>
      </itwinui_react_1.Breadcrumbs>
    </div>
  );
};

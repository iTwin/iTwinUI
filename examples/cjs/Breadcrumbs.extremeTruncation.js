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
        maxWidth: 425,
        border: '1px solid pink',
        padding: 8,
      }}
    >
      <itwinui_react_1.Breadcrumbs>
        <itwinui_react_1.Button style={{ maxWidth: 90 }}>
          <itwinui_react_1.MiddleTextTruncation text='Root' endCharsCount={7} />
        </itwinui_react_1.Button>
        <itwinui_react_1.Button style={{ maxWidth: 90 }}>
          <itwinui_react_1.MiddleTextTruncation
            text='My files'
            endCharsCount={7}
          />
        </itwinui_react_1.Button>
        <itwinui_react_1.Button style={{ maxWidth: 90 }}>
          <itwinui_react_1.MiddleTextTruncation
            text='Documents'
            endCharsCount={7}
          />
        </itwinui_react_1.Button>
        <itwinui_react_1.Button style={{ maxWidth: 90 }}>
          <itwinui_react_1.MiddleTextTruncation
            text='Status reports'
            endCharsCount={7}
          />
        </itwinui_react_1.Button>
        <itwinui_react_1.Button style={{ maxWidth: 90 }}>
          <itwinui_react_1.MiddleTextTruncation
            text='December'
            endCharsCount={7}
          />
        </itwinui_react_1.Button>
      </itwinui_react_1.Breadcrumbs>
    </div>
  );
};

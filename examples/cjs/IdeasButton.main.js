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
    /** Creating a container only for demo purposes. Normally this will be fixed to viewport. */
    <div
      style={{
        position: 'absolute',
        inset: '1rem',
        transform: 'translateX(0)',
      }}
    >
      <itwinui_react_1.IdeasButton onClick={function () {}} />
    </div>
  );
};

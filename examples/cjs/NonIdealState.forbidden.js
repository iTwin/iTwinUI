'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
var itwinui_illustrations_react_1 = require('@itwin/itwinui-illustrations-react');
exports['default'] = function () {
  return (
    <div style={{ position: 'relative', minHeight: 403 }}>
      <itwinui_react_1.NonIdealState
        svg={<itwinui_illustrations_react_1.Svg403 />}
        heading='Forbidden'
        description={
          <>
            Forbidden You do not have permission to access this server. Unable
            to fulfill request.
          </>
        }
      />
    </div>
  );
};

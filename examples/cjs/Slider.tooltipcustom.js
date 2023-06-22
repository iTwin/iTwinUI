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
      <itwinui_react_1.Slider
        values={[50]}
        min={0}
        max={100}
        tickLabels={['0', '20', '40', '60', '80', '100']}
        tooltipProps={function (index, val) {
          return { placement: 'right', content: '$'.concat(val, '.00') };
        }}
      />
    </div>
  );
};

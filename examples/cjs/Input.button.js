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
    <>
      <itwinui_react_1.LabeledInput
        label='Street'
        defaultValue='1051 Faribault Road'
        svgIcon={
          <itwinui_react_1.IconButton
            styleType='borderless'
            aria-label='Clear street input'
          >
            <itwinui_icons_react_1.SvgCloseSmall />
          </itwinui_react_1.IconButton>
        }
        iconDisplayStyle='inline'
      />
    </>
  );
};

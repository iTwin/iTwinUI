'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var itwinui_react_1 = require('@itwin/itwinui-react');
var itwinui_icons_react_1 = require('@itwin/itwinui-icons-react');
exports['default'] = function () {
  return (
    <>
      <itwinui_react_1.InputGroup
        label='Radio group'
        message='Tell me how happy you are'
      >
        <itwinui_react_1.Radio
          name='choice'
          value='option1'
          label={<itwinui_icons_react_1.SvgSmileyHappy />}
        />
        <itwinui_react_1.Radio
          name='choice'
          value='option2'
          label={<itwinui_icons_react_1.SvgSmileySad />}
        />
      </itwinui_react_1.InputGroup>
    </>
  );
};

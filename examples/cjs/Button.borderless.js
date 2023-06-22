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
    <itwinui_react_1.Flex>
      <itwinui_react_1.Button styleType='borderless'>
        Default
      </itwinui_react_1.Button>
      <itwinui_react_1.Button styleType='borderless' disabled>
        Disabled
      </itwinui_react_1.Button>
      <itwinui_react_1.Button
        styleType='borderless'
        startIcon={<itwinui_icons_react_1.SvgAdd />}
      >
        With startIcon
      </itwinui_react_1.Button>
      <itwinui_react_1.Button
        styleType='borderless'
        endIcon={<itwinui_icons_react_1.SvgCheckmarkSmall />}
      >
        With endIcon
      </itwinui_react_1.Button>
    </itwinui_react_1.Flex>
  );
};

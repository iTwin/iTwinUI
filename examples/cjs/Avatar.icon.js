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
    <itwinui_react_1.Avatar
      abbreviation='AU'
      backgroundColor={(0, itwinui_react_1.getUserColor)('Anonymous user')}
      image={<itwinui_icons_react_1.SvgUser aria-hidden='true' />}
      size='x-large'
      title='Anonymous user'
    />
  );
};

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
    <itwinui_react_1.AvatarGroup stacked={false} iconSize='x-large'>
      <itwinui_react_1.Avatar
        abbreviation='TR'
        backgroundColor={(0, itwinui_react_1.getUserColor)('Terry Rivers')}
        title='Terry Rivers'
      />
      <itwinui_react_1.Avatar
        abbreviation='RM'
        backgroundColor={(0, itwinui_react_1.getUserColor)('Robin Mercer')}
        title='Robin Mercer'
      />
      <itwinui_react_1.Avatar
        abbreviation='MV'
        backgroundColor={(0, itwinui_react_1.getUserColor)('Morgan Vera')}
        title='Morgan Vera'
      />
      <itwinui_react_1.Avatar
        abbreviation='JM'
        backgroundColor={(0, itwinui_react_1.getUserColor)('Jean Mullins')}
        title='Jean Mullins'
      />
      <itwinui_react_1.Avatar
        abbreviation='AM'
        backgroundColor={(0, itwinui_react_1.getUserColor)('Ashley Miles')}
        title='Ashley Miles'
      />
    </itwinui_react_1.AvatarGroup>
  );
};

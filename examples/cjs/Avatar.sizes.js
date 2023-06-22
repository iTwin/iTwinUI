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
        display: 'flex',
        gap: 'var(--iui-size-s)',
        placeItems: 'center',
      }}
    >
      <itwinui_react_1.Avatar
        abbreviation='TR'
        backgroundColor={(0, itwinui_react_1.getUserColor)('Terry Rivers')}
        size='small'
        title='Terry Rivers'
      />
      <itwinui_react_1.Avatar
        abbreviation='RM'
        backgroundColor={(0, itwinui_react_1.getUserColor)('Robin Mercer')}
        size='medium'
        title='Robin Mercer'
      />
      <itwinui_react_1.Avatar
        abbreviation='MV'
        backgroundColor={(0, itwinui_react_1.getUserColor)('Morgan Vera')}
        size='large'
        title='Morgan Vera'
      />
      <itwinui_react_1.Avatar
        abbreviation='JM'
        backgroundColor={(0, itwinui_react_1.getUserColor)('Jean Mullins')}
        size='x-large'
        title='Jean Mullins'
      />
    </div>
  );
};

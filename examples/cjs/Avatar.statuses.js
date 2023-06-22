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
        title='Terry Rivers'
        size='x-large'
        status='online'
      />
      <itwinui_react_1.Avatar
        abbreviation='RM'
        backgroundColor={(0, itwinui_react_1.getUserColor)('Robin Mercer')}
        title='Robin Mercer'
        size='x-large'
        status='away'
      />
      <itwinui_react_1.Avatar
        abbreviation='JM'
        backgroundColor={(0, itwinui_react_1.getUserColor)('Jean Mullins')}
        title='Jean Mullins'
        size='x-large'
        status='busy'
      />
      <itwinui_react_1.Avatar
        abbreviation='AM'
        backgroundColor={(0, itwinui_react_1.getUserColor)('Ashley Miles')}
        title='Ashley Miles'
        size='x-large'
        status='offline'
      />
    </div>
  );
};

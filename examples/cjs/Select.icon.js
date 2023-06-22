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
    <itwinui_react_1.Select
      options={[
        {
          value: 'happy',
          label: 'Happy',
          icon: <itwinui_icons_react_1.SvgSmileyHappy />,
        },
        {
          value: 'neutral',
          label: 'Neutral',
          icon: <itwinui_icons_react_1.SvgSmileyNeutral />,
        },
        {
          value: 'sad',
          label: 'Sad',
          icon: <itwinui_icons_react_1.SvgSmileySad />,
        },
      ]}
      placeholder={'How are you today?'}
    />
  );
};

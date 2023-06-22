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
    <itwinui_react_1.Surface elevation={4}>
      <itwinui_react_1.Surface.Header>
        <itwinui_react_1.Flex
          justifyContent={'space-between'}
          style={{ flexGrow: '1' }}
        >
          <itwinui_react_1.Text variant='subheading' as='h2'>
            Custom surface
          </itwinui_react_1.Text>
          <itwinui_react_1.IconButton styleType='borderless'>
            <itwinui_icons_react_1.SvgSettings />
          </itwinui_react_1.IconButton>
        </itwinui_react_1.Flex>
      </itwinui_react_1.Surface.Header>
      <itwinui_react_1.Surface.Body isPadded={true}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </itwinui_react_1.Surface.Body>
    </itwinui_react_1.Surface>
  );
};

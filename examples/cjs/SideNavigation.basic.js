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
    <itwinui_react_1.SideNavigation
      items={[
        <itwinui_react_1.SidenavButton
          startIcon={<itwinui_icons_react_1.SvgHome />}
          key={0}
        >
          Home
        </itwinui_react_1.SidenavButton>,
        <itwinui_react_1.SidenavButton
          startIcon={<itwinui_icons_react_1.SvgFlag />}
          key={1}
        >
          Issues
        </itwinui_react_1.SidenavButton>,
        <itwinui_react_1.SidenavButton
          startIcon={<itwinui_icons_react_1.SvgFolderOpened />}
          key={2}
          disabled
        >
          Documents
        </itwinui_react_1.SidenavButton>,
      ]}
      secondaryItems={[
        <itwinui_react_1.SidenavButton
          startIcon={<itwinui_icons_react_1.SvgSettings />}
          key={3}
        >
          Settings
        </itwinui_react_1.SidenavButton>,
      ]}
    />
  );
};

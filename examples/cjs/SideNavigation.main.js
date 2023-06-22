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
  var _a = React.useState(0),
    activeIndex = _a[0],
    setActiveIndex = _a[1];
  return (
    <itwinui_react_1.SideNavigation
      items={[
        <itwinui_react_1.SidenavButton
          startIcon={<itwinui_icons_react_1.SvgHome />}
          key={0}
          isActive={activeIndex === 0}
          onClick={function () {
            return setActiveIndex(0);
          }}
        >
          Home
        </itwinui_react_1.SidenavButton>,
        <itwinui_react_1.SidenavButton
          startIcon={<itwinui_icons_react_1.SvgFlag />}
          key={1}
          isActive={activeIndex === 1}
          onClick={function () {
            return setActiveIndex(1);
          }}
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
          isActive={activeIndex === 3}
          onClick={function () {
            return setActiveIndex(3);
          }}
        >
          Settings
        </itwinui_react_1.SidenavButton>,
      ]}
    />
  );
};

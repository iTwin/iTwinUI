'use strict';
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
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
  var mainItems = __spreadArray([], Array(3).fill(null), true).map(function (
    _,
    index,
  ) {
    return (
      <itwinui_react_1.SidenavButton
        startIcon={<itwinui_icons_react_1.SvgPlaceholder />}
        key={index}
        isActive={activeIndex === index}
        onClick={function () {
          return setActiveIndex(index);
        }}
      >
        {'App '.concat(index)}
      </itwinui_react_1.SidenavButton>
    );
  });
  return (
    <itwinui_react_1.SideNavigation
      items={mainItems}
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

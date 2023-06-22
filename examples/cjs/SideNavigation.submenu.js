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
  var _a;
  var itemsData = [
    { label: 'Home', icon: <itwinui_icons_react_1.SvgHome /> },
    { label: 'Issues', icon: <itwinui_icons_react_1.SvgFlag /> },
    { label: 'Documents', icon: <itwinui_icons_react_1.SvgFolderOpened /> },
    { label: 'Settings', icon: <itwinui_icons_react_1.SvgSettings /> },
  ];
  var _b = React.useState(2),
    activeItem = _b[0],
    setActiveItem = _b[1];
  var _c = React.useState(true),
    isSubmenuOpen = _c[0],
    setIsSubmenuOpen = _c[1];
  var _d = React.useState(0),
    activeSubItem = _d[0],
    setActiveSubItem = _d[1];
  var items = itemsData.map(function (_a, index) {
    var label = _a.label,
      icon = _a.icon;
    return (
      <itwinui_react_1.SidenavButton
        key={index}
        startIcon={icon}
        isActive={activeItem === index}
        isSubmenuOpen={label === 'Documents' && isSubmenuOpen} // needed for proper styling when submenu is open but page is not active
        onClick={function () {
          if (label !== 'Documents') {
            setActiveItem(index);
            setActiveSubItem(-1);
            setIsSubmenuOpen(false);
          } else {
            setIsSubmenuOpen(function (open) {
              return !open;
            });
          }
        }}
      >
        {label}
      </itwinui_react_1.SidenavButton>
    );
  });
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <itwinui_react_1.SideNavigation
        expanderPlacement='bottom'
        items={items.slice(0, 3)}
        secondaryItems={[items[3]]}
        isSubmenuOpen={isSubmenuOpen}
        submenu={
          <itwinui_react_1.SidenavSubmenu>
            <itwinui_react_1.SidenavSubmenuHeader
              actions={
                <itwinui_react_1.IconButton styleType='borderless'>
                  <itwinui_icons_react_1.SvgSettings />
                </itwinui_react_1.IconButton>
              }
            >
              <span>Documents</span>
            </itwinui_react_1.SidenavSubmenuHeader>
            <itwinui_react_1.Text variant='leading'>
              All documents
            </itwinui_react_1.Text>
            <ul>
              {__spreadArray([], Array(10).fill(null), true).map(function (
                _,
                index,
              ) {
                return (
                  <li key={index}>
                    <itwinui_react_1.Anchor
                      onClick={function () {
                        setActiveItem(2);
                        setActiveSubItem(index);
                      }}
                    >
                      Folder {index}
                    </itwinui_react_1.Anchor>
                  </li>
                );
              })}
            </ul>
          </itwinui_react_1.SidenavSubmenu>
        }
      />
      <div
        style={{
          background: 'var(--iui-color-background-disabled)',
          padding: 16,
          flexGrow: 1,
          display: 'grid',
          placeContent: 'center',
          placeItems: 'center',
        }}
      >
        <itwinui_react_1.Text>
          {(_a = itemsData[activeItem]) === null || _a === void 0
            ? void 0
            : _a.label}{' '}
          page
        </itwinui_react_1.Text>
        <itwinui_react_1.Text isMuted>
          {activeSubItem >= 0 && 'Contents of Folder '.concat(activeSubItem)}
        </itwinui_react_1.Text>
      </div>
    </div>
  );
};

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
  var items = Array(10)
    .fill(null)
    .map(function (_, index) {
      return (
        <itwinui_react_1.Button key={index}>
          Item {index}
        </itwinui_react_1.Button>
      );
    });
  return (
    <div
      style={{
        width: '75%',
        minWidth: 150,
        maxWidth: 425,
        border: '1px solid lightpink',
        padding: 8,
      }}
    >
      <itwinui_react_1.Breadcrumbs
        overflowButton={function (visibleCount) {
          return (
            <itwinui_react_1.DropdownMenu
              menuItems={function (close) {
                return Array(items.length - visibleCount)
                  .fill(null)
                  .map(function (_, _index) {
                    var index = visibleCount > 1 ? _index + 1 : _index;
                    var onClick = function () {
                      // open breadcrumb
                      close();
                    };
                    return (
                      <itwinui_react_1.MenuItem key={index} onClick={onClick}>
                        Item {index}
                      </itwinui_react_1.MenuItem>
                    );
                  });
              }}
            >
              <itwinui_react_1.IconButton aria-label='Dropdown with more breadcrumbs'>
                <itwinui_icons_react_1.SvgMore />
              </itwinui_react_1.IconButton>
            </itwinui_react_1.DropdownMenu>
          );
        }}
      >
        {items}
      </itwinui_react_1.Breadcrumbs>
    </div>
  );
};

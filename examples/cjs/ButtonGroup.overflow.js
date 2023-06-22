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
  var buttons = Array(12)
    .fill(null)
    .map(function (_, _index) {
      return (
        <itwinui_react_1.IconButton>
          <itwinui_icons_react_1.SvgPlaceholder />
        </itwinui_react_1.IconButton>
      );
    });
  return (
    <div style={{ maxWidth: '70%' }}>
      <itwinui_react_1.ButtonGroup
        overflowButton={function (overflowStart) {
          return (
            <itwinui_react_1.DropdownMenu
              menuItems={function (close) {
                return Array(buttons.length - overflowStart + 1)
                  .fill(null)
                  .map(function (_, _index) {
                    var index = overflowStart + _index;
                    var onClick = function () {
                      close();
                    };
                    return (
                      <itwinui_react_1.MenuItem
                        key={index}
                        onClick={onClick}
                        startIcon={<itwinui_icons_react_1.SvgPlaceholder />}
                      >
                        Button #{index}
                      </itwinui_react_1.MenuItem>
                    );
                  });
              }}
            >
              <itwinui_react_1.IconButton>
                <itwinui_icons_react_1.SvgMore />
              </itwinui_react_1.IconButton>
            </itwinui_react_1.DropdownMenu>
          );
        }}
      >
        {buttons}
      </itwinui_react_1.ButtonGroup>
    </div>
  );
};

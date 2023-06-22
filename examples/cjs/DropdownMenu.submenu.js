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
  var dropdownMenuItems = function (close) {
    return [
      <itwinui_react_1.MenuItem
        key={1}
        onClick={function () {
          return close();
        }}
      >
        Item #1
      </itwinui_react_1.MenuItem>,
      <itwinui_react_1.MenuItem
        key={2}
        onClick={function () {
          return close();
        }}
      >
        Item #2
      </itwinui_react_1.MenuItem>,
      <itwinui_react_1.MenuItem
        key={3}
        subMenuItems={[
          <itwinui_react_1.MenuItem
            key={4}
            subMenuItems={[
              <itwinui_react_1.MenuItem
                key={7}
                onClick={function () {
                  return close();
                }}
              >
                Item #7
              </itwinui_react_1.MenuItem>,
              <itwinui_react_1.MenuItem
                key={8}
                onClick={function () {
                  return close();
                }}
              >
                Item #8
              </itwinui_react_1.MenuItem>,
            ]}
          >
            Item #4
          </itwinui_react_1.MenuItem>,
          <itwinui_react_1.MenuItem
            key={5}
            onClick={function () {
              return close();
            }}
          >
            Item #5
          </itwinui_react_1.MenuItem>,
          <itwinui_react_1.MenuItem
            key={6}
            subMenuItems={[
              <itwinui_react_1.MenuItem
                key={9}
                onClick={function () {
                  return close();
                }}
              >
                Item #9
              </itwinui_react_1.MenuItem>,
              <itwinui_react_1.MenuItem
                key={10}
                onClick={function () {
                  return close();
                }}
              >
                Item #10
              </itwinui_react_1.MenuItem>,
            ]}
          >
            Item #6
          </itwinui_react_1.MenuItem>,
        ]}
      >
        Item #3
      </itwinui_react_1.MenuItem>,
    ];
  };
  return (
    <>
      <itwinui_react_1.DropdownMenu menuItems={dropdownMenuItems}>
        <itwinui_react_1.IconButton aria-label='More options'>
          <itwinui_icons_react_1.SvgMore />
        </itwinui_react_1.IconButton>
      </itwinui_react_1.DropdownMenu>
    </>
  );
};

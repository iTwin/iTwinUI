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
    <itwinui_react_1.List>
      <itwinui_react_1.ListItem size='large'>
        <itwinui_react_1.ListItem.Icon>
          <itwinui_icons_react_1.SvgPlaceholder />
        </itwinui_react_1.ListItem.Icon>
        <itwinui_react_1.ListItem.Content>
          <div>Milk</div>
          <itwinui_react_1.ListItem.Description>
            Whole, almond or oat milk
          </itwinui_react_1.ListItem.Description>
        </itwinui_react_1.ListItem.Content>
      </itwinui_react_1.ListItem>

      <itwinui_react_1.ListItem size='large'>
        <itwinui_react_1.ListItem.Icon>
          <itwinui_icons_react_1.SvgPlaceholder />
        </itwinui_react_1.ListItem.Icon>
        <itwinui_react_1.ListItem.Content>
          <div>Cheese</div>
          <itwinui_react_1.ListItem.Description>
            Blue or feta
          </itwinui_react_1.ListItem.Description>
        </itwinui_react_1.ListItem.Content>
        <itwinui_react_1.ListItem.Icon>
          <itwinui_icons_react_1.SvgCheckmarkSmall />
        </itwinui_react_1.ListItem.Icon>
      </itwinui_react_1.ListItem>

      <itwinui_react_1.ListItem size='large'>
        <itwinui_react_1.ListItem.Icon>
          <itwinui_icons_react_1.SvgPlaceholder />
        </itwinui_react_1.ListItem.Icon>
        Yogurt
      </itwinui_react_1.ListItem>
    </itwinui_react_1.List>
  );
};

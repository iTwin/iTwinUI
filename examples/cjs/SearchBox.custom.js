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
    <itwinui_react_1.Flex
      style={{ width: '70%' }}
      justifyContent='center'
      flexDirection='column'
    >
      <itwinui_react_1.SearchBox expandable>
        <itwinui_react_1.SearchBox.CollapsedState>
          <itwinui_react_1.SearchBox.ExpandButton>
            <itwinui_icons_react_1.SvgAirplane />
          </itwinui_react_1.SearchBox.ExpandButton>
        </itwinui_react_1.SearchBox.CollapsedState>
        <itwinui_react_1.SearchBox.ExpandedState>
          <itwinui_react_1.SearchBox.Input placeholder='Expandable search with custom interactions' />
          <itwinui_react_1.SearchBox.Button label='Previous result'>
            <itwinui_icons_react_1.SvgCaretUpSmall />
          </itwinui_react_1.SearchBox.Button>
          <itwinui_react_1.SearchBox.Button label='Next result'>
            <itwinui_icons_react_1.SvgCaretDownSmall />
          </itwinui_react_1.SearchBox.Button>
          <itwinui_react_1.Divider orientation='vertical' />
          <itwinui_react_1.SearchBox.CollapseButton label='Close search' />
        </itwinui_react_1.SearchBox.ExpandedState>
      </itwinui_react_1.SearchBox>
    </itwinui_react_1.Flex>
  );
};

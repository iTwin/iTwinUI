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
    <itwinui_react_1.Flex style={{ width: '70%' }} justifyContent='center'>
      <itwinui_react_1.SearchBox>
        <itwinui_react_1.SearchBox.Input placeholder='Basic search with custom interactions' />
        <itwinui_react_1.Text
          isMuted
          variant='body'
          as='p'
          style={{ paddingRight: 'var(--iui-size-s)', alignSelf: 'center' }}
        >
          0/3
        </itwinui_react_1.Text>
        <itwinui_react_1.Divider orientation='vertical' />
        <itwinui_react_1.SearchBox.Button label='Previous result'>
          <itwinui_icons_react_1.SvgCaretUpSmall />
        </itwinui_react_1.SearchBox.Button>
        <itwinui_react_1.SearchBox.Button label='Next result'>
          <itwinui_icons_react_1.SvgCaretDownSmall />
        </itwinui_react_1.SearchBox.Button>
        <itwinui_react_1.SearchBox.Button label='Clear search'>
          <itwinui_icons_react_1.SvgCloseSmall />
        </itwinui_react_1.SearchBox.Button>
      </itwinui_react_1.SearchBox>
    </itwinui_react_1.Flex>
  );
};

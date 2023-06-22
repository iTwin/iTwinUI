'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  return (
    <itwinui_react_1.TagContainer
      overflow='scroll'
      background='filled'
      style={{ maxWidth: '70%' }}
    >
      <itwinui_react_1.Tag onRemove={function () {}}>Tag 1</itwinui_react_1.Tag>
      <itwinui_react_1.Tag onRemove={function () {}}>Tag 2</itwinui_react_1.Tag>
      <itwinui_react_1.Tag onRemove={function () {}}>Tag 3</itwinui_react_1.Tag>
      <itwinui_react_1.Tag onRemove={function () {}}>
        Medium tag 4
      </itwinui_react_1.Tag>
      <itwinui_react_1.Tag onRemove={function () {}}>
        Very long tag 5
      </itwinui_react_1.Tag>
      <itwinui_react_1.Tag onRemove={function () {}}>Tag 6</itwinui_react_1.Tag>
      <itwinui_react_1.Tag onRemove={function () {}}>Tag 7</itwinui_react_1.Tag>
      <itwinui_react_1.Tag onRemove={function () {}}>
        Long tag 8
      </itwinui_react_1.Tag>
      <itwinui_react_1.Tag onRemove={function () {}}>Tag 9</itwinui_react_1.Tag>
    </itwinui_react_1.TagContainer>
  );
};

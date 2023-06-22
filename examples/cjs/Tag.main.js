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
    <itwinui_react_1.TagContainer>
      <itwinui_react_1.Tag>Tag 1</itwinui_react_1.Tag>
      <itwinui_react_1.Tag onRemove={function () {}}>Tag 2</itwinui_react_1.Tag>
      <itwinui_react_1.Tag onRemove={function () {}}>Tag 3</itwinui_react_1.Tag>
    </itwinui_react_1.TagContainer>
  );
};

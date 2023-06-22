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
    <itwinui_react_1.Flex>
      <MyItem>1</MyItem>
      <MyItem>2</MyItem>
      <MyItem>3</MyItem>
    </itwinui_react_1.Flex>
  );
};
var MyItem = function (_a) {
  var _b = _a.children,
    children = _b === void 0 ? '' : _b;
  return <div style={{ padding: '1rem', border: '1px solid' }}>{children}</div>;
};

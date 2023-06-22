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
      <itwinui_react_1.LabeledInput
        label='Positive input'
        message='Happy message'
        status='positive'
        placeholder='Labeled input'
      />
      <itwinui_react_1.LabeledInput
        label='Warning input'
        message='Cautious message'
        status='warning'
        placeholder='Labeled input'
      />
      <itwinui_react_1.LabeledInput
        label='Negative input'
        message='Angry message'
        status='negative'
        placeholder='Labeled input'
      />
    </itwinui_react_1.Flex>
  );
};

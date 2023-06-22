'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
var react_1 = require('react');
exports['default'] = function () {
  var options = [
    {
      value:
        'MyFileWithAReallyLongNameThatWillBeTruncatedBecauseItIsReallyThatLongSoHardToBelieve_FinalVersion_V2.html',
      label:
        'MyFileWithAReallyLongNameThatWillBeTruncatedBecauseItIsReallyThatLongSoHardToBelieve_FinalVersion_V2.html',
    },
    {
      value: 'ShortNameFile.jpg',
      label: 'ShortNameFile.jpg',
    },
    {
      value: 'SomeOtherFile.dgn',
      label: 'SomeOtherFile.dgn',
    },
  ];
  var _a = (0, react_1.useState)(options[0].value),
    selectedValue = _a[0],
    setSelectedValue = _a[1];
  var textRenderer = (0, react_1.useCallback)(function (
    truncatedText,
    originalText,
  ) {
    return (
      <span title={truncatedText !== originalText ? originalText : undefined}>
        {truncatedText}
      </span>
    );
  },
  []);
  return (
    <itwinui_react_1.Select
      options={options}
      value={selectedValue}
      onChange={setSelectedValue}
      placeholder={'Placeholder text'}
      itemRenderer={function (option) {
        return (
          <itwinui_react_1.MenuItem>
            <itwinui_react_1.MiddleTextTruncation
              text={option.label}
              textRenderer={textRenderer}
            />
          </itwinui_react_1.MenuItem>
        );
      }}
      selectedItemRenderer={function (option) {
        return (
          <itwinui_react_1.MiddleTextTruncation
            text={option.label}
            textRenderer={textRenderer}
          />
        );
      }}
    />
  );
};

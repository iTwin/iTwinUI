/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { MenuItem, MiddleTextTruncation, Select } from '@itwin/itwinui-react';
import { useCallback, useState } from 'react';
export default () => {
  const options = [
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
  const [selectedValue, setSelectedValue] = useState(options[0].value);
  const textRenderer = useCallback(
    (truncatedText, originalText) =>
      React.createElement(
        'span',
        { title: truncatedText !== originalText ? originalText : undefined },
        truncatedText,
      ),
    [],
  );
  return React.createElement(Select, {
    options: options,
    value: selectedValue,
    onChange: setSelectedValue,
    placeholder: 'Placeholder text',
    itemRenderer: (option) =>
      React.createElement(
        MenuItem,
        null,
        React.createElement(MiddleTextTruncation, {
          text: option.label,
          textRenderer: textRenderer,
        }),
      ),
    selectedItemRenderer: (option) =>
      React.createElement(MiddleTextTruncation, {
        text: option.label,
        textRenderer: textRenderer,
      }),
  });
};

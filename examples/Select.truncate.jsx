/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  MenuItem,
  MiddleTextTruncation,
  LabeledSelect,
} from '@itwin/itwinui-react';
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
    (truncatedText, originalText) => (
      <span title={truncatedText !== originalText ? originalText : undefined}>
        {truncatedText}
      </span>
    ),
    [],
  );
  return (
    <LabeledSelect
      label={'Choose file'}
      options={options}
      value={selectedValue}
      onChange={setSelectedValue}
      placeholder={'Placeholder text'}
      itemRenderer={(option) => (
        <MenuItem>
          <MiddleTextTruncation
            text={option.label}
            textRenderer={textRenderer}
          />
        </MenuItem>
      )}
      selectedItemRenderer={(option) => (
        <MiddleTextTruncation text={option.label} textRenderer={textRenderer} />
      )}
    />
  );
};

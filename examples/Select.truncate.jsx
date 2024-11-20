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
  const [selectedValue, setSelectedValue] = React.useState(options[0].value);

  return (
    <LabeledSelect
      label={'Choose file'}
      options={options}
      value={selectedValue}
      onChange={setSelectedValue}
      placeholder={'Placeholder text'}
      itemRenderer={(option) => (
        <MenuItem>
          <MiddleTextTruncation text={option.label} />
        </MenuItem>
      )}
      selectedItemRenderer={(option) => (
        <MiddleTextTruncation text={option.label} />
      )}
    />
  );
};

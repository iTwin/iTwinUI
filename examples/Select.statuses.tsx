/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { MenuItem, LabeledSelect } from '@itwin/itwinui-react';

export default () => {
  const options = [
    {
      value: 'yellow',
      label: 'Yellow',
    },
    {
      value: 'green',
      label: 'Green',
    },
    {
      value: 'red',
      label: 'Red',
    },
  ];

  const labelId = React.useId();

  return (
    <LabeledSelect
      label={'Choose color'}
      options={options}
      placeholder={'Placeholder text'}
      itemRenderer={(option) => (
        <MenuItem
          style={{
            color: option.value,
          }}
        >
          {option.label}
        </MenuItem>
      )}
      selectedItemRenderer={(option) => (
        <span
          style={{
            backgroundColor: option.value,
          }}
        >
          {option.label}
        </span>
      )}
    />
  );
};

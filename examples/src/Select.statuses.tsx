/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { MenuItem, Select } from '@itwin/itwinui-react';

export default (args) => {
  const {
    options = [
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
    ],
    placeholder = 'Placeholder text',
    ...rest
  } = args;
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(
    undefined,
  );
  return (
    <Select<string>
      {...rest}
      options={options}
      value={selectedValue}
      onChange={setSelectedValue}
      placeholder={placeholder}
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

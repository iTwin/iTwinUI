/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Select } from '@itwin/itwinui-react';
import { useState } from 'react';

export default (args) => {
  const {
    options = [
      {
        value: 1,
        label: 'Item #1',
        sublabel: 'Sublabel #1',
      },
      {
        value: 2,
        label: 'Item #2',
        sublabel: 'Sublabel #2',
      },
      {
        value: 3,
        label: 'Item #3',
        sublabel: 'Sublabel #3',
      },
    ],
    placeholder = 'Placeholder text',
    size = 'large',
    ...rest
  } = args;
  const [value, setValue] = useState<number | undefined>(undefined);
  return (
    <Select<number>
      {...rest}
      options={options}
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      size={size}
    />
  );
};

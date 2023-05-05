/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Select } from '@itwin/itwinui-react';

export default (args) => {
  const {
    options = [
      {
        value: 1,
        label: 'Item #1',
      },
      {
        value: 2,
        label: 'Item #2',
      },
      {
        value: 3,
        label: 'Item #3',
      },
    ],
    placeholder = 'Placeholder text',
    ...rest
  } = args;
  const [value, setValue] = React.useState<number | undefined>(undefined);
  return (
    <div
      style={{
        minHeight: 350,
      }}
    >
      <Select<number>
        disabled
        {...rest}
        options={options}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
      />
    </div>
  );
};

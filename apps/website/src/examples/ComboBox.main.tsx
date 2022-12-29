/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ComboBox } from '@itwin/itwinui-react';

export default () => {
  const [value, setValue] = React.useState('');

  const options = React.useMemo(
    () => [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Grapefruit', value: 'grapefruit' },
    ],
    []
  );

  return (
    <ComboBox
      options={options}
      value={value}
      onChange={setValue}
      inputProps={{ placeholder: 'Pick a fruit, any fruit' }}
    />
  );
};

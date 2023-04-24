/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ComboBox } from '@itwin/itwinui-react';

export default () => {
  const [value, setValue] = React.useState('green');

  const options = React.useMemo(
    () => [
      { label: 'Red', value: 'red' },
      { label: 'Orange', value: 'orange' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Green', value: 'green' },
      { label: 'Blue', value: 'blue' },
      { label: 'Purple', value: 'purple' },
    ],
    []
  );

  return (
    <ComboBox
      options={options}
      inputProps={{ placeholder: 'Select a color' }}
      value={value}
      onChange={setValue}
    />
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ComboBox } from '@itwin/itwinui-react';

export default () => {
  const options = React.useMemo(
    () => [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Grapefruit', value: 'grapefruit' },
      { label: 'Lychee', value: 'lychee' },
      { label: 'Kiwi', value: 'kiwi' },
      { label: 'Orange', value: 'orange' },
    ],
    []
  );

  return <ComboBox options={options} inputProps={{ placeholder: 'Pick a fruit, any fruit' }} />;
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ComboBox, ThemeProvider } from '@itwin/itwinui-react';
import 'tippy.js/animations/shift-away.css';

export default function ComboBoxDemo() {
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

  return (
    <ThemeProvider theme='dark'>
      <ComboBox
        options={options}
        inputProps={{ placeholder: 'Pick a fruit, any fruit' }}
        dropdownMenuProps={{ appendTo: 'parent' }}
      />
    </ThemeProvider>
  );
}

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
      { label: 'Helvetica', value: 'helvetica' },
      { label: 'Futura', value: 'futura' },
      { label: 'Verdana', value: 'verdana' },
      { label: 'Times New Roman', value: 'roman' },
      { label: 'Arial', value: 'arial' },
      { label: 'Rockwell', value: 'rockwell' },
      { label: 'Bodoni', value: 'bodoni' },
      { label: 'Garamond', value: 'garamond' },
    ],
    [],
  );

  return (
    <ComboBox
      options={options}
      message='This font will be used in your signature.'
      inputProps={{ placeholder: 'Choose a font' }}
      onChange={setValue}
      value={value}
    />
  );
};

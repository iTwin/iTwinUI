/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ComboBox, Label, InputGrid } from '@itwin/itwinui-react';

export default () => {
  const options = React.useMemo(
    () => [
      { label: 'Apartments', value: 'apartments' },
      { label: 'Houses', value: 'houses' },
      { label: 'Lofts', value: 'lofts' },
      { label: 'Condos', value: 'condos' },
      { label: 'Townhomes', value: 'townhomes' },
    ],
    [],
  );

  const [selectedOptions, setSelectedOptions] = React.useState([
    'townhomes',
    'condos',
  ]);

  return (
    <InputGrid>
      <Label htmlFor='housing-input'> Select housing type </Label>
      <ComboBox
        options={options}
        inputProps={{ id: 'housing-input', placeholder: 'Housing type' }}
        multiple
        value={selectedOptions}
        onChange={(selected) => {
          setSelectedOptions(selected);
        }}
      />
    </InputGrid>
  );
};

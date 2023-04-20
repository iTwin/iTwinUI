/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ComboBox, MenuItem, ComboBoxProps } from '@itwin/itwinui-react';

export default () => {
  const options = React.useMemo(
    () => [
      { label: 'Hour', value: 'hour' },
      { label: 'Day', value: 'day' },
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' },
      { label: 'Year', value: 'year' },
    ],
    []
  );

  const [selectedValue, setSelectedValue] = React.useState('');

  const onChange = React.useCallback((value: string) => {
    setSelectedValue(value);
  }, []);

  const itemRenderer = React.useCallback(
    ({ value, label }, { isSelected, id }) => (
      <MenuItem key={id} id={id} isSelected={isSelected} value={value}>
        <em
          style={{
            textTransform: 'uppercase',
            fontWeight: isSelected ? 'bold' : undefined,
          }}
        >
          {label}
        </em>
      </MenuItem>
    ),
    []
  ) as NonNullable<ComboBoxProps<string>['itemRenderer']>;

  return (
    <ComboBox
      options={options}
      inputProps={{ placeholder: 'Select a country' }}
      value={selectedValue}
      onChange={onChange}
      itemRenderer={itemRenderer}
    />
  );
};

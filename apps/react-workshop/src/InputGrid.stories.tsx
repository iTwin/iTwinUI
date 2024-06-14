/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useState } from 'react';
import {
  Input,
  InputGrid,
  InputWithDecorations,
  Label,
  SearchBox,
  Select,
  StatusMessage,
} from '@itwin/itwinui-react';
import { SvgAdd, SvgAirplane } from '@itwin/itwinui-icons-react';

export default {
  title: 'InputGrid',
};

export const WithInput = () => {
  return (
    <InputGrid>
      <Label>This is label</Label>
      <Input />
      <StatusMessage>This is message</StatusMessage>
    </InputGrid>
  );
};

export const WithInputWithDecorations = () => {
  return (
    <InputGrid>
      <Label htmlFor='input-id'>This is label</Label>
      <InputWithDecorations>
        <InputWithDecorations.Icon>
          <SvgAirplane />
        </InputWithDecorations.Icon>
        <InputWithDecorations.Input
          placeholder='Add destination...'
          id='input-id'
        />
        <InputWithDecorations.Button label='Add new flight'>
          <SvgAdd />
        </InputWithDecorations.Button>
      </InputWithDecorations>
      <StatusMessage>This is message</StatusMessage>
    </InputGrid>
  );
};

export const WithSelect = () => {
  const options = [
    { value: 1, label: 'Bali' },
    { value: 2, label: 'Hawaii' },
    { value: 3, label: 'Madagascar' },
  ];
  const [value, setValue] = useState<number | undefined>(undefined);

  return (
    <InputGrid>
      <Label>This is label</Label>
      <Select
        options={options}
        placeholder='Select destination'
        value={value}
        onChange={(value) => setValue(value)}
      />
      <StatusMessage>This is message</StatusMessage>
    </InputGrid>
  );
};

export const WithSearch = () => {
  return (
    <InputGrid labelPlacement='inline'>
      <Label htmlFor='input-id'>This is label</Label>
      <SearchBox inputProps={{ id: 'input-id' }} />
      <StatusMessage>This is message</StatusMessage>
    </InputGrid>
  );
};

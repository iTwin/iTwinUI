/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import {
  Input,
  InputGrid,
  InputWithDecorations,
  Label,
  Icon,
  SearchBox,
  Select,
  StatusMessage,
} from '@itwin/itwinui-react';
import { SvgAdd, SvgAirplane } from '@itwin/itwinui-icons-react';

type InputGridProps = React.ComponentProps<typeof InputGrid>;

export default {
  component: InputGrid,
  title: 'Utilities/InputGrid',
  argTypes: {},
} as Meta<InputGridProps>;

export const WithInput: Story<InputGridProps> = () => {
  return (
    <InputGrid>
      <Label htmlFor='input-id'>This is label</Label>
      <Input id='input-id' />
      <StatusMessage>This is message</StatusMessage>
    </InputGrid>
  );
};

export const WithInputWithDecorations: Story<InputGridProps> = () => {
  return (
    <InputGrid>
      <Label htmlFor='input-id'>This is label</Label>
      <InputWithDecorations>
        <Icon padded>
          <SvgAirplane />
        </Icon>
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

export const WithSelect: Story<InputGridProps> = () => {
  const options = [
    { value: 1, label: 'Bali' },
    { value: 2, label: 'Hawaii' },
    { value: 3, label: 'Madagascar' },
  ];
  const [value, setValue] = React.useState<number | undefined>(undefined);

  return (
    <InputGrid>
      <Label htmlFor='input-id'>This is label</Label>
      <Select
        id='input-id'
        options={options}
        placeholder='Select destination'
        value={value}
        onChange={(value) => setValue(value)}
      />
      <StatusMessage>This is message</StatusMessage>
    </InputGrid>
  );
};

export const WithSearch: Story<InputGridProps> = () => {
  return (
    <InputGrid labelPlacement='inline'>
      <Label htmlFor='input-id'>This is label</Label>
      <SearchBox inputProps={{ id: 'input-id' }} />
      <StatusMessage>This is message</StatusMessage>
    </InputGrid>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import {
  Icon,
  Input,
  InputGrid,
  InputWithDecorations,
  Label,
  SearchBox,
  Select,
  StatusMessage,
} from '@itwin/itwinui-react';
import { SvgAdd, SvgAirplane } from '@itwin/itwinui-icons-react';

type IconProps = React.ComponentProps<typeof Icon>;

export default {
  component: Icon,
  title: 'Utilities/InputGrid',
  argTypes: {},
} as Meta<IconProps>;

export const WithInput: Story<IconProps> = () => {
  return (
    <InputGrid>
      <Label>This is label</Label>
      <Input />
      <StatusMessage>This is message</StatusMessage>
    </InputGrid>
  );
};

export const WithInputWithDecorations: Story<IconProps> = () => {
  return (
    <InputGrid>
      <Label>This is label</Label>
      <InputWithDecorations>
        <InputWithDecorations.Icon>
          <SvgAirplane />
        </InputWithDecorations.Icon>
        <InputWithDecorations.Input placeholder='Add destination...' />
        <InputWithDecorations.Button label='Add new flight'>
          <SvgAdd />
        </InputWithDecorations.Button>
      </InputWithDecorations>
      <StatusMessage>This is message</StatusMessage>
    </InputGrid>
  );
};

export const WithSelect: Story<IconProps> = () => {
  const options = [
    { value: 1, label: 'Bali' },
    { value: 2, label: 'Hawaii' },
    { value: 3, label: 'Madagascar' },
  ];
  const [value, setValue] = React.useState<number | undefined>(undefined);

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

export const WithSearch: Story<IconProps> = () => {
  return (
    <InputGrid displayStyle='inline'>
      <Label>This is label</Label>
      <SearchBox />
      <StatusMessage>This is message</StatusMessage>
    </InputGrid>
  );
};

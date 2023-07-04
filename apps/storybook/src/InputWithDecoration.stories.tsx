/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Input, InputWithDecorations } from '@itwin/itwinui-react';
import { SvgAdd, SvgAirplane } from '@itwin/itwinui-icons-react';

type InputProps = React.ComponentProps<typeof Input>;

export default {
  title: 'Input/InputWithDecorations',
  component: Input,
} as Meta<InputProps>;

export const Basic: Story<InputProps> = () => {
  return (
    <InputWithDecorations>
      <InputWithDecorations.Icon>
        <SvgAirplane />
      </InputWithDecorations.Icon>
      <InputWithDecorations.Input placeholder='Input..' />
      <InputWithDecorations.Button label='Custom button'>
        <SvgAdd />
      </InputWithDecorations.Button>
    </InputWithDecorations>
  );
};

export const Disabled: Story<InputProps> = () => {
  return (
    <InputWithDecorations isDisabled>
      <InputWithDecorations.Icon>
        <SvgAirplane />
      </InputWithDecorations.Icon>
      <InputWithDecorations.Input placeholder='Disabled input' />
      <InputWithDecorations.Button label='Custom button'>
        <SvgAdd />
      </InputWithDecorations.Button>
    </InputWithDecorations>
  );
};

export const Small: Story<InputProps> = () => {
  return (
    <InputWithDecorations size='small'>
      <InputWithDecorations.Icon>
        <SvgAirplane />
      </InputWithDecorations.Icon>
      <InputWithDecorations.Input placeholder='Small input' />
      <InputWithDecorations.Button label='Custom button'>
        <SvgAdd />
      </InputWithDecorations.Button>
    </InputWithDecorations>
  );
};

export const Status: Story<InputProps> = () => {
  return (
    <InputWithDecorations status='positive'>
      <InputWithDecorations.Icon>
        <SvgAirplane />
      </InputWithDecorations.Icon>
      <InputWithDecorations.Input placeholder='Positive input' />
      <InputWithDecorations.Button label='Custom button'>
        <SvgAdd />
      </InputWithDecorations.Button>
    </InputWithDecorations>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { InputWithDecorations, Icon } from '@itwin/itwinui-react';
import { SvgAdd, SvgAirplane } from '@itwin/itwinui-icons-react';

type InputWithDecorationsProps = React.ComponentProps<
  typeof InputWithDecorations
>;

export default {
  title: 'Input/InputWithDecorations',
  component: InputWithDecorations,
} as Meta<InputWithDecorationsProps>;

export const Basic: Story<InputWithDecorationsProps> = () => {
  return (
    <InputWithDecorations>
      <Icon padded>
        <SvgAirplane />
      </Icon>
      <InputWithDecorations.Input placeholder='Input..' />
      <InputWithDecorations.Button label='Custom button'>
        <SvgAdd />
      </InputWithDecorations.Button>
    </InputWithDecorations>
  );
};

export const Disabled: Story<InputWithDecorationsProps> = () => {
  return (
    <InputWithDecorations isDisabled>
      <Icon padded>
        <SvgAirplane />
      </Icon>
      <InputWithDecorations.Input placeholder='Disabled input' />
      <InputWithDecorations.Button label='Custom button'>
        <SvgAdd />
      </InputWithDecorations.Button>
    </InputWithDecorations>
  );
};

export const Small: Story<InputWithDecorationsProps> = () => {
  return (
    <InputWithDecorations size='small'>
      <Icon size='s' padded>
        <SvgAirplane />
      </Icon>
      <InputWithDecorations.Input placeholder='Small input' />
      <InputWithDecorations.Button label='Custom button'>
        <SvgAdd />
      </InputWithDecorations.Button>
    </InputWithDecorations>
  );
};

export const Status: Story<InputWithDecorationsProps> = () => {
  return (
    <InputWithDecorations status='positive'>
      <Icon padded>
        <SvgAirplane />
      </Icon>
      <InputWithDecorations.Input placeholder='Positive input' />
      <InputWithDecorations.Button label='Custom button'>
        <SvgAdd />
      </InputWithDecorations.Button>
    </InputWithDecorations>
  );
};

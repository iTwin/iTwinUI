/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { InputWithDecorations, Icon } from '@itwin/itwinui-react';
import { SvgAdd, SvgAirplane } from '@itwin/itwinui-icons-react';

export default {
  title: 'Input/InputWithDecorations',
  component: InputWithDecorations,
};

export const Basic = () => {
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

export const Disabled = () => {
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

export const Small = () => {
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

export const Status = () => {
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

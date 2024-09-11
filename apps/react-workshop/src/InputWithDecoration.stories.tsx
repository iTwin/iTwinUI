/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { InputWithDecorations } from '@itwin/itwinui-react';
import { SvgAdd, SvgAirplane } from '@itwin/itwinui-icons-react';

export default {
  title: 'InputWithDecorations',
};

export const Basic = () => {
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

export const Disabled = () => {
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

export const Small = () => {
  return (
    <InputWithDecorations size='small'>
      <InputWithDecorations.Icon size='s'>
        <SvgAirplane />
      </InputWithDecorations.Icon>
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

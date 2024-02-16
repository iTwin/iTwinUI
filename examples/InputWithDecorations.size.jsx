/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { InputWithDecorations, Icon } from '@itwin/itwinui-react';
import { SvgAdd, SvgPlaceholder } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <div className='demo-container'>
      <InputWithDecorations size='small'>
        <Icon padded>
          <SvgPlaceholder />
        </Icon>
        <InputWithDecorations.Input placeholder='Small input' />
        <InputWithDecorations.Button label='Add'>
          <SvgAdd />
        </InputWithDecorations.Button>
      </InputWithDecorations>
      <InputWithDecorations>
        <Icon padded>
          <SvgPlaceholder />
        </Icon>
        <InputWithDecorations.Input placeholder='Default input' />
        <InputWithDecorations.Button label='Add'>
          <SvgAdd />
        </InputWithDecorations.Button>
      </InputWithDecorations>
      <InputWithDecorations size='large'>
        <Icon padded>
          <SvgPlaceholder />
        </Icon>
        <InputWithDecorations.Input placeholder='Large input' />
        <InputWithDecorations.Button label='Add'>
          <SvgAdd />
        </InputWithDecorations.Button>
      </InputWithDecorations>
    </div>
  );
};

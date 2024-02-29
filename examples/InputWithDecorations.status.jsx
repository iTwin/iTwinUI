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
      <InputWithDecorations status='positive'>
        <InputWithDecorations.Icon>
          <SvgPlaceholder />
        </InputWithDecorations.Icon>
        <InputWithDecorations.Input placeholder='Positive input' />
        <InputWithDecorations.Button label='Add'>
          <SvgAdd />
        </InputWithDecorations.Button>
      </InputWithDecorations>
      <InputWithDecorations status='warning'>
        <InputWithDecorations.Icon>
          <SvgPlaceholder />
        </InputWithDecorations.Icon>
        <InputWithDecorations.Input placeholder='Warning input' />
        <InputWithDecorations.Button label='Add'>
          <SvgAdd />
        </InputWithDecorations.Button>
      </InputWithDecorations>
      <InputWithDecorations status='negative'>
        <InputWithDecorations.Icon>
          <SvgPlaceholder />
        </InputWithDecorations.Icon>
        <InputWithDecorations.Input placeholder='Negative input' />
        <InputWithDecorations.Button label='Add'>
          <SvgAdd />
        </InputWithDecorations.Button>
      </InputWithDecorations>
    </div>
  );
};

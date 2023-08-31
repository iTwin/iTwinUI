/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { InputWithDecorations, Icon } from '@itwin/itwinui-react';
import { SvgStar, SvgInfo } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <InputWithDecorations>
      <Icon padded>
        <SvgInfo />
      </Icon>
      <InputWithDecorations.Input placeholder='Input with decorations' />
      <InputWithDecorations.Button label='Icon button'>
        <SvgStar />
      </InputWithDecorations.Button>
    </InputWithDecorations>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  InputWithDecorations,
  Icon,
  Text,
  Divider,
} from '@itwin/itwinui-react';
import {
  SvgCaretUpSmall,
  SvgCaretDownSmall,
  SvgSearch,
} from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <InputWithDecorations>
      <Icon padded>
        <SvgSearch />
      </Icon>
      <InputWithDecorations.Input placeholder='Search...' />
      <Text className='advanced-input-text'>0 / 5</Text>
      <Divider orientation='vertical' />
      <InputWithDecorations.Button label='Next result'>
        <SvgCaretDownSmall />
      </InputWithDecorations.Button>
      <InputWithDecorations.Button label='Previous result'>
        <SvgCaretUpSmall />
      </InputWithDecorations.Button>
    </InputWithDecorations>
  );
};

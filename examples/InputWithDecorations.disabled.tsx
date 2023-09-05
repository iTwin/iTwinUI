/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { InputWithDecorations, Icon, Flex } from '@itwin/itwinui-react';
import { SvgAdd, SvgPlaceholder } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Flex flexDirection='column'>
      <InputWithDecorations isDisabled>
        <Icon padded>
          <SvgPlaceholder />
        </Icon>
        <InputWithDecorations.Input placeholder='Disabled input' />
        <InputWithDecorations.Button label='Add'>
          <SvgAdd />
        </InputWithDecorations.Button>
      </InputWithDecorations>
      <InputWithDecorations>
        <Icon padded>
          <SvgPlaceholder />
        </Icon>
        <InputWithDecorations.Input placeholder='Disabled input' />
        <InputWithDecorations.Button label='Add' disabled>
          <SvgAdd />
        </InputWithDecorations.Button>
      </InputWithDecorations>
    </Flex>
  );
};

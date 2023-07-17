/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  ButtonGroup,
  IconButton,
  Input,
  Flex,
  Button,
} from '@itwin/itwinui-react';
import { SvgSearch } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Flex flexDirection='column' gap='m'>
      <ButtonGroup>
        <Button>Button 1</Button>
        <Input aria-label='search bar' />
        <IconButton label='search'>
          <SvgSearch />
        </IconButton>
      </ButtonGroup>
      <ButtonGroup>
        <Input
          aria-label='input text bar'
          value='https://itwinui.bentley.com/docs/buttongroup'
        />
        <Button styleType='high-visibility'>Copy</Button>
      </ButtonGroup>
    </Flex>
  );
};

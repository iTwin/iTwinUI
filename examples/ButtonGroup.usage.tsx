/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ButtonGroup, IconButton, Flex, Button } from '@itwin/itwinui-react';
import {
  SvgAdd,
  SvgEdit,
  SvgDelete,
  SvgUndo,
  SvgSearch,
  SvgFilter,
} from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Flex style={{ width: '60%' }}>
      <Button styleType='high-visibility' startIcon={<SvgAdd />}>
        New
      </Button>
      <ButtonGroup>
        <IconButton label='edit'>
          <SvgEdit />
        </IconButton>
        <IconButton disabled label='delete'>
          <SvgDelete />
        </IconButton>
        <IconButton label='undo'>
          <SvgUndo />
        </IconButton>
      </ButtonGroup>
      <Flex.Spacer />
      <ButtonGroup>
        <IconButton isActive label='filter'>
          <SvgFilter />
        </IconButton>
        <IconButton label='search'>
          <SvgSearch />
        </IconButton>
      </ButtonGroup>
    </Flex>
  );
};

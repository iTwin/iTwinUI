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
        <IconButton>
          <SvgEdit />
        </IconButton>
        <IconButton disabled>
          <SvgDelete />
        </IconButton>
        <IconButton>
          <SvgUndo />
        </IconButton>
      </ButtonGroup>
      <Flex.Spacer />
      <ButtonGroup>
        <IconButton isActive>
          <SvgFilter />
        </IconButton>
        <IconButton>
          <SvgSearch />
        </IconButton>
      </ButtonGroup>
    </Flex>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ButtonGroup, IconButton, Button } from '@itwin/itwinui-react';
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
    <div className='demo-container'>
      <Button styleType='high-visibility' startIcon={<SvgAdd />}>
        New
      </Button>
      <ButtonGroup>
        <IconButton label='Edit'>
          <SvgEdit />
        </IconButton>
        <IconButton disabled label='Delete'>
          <SvgDelete />
        </IconButton>
        <IconButton label='Undo'>
          <SvgUndo />
        </IconButton>
      </ButtonGroup>
      <div className='demo-spacer' />
      <ButtonGroup>
        <IconButton isActive label='Filter'>
          <SvgFilter />
        </IconButton>
        <IconButton label='Search'>
          <SvgSearch />
        </IconButton>
      </ButtonGroup>
    </div>
  );
};

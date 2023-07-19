/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ButtonGroup, IconButton } from '@itwin/itwinui-react';
import {
  SvgAdd,
  SvgEdit,
  SvgDelete,
  SvgUndo,
} from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <ButtonGroup>
      <IconButton onClick={() => {}} label='Add'>
        <SvgAdd />
      </IconButton>
      <IconButton onClick={() => {}} label='Edit' isActive>
        <SvgEdit />
      </IconButton>
      <IconButton disabled onClick={() => {}} label='Delete'>
        <SvgDelete />
      </IconButton>
      <IconButton onClick={() => {}} label='Undo'>
        <SvgUndo />
      </IconButton>
    </ButtonGroup>
  );
};

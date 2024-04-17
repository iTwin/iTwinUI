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
    <ButtonGroup role='toolbar'>
      <IconButton label='Add' onClick={() => {}}>
        <SvgAdd />
      </IconButton>
      <IconButton label='Edit' onClick={() => {}}>
        <SvgEdit />
      </IconButton>
      <IconButton label='Delete' disabled onClick={() => {}}>
        <SvgDelete />
      </IconButton>
      <IconButton label='Undo' onClick={() => {}}>
        <SvgUndo />
      </IconButton>
    </ButtonGroup>
  );
};

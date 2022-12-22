/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ButtonGroup, IconButton } from '@itwin/itwinui-react';
import { SvgAdd, SvgEdit, SvgDelete, SvgUndo } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <div>
      <ButtonGroup>
        <IconButton onClick={() => {}}>
          <SvgAdd />
        </IconButton>
        <IconButton onClick={() => {}} isActive>
          <SvgEdit />
        </IconButton>
        <IconButton disabled onClick={() => {}}>
          <SvgDelete />
        </IconButton>
        <IconButton onClick={() => {}}>
          <SvgUndo />
        </IconButton>
      </ButtonGroup>
    </div>
  );
};

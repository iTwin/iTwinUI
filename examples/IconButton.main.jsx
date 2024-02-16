/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { IconButton } from '@itwin/itwinui-react';
import { SvgAdd, SvgClose } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <div className='demo-container'>
      <IconButton label='Add'>
        <SvgAdd />
      </IconButton>
      <IconButton styleType='borderless' label='Close'>
        <SvgClose />
      </IconButton>
    </div>
  );
};

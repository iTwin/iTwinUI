/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, Popover } from '@itwin/itwinui-react';

export default () => {
  return (
    <Popover
      content='This is a popover!'
      applyBackground
      className='demo-popover'
    >
      <Button>Toggle</Button>
    </Popover>
  );
};

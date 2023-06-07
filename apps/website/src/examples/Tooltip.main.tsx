/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tooltip, Button } from '@itwin/itwinui-react';

export default () => {
  return (
    <Tooltip placement='top' content='I am a tooltip'>
      <Button>Please, hover me!</Button>
    </Tooltip>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tooltip } from '@itwin/itwinui-react';

export default () => {
  return (
    <Tooltip placement='top' content='I am a tooltip'>
      <span tabIndex={0}>Please, try to hover me!</span>
    </Tooltip>
  );
};

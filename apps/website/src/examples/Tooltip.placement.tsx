/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tooltip, Badge, Button } from '@itwin/itwinui-react';

export default () => {
  return (
    <div
      style={{
        display: 'flex',

        gap: 'var(--iui-size-s)',

        placeItems: 'center',
      }}
    >
      <Tooltip placement='left' content='left Tooltip'>
        <Button>Left</Button>
      </Tooltip>
      <Tooltip placement='top' content='top Tooltip'>
        <Button>Top</Button>
      </Tooltip>
      <Tooltip placement='bottom' content='bottom Tooltip'>
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip placement='right' content='right Tooltip'>
        <Button>Right</Button>
      </Tooltip>
    </div>
  );
};

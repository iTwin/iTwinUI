/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { OldTooltip, Badge, Button } from '@itwin/itwinui-react';

export default () => {
  return (
    <div
      style={{
        display: 'flex',

        gap: 'var(--iui-size-s)',

        placeItems: 'center',
      }}
    >
      <OldTooltip placement='left' content='left OldTooltip'>
        <Button>Left</Button>
      </OldTooltip>
      <OldTooltip placement='top' content='top OldTooltip'>
        <Button>Top</Button>
      </OldTooltip>
      <OldTooltip placement='bottom' content='bottom OldTooltip'>
        <Button>Bottom</Button>
      </OldTooltip>
      <OldTooltip placement='right' content='right OldTooltip'>
        <Button>Right</Button>
      </OldTooltip>
    </div>
  );
};

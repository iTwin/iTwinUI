/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, LabeledSelect, Popover } from '@itwin/itwinui-react';

export default () => {
  const [placement, setPlacement] =
    React.useState<(typeof placements)[number]>('bottom-start');

  return (
    <Popover
      content={
        <div style={{ padding: 'var(--iui-size-xs)' }}>
          <LabeledSelect
            label='Placement'
            options={placements.map((p) => ({ value: p, label: p }))}
            value={placement}
            onChange={setPlacement}
            style={{ minWidth: '20ch' }}
          />
        </div>
      }
      applyBackground
      placement={placement}
    >
      <Button>Adjust placement</Button>
    </Popover>
  );
};

const placements = [
  'bottom',
  'bottom-start',
  'bottom-end',
  'top',
  'top-start',
  'top-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
] as const;

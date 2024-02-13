/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, LabeledSelect, Popover } from '@itwin/itwinui-react';
import './Popover.placement.css';

export default () => {
  const [placement, setPlacement] = React.useState('bottom-start');

  return (
    <Popover
      content={
        <div className='placement-popover-content'>
          <LabeledSelect
            label='Placement'
            options={placements.map((p) => ({ value: p, label: p }))}
            value={placement}
            onChange={setPlacement}
            className='placement-popover-labeled-select'
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
];

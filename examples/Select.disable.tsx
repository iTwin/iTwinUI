/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Select, Label } from '@itwin/itwinui-react';

export default () => {
  const labelId = React.useId();

  return (
    <div>
      <Label id={labelId}>Disabled Select Label</Label>
      <Select<number>
        triggerProps={{
          'aria-labelledby': labelId,
        }}
        disabled
        options={[
          {
            value: 1,
            label: 'Item #1',
          },
          {
            value: 2,
            label: 'Item #2',
          },
          {
            value: 3,
            label: 'Item #3',
          },
        ]}
        placeholder={'Placeholder text'}
      />
    </div>
  );
};

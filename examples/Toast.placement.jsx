/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useToaster, Button, Select } from '@itwin/itwinui-react';

export default () => {
  const toaster = useToaster();

  return (
    <div className='demo-container'>
      <Select
        placeholder='Select placement'
        triggerProps={{
          'aria-label': 'Placement',
        }}
        options={[
          { value: 'top', label: 'Top' },
          { value: 'top-start', label: 'Top start' },
          { value: 'top-end', label: 'Top end' },
          { value: 'bottom', label: 'Bottom' },
          { value: 'bottom-start', label: 'Bottom start' },
          { value: 'bottom-end', label: 'Bottom end' },
        ]}
        onChange={(value) =>
          toaster.setSettings({
            placement: value,
          })
        }
      />
      <Button onClick={() => toaster.informational('This is a toast message.')}>
        Open toast
      </Button>
    </div>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useToaster, Button, Select } from '@itwin/itwinui-react';

export default () => {
  const toaster = useToaster();
  const [selectedPlacement, setSelectedPlacement] = React.useState('top');

  React.useEffect(() => {
    toaster.setSettings({
      placement: selectedPlacement,
    });
  }, [selectedPlacement]);

  return (
    <div className='demo-container'>
      <Select
        placeholder='Select placement'
        options={[
          { value: 'top', label: 'Top' },
          { value: 'top-start', label: 'Top start' },
          { value: 'top-end', label: 'Top end' },
          { value: 'bottom', label: 'Bottom' },
          { value: 'bottom-start', label: 'Bottom start' },
          { value: 'bottom-end', label: 'Bottom end' },
        ]}
        onChange={(value) => setSelectedPlacement(value)}
      ></Select>
      <Button onClick={() => toaster.informational('This is a toast message.')}>
        Open toast
      </Button>
    </div>
  );
};

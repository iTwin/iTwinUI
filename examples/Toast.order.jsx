/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useToaster, Button, Select } from '@itwin/itwinui-react';

export default () => {
  const toaster = useToaster();
  const [selectedOrder, setSelectedOrder] = React.useState('auto');

  React.useEffect(() => {
    toaster.setSettings({
      order: selectedOrder,
    });
  }, [selectedOrder]);

  return (
    <div className='demo-container'>
      <Select
        placeholder='Select order'
        options={[
          { value: 'ascending', label: 'Ascending' },
          { value: 'descending', label: 'Descending' },
          { value: 'auto', label: 'Auto' },
        ]}
        onChange={(value) => setSelectedOrder(value)}
      />
      <Button onClick={() => toaster.informational('This is a toast message.')}>
        Open toast
      </Button>
    </div>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useToaster, Button } from '@itwin/itwinui-react';

export default () => {
  const toaster = useToaster();

  return (
    <div className='demo-container'>
      <Button onClick={() => toaster.positive('Job 1 processing completed.')}>
        Open toast 1
      </Button>
      <Button onClick={() => toaster.positive('Job 2 processing completed.')}>
        Open toast 2
      </Button>
      <Button onClick={() => toaster.closeAll()}>Close All</Button>
    </div>
  );
};

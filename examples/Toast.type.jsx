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
      <Button
        onClick={() =>
          toaster.informational('This is a persisting toast.', {
            type: 'persisting',
          })
        }
      >
        Persisting toast
      </Button>
      <Button
        onClick={() =>
          toaster.informational('This is a temporary toast.', {
            type: 'temporary',
          })
        }
      >
        Temporary toast
      </Button>
    </div>
  );
};

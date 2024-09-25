/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useToaster, Button } from '@itwin/itwinui-react';

export default () => {
  const toaster = useToaster();

  const displayPersistingToast = () => {
    toaster.setSettings({
      placement: 'top',
      order: 'ascending',
    });
    toaster.informational('This is a persisting toast.', {
      type: 'persisting',
    });
  };

  const displayTemporaryToast = () => {
    toaster.setSettings({
      placement: 'top',
      order: 'ascending',
    });
    toaster.informational('This is a temporary toast.', {
      type: 'temporary',
    });
  };

  return (
    <div className='demo-container'>
      <Button onClick={displayPersistingToast}>Persisting toast</Button>
      <Button onClick={displayTemporaryToast}>Temporary toast</Button>
    </div>
  );
};

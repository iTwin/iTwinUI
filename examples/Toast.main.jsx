/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useToaster, Button } from '@itwin/itwinui-react';

export default () => {
  const toaster = useToaster();

  const displayToast = () => {
    toaster.setSettings({
      placement: 'top',
      order: 'ascending',
    });
    toaster.positive('Job processing completed.', {
      hasCloseButton: true,
    });
  };

  return (
    <div className='demo-container'>
      <Button onClick={displayToast}>Open toast</Button>
    </div>
  );
};

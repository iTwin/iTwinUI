/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useToaster, Button } from '@itwin/itwinui-react';

export default () => {
  const toaster = useToaster();

  const displayBottomEndToast = () => {
    toaster.setSettings({
      placement: 'bottom-end',
      order: 'descending',
    });
    toaster.informational('This is a negative toast message.', {
      duration: 7000,
      hasCloseButton: true,
      type: 'temporary',
      onRemove: () => {
        console.log('Toast removed!');
      },
    });
  };

  return (
    <div className='demo-container'>
      <Button onClick={displayBottomEndToast}>Bottom-end toast</Button>
    </div>
  );
};

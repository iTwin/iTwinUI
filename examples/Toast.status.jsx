/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useToaster, Button } from '@itwin/itwinui-react';

export default () => {
  const toaster = useToaster();

  const displayPositiveToast = () => {
    toaster.positive('This is a positive toast message.', {
      duration: 7000,
      hasCloseButton: true,
      type: 'temporary',
      onRemove: () => {
        console.log('Toast removed!');
      },
    });
  };
  const displayNegativeToast = () => {
    toaster.negative('This is a negative toast message.', {
      duration: 7000,
      hasCloseButton: true,
      type: 'temporary',
      onRemove: () => {
        console.log('Toast removed!');
      },
    });
  };

  const displayWarningToast = () => {
    toaster.warning('This is a warning toast message.', {
      duration: 7000,
      hasCloseButton: true,
      type: 'temporary',
      onRemove: () => {
        console.log('Toast removed!');
      },
    });
  };

  const displayInformationalToast = () => {
    toaster.informational('This is an informational toast message.', {
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
      <Button onClick={displayPositiveToast}>Positive</Button>
      <Button onClick={displayNegativeToast}>Negative</Button>
      <Button onClick={displayWarningToast}>Warning</Button>
      <Button onClick={displayInformationalToast}>Informational</Button>
    </div>
  );
};

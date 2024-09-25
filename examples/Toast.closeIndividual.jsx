/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useToaster, Button, ProgressRadial } from '@itwin/itwinui-react';

export default () => {
  const toaster = useToaster();

  const displayProcessToast = () => {
    toaster.setSettings({
      placement: 'top',
      order: 'descending',
    });
    const { close } = toaster.informational(
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        <ProgressRadial
          size={'small'}
          indeterminate
          style={{ marginRight: '8px' }}
        />
        Your process is running...
      </div>,
      {
        duration: 7000,
        hasCloseButton: true,
        type: 'persisting',
        onRemove: () => {
          console.log('Toast removed!');
        },
      },
    );

    setTimeout(() => {
      close();
      toaster.positive('Process completed', {
        duration: 7000,
        hasCloseButton: true,
        type: 'persisting',
        onRemove: () => {
          console.log('Toast removed!');
        },
      });
    }, 3000);
  };

  return (
    <Button styleType='high-visibility' onClick={displayProcessToast}>
      Start process
    </Button>
  );
};

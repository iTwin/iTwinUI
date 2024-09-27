/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useToaster, Button, ProgressRadial } from '@itwin/itwinui-react';

export default () => {
  const toaster = useToaster();

  const displayProcessToast = () => {
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
    );

    setTimeout(() => {
      close();
      toaster.positive('Process completed', {
        hasCloseButton: true,
      });
    }, 1000);
  };

  return <Button onClick={displayProcessToast}>Start process</Button>;
};

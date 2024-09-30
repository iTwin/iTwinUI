/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useToaster, Button, Flex, ProgressRadial } from '@itwin/itwinui-react';

export default () => {
  const toaster = useToaster();

  const displayProcessToast = () => {
    const { close } = toaster.informational(
      <Flex>
        <ProgressRadial
          size={'small'}
          indeterminate
          style={{ marginRight: '8px' }}
        />
        Your process is running...
      </Flex>,
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

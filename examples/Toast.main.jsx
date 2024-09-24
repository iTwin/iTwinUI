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
      placement: 'bottom-end',
      order: 'ascending',
    });
    toaster.positive('Job processing completed.', {
      hasCloseButton: true,
      link: {
        onClick: () => {},
        title: 'View the report',
      },
    });
  };

  return (
    <div className='demo-container'>
      <Button onClick={displayToast}>Open toast</Button>
      <Button
        style={{
          display: 'block',
          marginTop: 16,
        }}
        onClick={() => toaster.closeAll()}
      >
        Close All
      </Button>
    </div>
  );
};

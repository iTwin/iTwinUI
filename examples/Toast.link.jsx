/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useToaster, Button } from '@itwin/itwinui-react';

export default () => {
  const toaster = useToaster();

  const displayToast = () => {
    toaster.positive('Job processing completed.', {
      hasCloseButton: true,
      link: {
        title: 'Link',
        onClick: () => {
          alert('Link was clicked!');
        },
      },
    });
  };

  return (
    <div className='demo-container'>
      <Button onClick={displayToast}>Toast with link</Button>
    </div>
  );
};

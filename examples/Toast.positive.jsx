/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useToaster, Button } from '@itwin/itwinui-react';

export default () => {
  const toaster = useToaster();

  const displayPositiveToast = () => {
    toaster.setSettings({
      placement: 'top',
      order: 'descending',
    });
    toaster.positive('This is a positive toast message', {
      duration: 7000,
      hasCloseButton: true,
      link: {
        title: 'Link',
        onClick: () => {
          alert('Link was clicked!');
        },
      },
      type: 'temporary',
      onRemove: () => {
        console.log('Toast removed!');
      },
    });
  };

  return (
    <div className='demo-container'>
      <Button styleType='high-visibility' onClick={displayPositiveToast}>
        Positive
      </Button>
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

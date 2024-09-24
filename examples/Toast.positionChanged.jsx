/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useToaster, Button } from '@itwin/itwinui-react';

export default () => {
  const toaster = useToaster();

  return (
    <div className='demo-container'>
      <Button
        styleType='high-visibility'
        onClick={() => {
          toaster.setSettings({
            placement: 'bottom-end',
            order: 'descending',
          });
          toaster.informational('This is a negative toast message.', {
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
        }}
      >
        Toast
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

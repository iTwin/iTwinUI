/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React, { useRef } from 'react';
import { useToaster, Button } from '@itwin/itwinui-react';

export default () => {
  const toaster = useToaster();
  const buttonRef = useRef(null);

  const displayAnchorToButtonToast = () => {
    toaster.setSettings({
      placement: 'top',
      order: 'descending',
    });
    toaster.positive('This is a positive toast message', {
      duration: 7000,
      hasCloseButton: true,
      type: 'temporary',
      onRemove: () => {
        console.log('Toast removed!');
      },
      animateOutTo: buttonRef.current,
    });
  };

  return (
    <div className='demo-container'>
      <Button
        ref={buttonRef}
        styleType='high-visibility'
        onClick={displayAnchorToButtonToast}
      >
        Anchor to button
      </Button>
    </div>
  );
};

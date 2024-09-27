/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useToaster, Button } from '@itwin/itwinui-react';

export default () => {
  const toaster = useToaster();
  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    toaster.setSettings({
      placement: 'top-end',
    });
  }, []);

  const displayAnchorToButtonToast = () => {
    toaster.positive('This is a positive toast message', {
      animateOutTo: buttonRef.current,
    });
  };

  return (
    <div className='demo-container'>
      <Button ref={buttonRef} onClick={displayAnchorToButtonToast}>
        Anchor to button
      </Button>
    </div>
  );
};

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

  return (
    <div className='demo-container'>
      <Button
        ref={buttonRef}
        onClick={() =>
          toaster.positive('This is a positive toast message', {
            animateOutTo: buttonRef.current,
          })
        }
      >
        Anchor to button
      </Button>
    </div>
  );
};

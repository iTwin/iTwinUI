/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useToaster, Button } from '@itwin/itwinui-react';

export default () => {
  const toaster = useToaster();

  React.useEffect(() => {
    toaster.setSettings({
      placement: 'bottom-end',
    });
  }, []);

  return (
    <div className='demo-container'>
      <Button
        onClick={() => toaster.informational('This is a toast message.', {})}
      >
        Bottom-end toast
      </Button>
    </div>
  );
};

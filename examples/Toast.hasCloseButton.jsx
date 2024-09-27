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
      hasCloseButton: true,
    });
  }, []);

  return (
    <div className='demo-container'>
      <Button onClick={() => toaster.positive('Job processing completed.')}>
        Open toast
      </Button>
    </div>
  );
};

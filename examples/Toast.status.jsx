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
        onClick={() => toaster.positive('This is a positive toast message.')}
      >
        Positive
      </Button>
      <Button
        onClick={() => toaster.negative('This is a negative toast message.')}
      >
        Negative
      </Button>
      <Button
        onClick={() => toaster.warning('This is a warning toast message.')}
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          toaster.informational('This is an informational toast message.')
        }
      >
        Informational
      </Button>
    </div>
  );
};

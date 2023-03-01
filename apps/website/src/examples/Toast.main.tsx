/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { toaster, Button } from '@itwin/itwinui-react';

export default () => {
  return (
    <Button
      onClick={() => {
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
      }}
    >
      Open toast
    </Button>
  );
};

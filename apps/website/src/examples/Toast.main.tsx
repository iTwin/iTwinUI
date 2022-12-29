/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { toaster, Button } from '@itwin/itwinui-react';

export default () => {
  const displayPositiveToast = () => {
    toaster.setSettings({
      placement: 'top',
      order: 'descending',
    });
    toaster.positive('Job processing completed.', {
      hasCloseButton: true,
      link: {
        onClick: () => {
          alert('Link callback');
        },
        title: 'View the report',
      },
      type: 'temporary',
    });
  };

  return (
    <Button styleType='high-visibility' onClick={displayPositiveToast}>
      Click to open toast
    </Button>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { toaster, Button } from '@itwin/itwinui-react';
import { Toast } from '@itwin/itwinui-react/esm/core/Toast/Toast';

export default () => {
  return (
    <Toast
      id={0}
      isVisible
      type='persisting'
      content='Job processing completed.'
      category='positive'
      link={{
        onClick: () => {
          alert('Link callback');
        },
        title: 'View the report',
      }}
    />
  );
};

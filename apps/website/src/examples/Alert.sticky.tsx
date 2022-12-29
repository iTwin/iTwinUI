/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Alert } from '@itwin/itwinui-react';

export default () => {
  return (
    <>
      <Alert
        isSticky
        onClose={() => console.log('CLOSED')}
        clickableTextProps={{ onClick: () => console.log('Clicked more info!') }}
        clickableText='Learn more'
      >
        This is a sticky alert
      </Alert>
      <p>Page content.</p>
    </>
  );
};

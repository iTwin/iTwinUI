/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Alert } from '@itwin/itwinui-react';

export default () => {
  return (
    <Alert
      onClose={() => console.log('CLOSED')}
      clickableText='Learn more'
      clickableTextProps={{ onClick: () => console.log('Clicked more info!') }}
      style={{ minWidth: 'min(100%, 350px)' }}
    >
      This is an alert
    </Alert>
  );
};

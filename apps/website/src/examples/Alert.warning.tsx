/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Alert } from '@itwin/itwinui-react';

export default () => {
  return (
    <Alert
      type='warning'
      onClose={() => console.log('CLOSED')}
      clickableText='Learn more'
      clickableTextProps={{ onClick: () => console.log('Clicked more info!') }}
      style={{ minWidth: 350 }}
    >
      This is a warning alert
    </Alert>
  );
};

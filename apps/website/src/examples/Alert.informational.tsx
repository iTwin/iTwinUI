/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Alert } from '@itwin/itwinui-react';

export default () => {
  return (
    <Alert type='informational' style={{ minWidth: 'min(100%, 350px)' }}>
      <Alert.Icon type='informational' />
      <Alert.Message>
        This is an informational alert
        <Alert.Action onClick={() => console.log('Clicked more info!')}>Learn more</Alert.Action>
      </Alert.Message>
      <Alert.CloseButton onClick={() => console.log('CLOSED')} />
    </Alert>
  );
};

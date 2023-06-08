/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Alert } from '@itwin/itwinui-react';

export default () => {
  return (
    <Alert style={{ minWidth: 'min(100%, 350px)' }}>
      <Alert.Icon />
      <Alert.Message>
        This is an alert
        <Alert.Action onClick={() => console.log('Clicked more info!')}>Learn more</Alert.Action>
      </Alert.Message>
      <Alert.CloseButton onClick={() => console.log('CLOSED')} />
    </Alert>
  );
};

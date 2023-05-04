/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Alert } from '@itwin/itwinui-react';

export default () => {
  return (
    <Alert type='negative' style={{ minWidth: 'min(100%, 350px)' }}>
      <Alert.Icon type='negative' />
      <Alert.Message>
        This is a negative alert
        <Alert.ClickableText onClick={() => console.log('Clicked more info!')}>
          Learn more
        </Alert.ClickableText>
      </Alert.Message>
      <Alert.CloseButton onClose={() => console.log('CLOSED')} />
    </Alert>
  );
};

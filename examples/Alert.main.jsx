/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Alert } from '@itwin/itwinui-react';
import './Alert.main.css';

export default () => {
  return (
    <Alert.Wrapper className='main-alert-wrapper'>
      <Alert.Icon />
      <Alert.Message>
        This is an alert
        <Alert.Action onClick={() => console.log('Clicked more info!')}>
          Learn more
        </Alert.Action>
      </Alert.Message>
      <Alert.CloseButton onClick={() => console.log('CLOSED')} />
    </Alert.Wrapper>
  );
};

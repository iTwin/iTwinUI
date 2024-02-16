/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Alert } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      {['positive', 'warning', 'negative'].map((type) => (
        <Alert.Wrapper key={type} type={type}>
          <Alert.Icon />
          <Alert.Message>
            This is a {type} alert
            <Alert.Action onClick={() => console.log('Clicked more info!')}>
              Learn more
            </Alert.Action>
          </Alert.Message>
          <Alert.CloseButton onClick={() => console.log('CLOSED')} />
        </Alert.Wrapper>
      ))}
    </div>
  );
};

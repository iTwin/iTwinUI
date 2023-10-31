/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Alert } from '@itwin/itwinui-react';

export default () => {
  type AlertType = 'positive' | 'warning' | 'negative';
  const types: AlertType[] = ['positive', 'warning', 'negative'];
  return (
    <>
      {types.map((type, index) => (
        <Alert.Wrapper
          key={index}
          type={type}
          style={{ minWidth: 'min(100%, 350px)' }}
        >
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
    </>
  );
};

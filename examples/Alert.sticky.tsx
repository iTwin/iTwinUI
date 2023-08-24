/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Alert } from '@itwin/itwinui-react';

export default () => {
  return (
    <div>
      <Alert.Wrapper isSticky>
        <Alert.Icon />
        <Alert.Message>
          This is a sticky alert
          <Alert.Action onClick={() => console.log('Clicked more info!')}>
            Learn more
          </Alert.Action>
        </Alert.Message>
        <Alert.CloseButton onClick={() => console.log('CLOSED')} />
      </Alert.Wrapper>
      <p>Page content.</p>
    </div>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Alert } from '@itwin/itwinui-react';

export default () => {
  return (
    <div>
      <Alert isSticky>
        <Alert.Icon />
        <Alert.Message>
          This is a sticky alert
          <Alert.Action onClick={() => console.log('Clicked more info!')}>Learn more</Alert.Action>
        </Alert.Message>
        <Alert.CloseButton onClick={() => console.log('CLOSED')} />
      </Alert>
      <p>Page content.</p>
    </div>
  );
};

{
  /* <Alert
isSticky
onClose={() => console.log('CLOSED')}
clickableTextProps={{ onClick: () => console.log('Clicked more info!') }}
clickableText='Learn more'
>
This is a sticky alert
</Alert> */
}

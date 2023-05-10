/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Anchor } from '@itwin/itwinui-react';

export default () => {
  return (
    <Anchor as='button' onClick={console.log('Button clicked!')}>
      Anchor as a button
    </Anchor>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { StatusMessage } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <StatusMessage status='positive'>Positive message</StatusMessage>
      <StatusMessage status='warning'>Warning message</StatusMessage>
      <StatusMessage status='negative'>Negative message</StatusMessage>
    </div>
  );
};

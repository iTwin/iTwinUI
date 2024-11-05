/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { MiddleTextTruncation } from '@itwin/itwinui-react';

export default () => {
  return (
    <MiddleTextTruncation
      className='demo-container'
      endCharsCount={20}
      text='MyTitleWithAReallyLongNameThatWillBeTruncatedBecauseItIsReallyThatLongSoHardToBelieve'
    />
  );
};

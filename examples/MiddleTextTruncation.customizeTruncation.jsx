/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { MiddleTextTruncation, Tooltip } from '@itwin/itwinui-react';

export default () => {
  return (
    <MiddleTextTruncation
      className='demo-container'
      text='MyTitleWithAReallyLongNameThatWillBeTruncatedWithCustomizedStylingBecauseItIsReallyThatLongSoHardToBelieve'
      textRenderer={React.useCallback(
        (truncatedText, originalText) => (
          <Tooltip content={originalText}>{truncatedText}</Tooltip>
        ),
        [],
      )}
    />
  );
};

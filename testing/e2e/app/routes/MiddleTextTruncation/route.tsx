import { MiddleTextTruncation } from '@itwin/itwinui-react';
import React from 'react';

const longText =
  'MyFileWithAReallyLongNameThatWillBeTruncatedBecauseItIsReallyThatLongSoHardToBelieve_FinalVersion_V2.html';

export default function MiddleTextTruncationTest() {
  return (
    <div data-testid='root'>
      <MiddleTextTruncation text={longText} endCharsCount={6} />
    </div>
  );
}

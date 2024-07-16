import { MiddleTextTruncation } from '@itwin/itwinui-react';

const longText =
  'MyFileWithAReallyLongNameThatWillBeTruncatedBecauseItIsReallyThatLongSoHardToBelieve_FinalVersion_V2.html';

export default function MiddleTextTruncationTest() {
  return (
    <div data-testid='container'>
      <MiddleTextTruncation
        data-testid='middleTextTruncation'
        text={longText}
        endCharsCount={6}
      />
    </div>
  );
}

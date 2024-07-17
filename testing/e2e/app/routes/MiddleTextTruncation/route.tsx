import { MiddleTextTruncation } from '@itwin/itwinui-react';
import { useSearchParams } from '@remix-run/react';

const longText =
  'MyFileWithAReallyLongNameThatWillBeTruncatedBecauseItIsReallyThatLongSoHardToBelieve_FinalVersion_V2.html';

export default function MiddleTextTruncationTest() {
  const [searchParams] = useSearchParams();

  const shouldUseCustomRenderer =
    searchParams.get('shouldUseCustomRenderer') === 'true';

  return (
    <div data-testid='container'>
      <MiddleTextTruncation
        data-testid='middleTextTruncation'
        text={longText}
        endCharsCount={6}
        textRenderer={
          shouldUseCustomRenderer
            ? (truncatedText) => (
                <span data-testid='custom-text'>
                  {truncatedText} - some additional text
                </span>
              )
            : undefined
        }
      />
    </div>
  );
}

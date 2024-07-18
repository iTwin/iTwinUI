import { test, expect, Page } from '@playwright/test';

test.describe('MiddleTextTruncation', () => {
  const longItem =
    'MyFileWithAReallyLongNameThatWillBeTruncatedBecauseItIsReallyThatLongSoHardToBelieve_FinalVersion_V2.html';

  test(`should overflow whenever there is not enough space`, async ({
    page,
  }) => {
    await page.goto(`/MiddleTextTruncation`);

    const setContainerSize = getSetContainerSize(page);

    const middleTextTruncation = page.getByTestId('middleTextTruncation');
    await expect(middleTextTruncation.first()).toHaveText(longItem);

    await setContainerSize('200px');

    await expect(middleTextTruncation.first()).toHaveText(
      'MyFileWithAReallyLon…2.html',
    );

    await setContainerSize(undefined);

    // should restore hidden items when space is available again
    expect(middleTextTruncation.first()).toHaveText(longItem);
  });

  test(`should at minimum always show ellipses and endCharsCount number of characters`, async ({
    page,
  }) => {
    await page.goto(`/MiddleTextTruncation`);

    const endCharsCount = 6;
    const setContainerSize = getSetContainerSize(page);

    const middleTextTruncation = page.getByTestId('container');
    await expect(middleTextTruncation.first()).toHaveText(longItem);

    await setContainerSize('20px');

    await expect(middleTextTruncation.first()).toHaveText(
      `…${longItem.slice(-endCharsCount)}`,
    );

    await setContainerSize(undefined);

    // should restore hidden items when space is available again
    await expect(middleTextTruncation.first()).toHaveText(longItem);
  });

  test('should render custom text', async ({ page }) => {
    await page.goto(`/MiddleTextTruncation?shouldUseCustomRenderer=true`);

    const setContainerSize = getSetContainerSize(page);
    await setContainerSize('500px');

    await expect(page.getByTestId('custom-text')).toHaveText(
      'MyFileWithAReallyLongNameThatWillBeTruncat…2.html - some additional text',
    );

    await page.waitForTimeout(200);
  });
});

// ----------------------------------------------------------------------------

const getSetContainerSize = (page: Page) => {
  return async (dimension: string | undefined) => {
    await page.getByTestId('container').evaluate(
      (element, args) => {
        if (args.dimension != null) {
          element.style.setProperty('width', args.dimension);
        } else {
          element.style.removeProperty('width');
        }
      },
      { dimension },
    );
    await page.waitForTimeout(200);
  };
};

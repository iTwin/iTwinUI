import { test, expect, Page } from '@playwright/test';

test.describe('MiddleTextTruncation', () => {
  const longItem =
    'MyFileWithAReallyLongNameThatWillBeTruncatedBecauseItIsReallyThatLongSoHardToBelieve_FinalVersion_V2.html';

  test(`should overflow whenever there is not enough space`, async ({
    page,
  }) => {
    await page.goto(`/MiddleTextTruncation`);

    const middleTextTruncation = page.getByTestId('middleTextTruncation');
    await expect(middleTextTruncation.first()).toHaveText(longItem);

    await setContainerSize(page, '200px');

    await expect(middleTextTruncation.first()).toHaveText(
      'MyFileWithAReallyLon…2.html',
    );

    await setContainerSize(page, undefined);

    // should restore hidden items when space is available again
    await expect(middleTextTruncation.first()).toHaveText(longItem);
  });

  test(`should at minimum always show ellipses and endCharsCount number of characters`, async ({
    page,
  }) => {
    await page.goto(`/MiddleTextTruncation`);

    const endCharsCount = 6;

    const middleTextTruncation = page.getByTestId('container');
    await expect(middleTextTruncation.first()).toHaveText(longItem);

    await setContainerSize(page, '20px');

    await expect(middleTextTruncation.first()).toHaveText(
      `…${longItem.slice(-endCharsCount)}`,
    );

    await setContainerSize(page, undefined);

    // should restore hidden items when space is available again
    await expect(middleTextTruncation.first()).toHaveText(longItem);
  });

  test('should render custom text', async ({ page }) => {
    await page.goto(`/MiddleTextTruncation?shouldUseCustomRenderer=true`);

    await setContainerSize(page, '500px');

    await expect(page.getByTestId('custom-text')).toHaveText(
      'MyFileWithAReallyLongNameThatWillBeTruncat…2.html - some additional text',
    );

    await page.waitForTimeout(200);
  });
});

// ----------------------------------------------------------------------------

const setContainerSize = async (page: Page, value: string | undefined) => {
  await page.getByTestId('container').evaluate(
    (element, args) => {
      if (args.value != null) {
        element.style.setProperty('width', args.value);
      } else {
        element.style.removeProperty('width');
      }
    },
    { value },
  );
  await page.waitForTimeout(200);
};

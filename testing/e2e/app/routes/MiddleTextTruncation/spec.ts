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

    const truncatedText = await middleTextTruncation.first().textContent();

    // There should be at least some truncation
    expect(truncatedText).toMatch(new RegExp('.+…2.html')); // should have ellipsis
    expect(truncatedText).not.toMatch(
      new RegExp(`${longItem.slice(0, longItem.length - '2.html'.length)}.+`),
    ); // should not have full text before the ellipsis

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

    const truncatedText = await page.getByTestId('custom-text').textContent();

    // There should be at least some truncation
    expect(truncatedText).toMatch(
      new RegExp('.+…2.html - some additional text'),
    ); // should have ellipsis
    expect(truncatedText).not.toMatch(
      new RegExp(`${longItem.slice(0, longItem.length - '2.html'.length)}.+`),
    ); // should not have full text before the ellipsis

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

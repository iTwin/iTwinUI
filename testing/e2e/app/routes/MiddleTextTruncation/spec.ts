import { test, expect, Page } from '@playwright/test';

test.describe('MiddleTextTruncation', () => {
  const longItem =
    'MyFileWithAReallyLongNameThatWillBeTruncatedBecauseItIsReallyThatLongSoHardToBelieve_FinalVersion_V2.html';

  const getTextContent = async (page: Page, testId = 'middleTextTruncation') =>
    page.getByTestId(testId).first().textContent();

  test(`should overflow whenever there is not enough space`, async ({
    page,
  }) => {
    await page.goto(`/MiddleTextTruncation`);

    expect(await getTextContent(page)).toBe(longItem);

    await setContainerSize(page, '200px');

    const truncatedText = await getTextContent(page);

    // There should be at least some truncation
    expect(truncatedText).toMatch(new RegExp('.+…2.html')); // should have ellipsis
    expect(truncatedText).not.toMatch(
      new RegExp(`${longItem.slice(0, longItem.length - '2.html'.length)}.+`),
    ); // should not have full text before the ellipsis

    await setContainerSize(page, undefined);

    // should restore hidden items when space is available again
    expect(await getTextContent(page)).toBe(longItem);
  });

  test(`should at minimum always show ellipses and endCharsCount number of characters`, async ({
    page,
  }) => {
    await page.goto(`/MiddleTextTruncation`);

    const endCharsCount = 6;

    expect(await getTextContent(page)).toBe(longItem);

    await setContainerSize(page, '20px');

    expect(await getTextContent(page)).toBe(
      `…${longItem.slice(-endCharsCount)}`,
    );

    await setContainerSize(page, undefined);

    // should restore hidden items when space is available again
    expect(await getTextContent(page)).toBe(longItem);
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

  test('should not affect accessibility tree', async ({ page }) => {
    await page.goto(`/MiddleTextTruncation`);
    await setContainerSize(page, '200px');

    // Truncation (visual) should work.
    expect(await getTextContent(page)).toMatch(new RegExp('.+…2.html'));

    // But the original long text should still be accessible.
    const tree = await page.accessibility.snapshot();
    const node = tree?.children?.[0];
    expect(node?.role).toBe('text');
    expect(node?.name).toBe(longItem);
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

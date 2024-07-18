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
    expect(await middleTextTruncation.first().textContent()).toHaveLength(
      longItem.length,
    );

    await setContainerSize('200px');

    expect(await middleTextTruncation.first().textContent()).toHaveLength(
      'MyFileWithAReallyLon…2.html'.length,
    );

    await setContainerSize(undefined);

    // should restore hidden items when space is available again
    expect(await middleTextTruncation.first().textContent()).toHaveLength(
      longItem.length,
    );
  });

  test(`should at minimum always show ellipses and endCharsCount number of characters`, async ({
    page,
  }) => {
    await page.goto(`/MiddleTextTruncation`);

    const endCharsCount = 6;
    const setContainerSize = getSetContainerSize(page);

    const middleTextTruncation = page.getByTestId('container');
    expect(await middleTextTruncation.first().textContent()).toHaveLength(
      longItem.length,
    );

    await setContainerSize('20px');

    expect(await middleTextTruncation.first().textContent()).toHaveLength(
      endCharsCount + 1, // +1 for the ellipses
    );

    await setContainerSize(undefined);

    // should restore hidden items when space is available again
    expect(await middleTextTruncation.first().textContent()).toHaveLength(
      longItem.length,
    );
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

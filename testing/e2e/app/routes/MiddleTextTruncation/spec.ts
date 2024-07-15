import { test, expect, Page } from '@playwright/test';

test.describe('MiddleTextTruncation', () => {
  const longItem =
    'MyFileWithAReallyLongNameThatWillBeTruncatedBecauseItIsReallyThatLongSoHardToBelieve_FinalVersion_V2.html';

  test(`should overflow whenever there is not enough space`, async ({
    page,
  }) => {
    await page.goto(`/MiddleTextTruncation`);

    const setContainerSize = getSetContainerSize(page);

    await page.waitForTimeout(100);

    const middleTextTruncation = page.getByTestId('root');
    expect(await middleTextTruncation.first().textContent()).toHaveLength(
      longItem.length,
    );

    await setContainerSize('200px');
    await page.waitForTimeout(100);

    expect(await middleTextTruncation.first().textContent()).toHaveLength(
      'MyFileWithAReallyLon…2.html'.length,
    );

    await setContainerSize(undefined);
    await page.waitForTimeout(100);

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

    await page.waitForTimeout(100);

    const middleTextTruncation = page.getByTestId('root');
    expect(await middleTextTruncation.first().textContent()).toHaveLength(
      longItem.length,
    );

    await setContainerSize('20px');
    await page.waitForTimeout(100);

    expect(await middleTextTruncation.first().textContent()).toHaveLength(
      endCharsCount + 1, // +1 for the ellipses
    );

    await setContainerSize(undefined);
    await page.waitForTimeout(100);

    // should restore hidden items when space is available again
    expect(await middleTextTruncation.first().textContent()).toHaveLength(
      longItem.length,
    );
  });
});

// ----------------------------------------------------------------------------

const getSetContainerSize = (page: Page) => {
  return async (dimension: string | undefined) => {
    await page.getByTestId('root').evaluate(
      (element, args) => {
        element.style.width = args.dimension != null ? args.dimension : `999px`;
      },
      {
        dimension,
      },
    );
  };
};

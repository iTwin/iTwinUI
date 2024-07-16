import { test, expect, Page } from '@playwright/test';

test.describe('Select', () => {
  test(`should overflow whenever there is not enough space`, async ({
    page,
  }) => {
    await page.goto(`/Select`);

    const setContainerSize = getSetContainerSize(page);
    const expectOverflowState = getExpectOverflowState(page);

    await page.waitForTimeout(100);

    await expectOverflowState({
      expectedItemLength: 10,
      expectedLastTagTextContent: 'Very long option',
    });

    await setContainerSize('600px');
    await page.waitForTimeout(100);

    await expectOverflowState({
      expectedItemLength: 6,
      expectedLastTagTextContent: '+5 item(s)',
    });
  });

  test(`should at minimum always show one overflow tag`, async ({ page }) => {
    await page.goto(`/Select`);

    const setContainerSize = getSetContainerSize(page);
    const expectOverflowState = getExpectOverflowState(page);

    await page.waitForTimeout(100);

    await expectOverflowState({
      expectedItemLength: 10,
      expectedLastTagTextContent: 'Very long option',
    });

    await setContainerSize('10px');
    await page.waitForTimeout(100);

    await expectOverflowState({
      expectedItemLength: 1,
      expectedLastTagTextContent: '+10 item(s)',
    });
  });

  test(`should always show the selected tag and no overflow tag when only one item is selected`, async ({
    page,
  }) => {
    await page.goto(`/Select?value=[9]`);

    const setContainerSize = getSetContainerSize(page);
    const expectOverflowState = getExpectOverflowState(page);

    await page.waitForTimeout(100);

    await expectOverflowState({
      expectedItemLength: 1,
      expectedLastTagTextContent: 'Very long option',
    });

    await setContainerSize('160px');
    await page.waitForTimeout(100);

    await expectOverflowState({
      expectedItemLength: 1,
      expectedLastTagTextContent: 'Very long option',
    });
  });
});

// ----------------------------------------------------------------------------

const getSetContainerSize = (page: Page) => {
  return async (dimension: string | undefined) => {
    await page.locator('#container').evaluate(
      (element, args) => {
        if (args.dimension != null) {
          element.style.setProperty('width', args.dimension);
        } else {
          element.style.removeProperty('width');
        }
      },
      { dimension },
    );
  };
};

const getExpectOverflowState = (page: Page) => {
  return async ({
    expectedItemLength,
    expectedLastTagTextContent,
  }: {
    expectedItemLength: number;
    expectedLastTagTextContent: string | undefined;
  }) => {
    const tags = await page
      .locator('div[class$="-select-tag-container"] > span')
      .all();
    expect(tags).toHaveLength(expectedItemLength);

    const lastTag = tags[tags.length - 1];

    if (expectedLastTagTextContent != null) {
      expect(await lastTag.textContent()).toBe(expectedLastTagTextContent);
    } else {
      expect(tags).toHaveLength(0);
    }
  };
};

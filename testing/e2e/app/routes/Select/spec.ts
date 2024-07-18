import { test, expect, Page } from '@playwright/test';

test.describe('Select', () => {
  test.describe('General', () => {
    [true, false].forEach((multiple) => {
      test(`should work in uncontrolled mode (multiple=${multiple})`, async ({
        page,
      }) => {
        await page.goto(`/Select?multiple=${multiple}`);

        await page.waitForTimeout(30);

        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');

        await page.getByRole('option').first().click();
        expect(page.getByRole('combobox')).toHaveText('option 0');

        if (!multiple) {
          await page.getByRole('combobox').click();
        }

        await page.getByRole('option').nth(1).click();

        if (multiple) {
          await page.getByRole('option').first().click();
        }

        expect(page.getByRole('combobox')).toHaveText('option 1');
      });
    });
  });

  test.describe('Overflow', () => {
    test(`should overflow whenever there is not enough space`, async ({
      page,
    }) => {
      await page.goto(`/Select?multiple=true&value=all`);

      const setContainerSize = getSetContainerSize(page);
      const expectOverflowState = getExpectOverflowState(page);

      await page.waitForTimeout(30);

      await expectOverflowState({
        expectedItemLength: 10,
        expectedLastTagTextContent: 'Very long option',
      });

      await setContainerSize('600px');

      await expectOverflowState({
        expectedItemLength: 6,
        expectedLastTagTextContent: '+5 item(s)',
      });
    });

    test(`should at minimum always show one overflow tag`, async ({ page }) => {
      await page.goto(`/Select?multiple=true&value=all`);

      const setContainerSize = getSetContainerSize(page);
      const expectOverflowState = getExpectOverflowState(page);

      await page.waitForTimeout(30);

      await expectOverflowState({
        expectedItemLength: 10,
        expectedLastTagTextContent: 'Very long option',
      });

      await setContainerSize('10px');

      await expectOverflowState({
        expectedItemLength: 1,
        expectedLastTagTextContent: '+10 item(s)',
      });
    });

    test(`should always show the selected tag and no overflow tag when only one item is selected`, async ({
      page,
    }) => {
      await page.goto(`/Select?multiple=true&value=[9]`);

      const setContainerSize = getSetContainerSize(page);
      const expectOverflowState = getExpectOverflowState(page);

      await page.waitForTimeout(30);

      await expectOverflowState({
        expectedItemLength: 1,
        expectedLastTagTextContent: 'Very long option',
      });

      await setContainerSize('160px');

      await expectOverflowState({
        expectedItemLength: 1,
        expectedLastTagTextContent: 'Very long option',
      });
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
    await page.waitForTimeout(30);
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

import { test, expect, Page } from '@playwright/test';

test.describe('Select (general)', () => {
  [true, false].forEach((multiple) => {
    test(`should work in uncontrolled mode (multiple=${multiple})`, async ({
      page,
    }) => {
      await page.goto(`/Select?multiple=${multiple}`);

      await page.waitForTimeout(200);

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

      await expect(page.getByRole('combobox')).toHaveText('option 1');
    });
  });
});

test.describe('Select (overflow)', () => {
  test(`should overflow whenever there is not enough space`, async ({
    page,
  }) => {
    await page.goto(`/Select?multiple=true&value=all`);

    await page.waitForTimeout(200);

    await expectOverflowState({
      page,
      expectedItemLength: 10,
      expectedLastTagTextContent: 'Very long option',
    });

    await setContainerSize(page, '600px');

    await expectOverflowState({
      page,
      expectedItemLength: 6,
      expectedLastTagTextContent: '+5 item(s)',
    });
  });

  test(`should at minimum always show one overflow tag`, async ({ page }) => {
    await page.goto(`/Select?multiple=true&value=all`);

    await page.waitForTimeout(200);

    await expectOverflowState({
      page,
      expectedItemLength: 10,
      expectedLastTagTextContent: 'Very long option',
    });

    await setContainerSize(page, '10px');

    await expectOverflowState({
      page,
      expectedItemLength: 1,
      expectedLastTagTextContent: '+10 item(s)',
    });
  });

  test(`should always show the selected tag and no overflow tag when only one item is selected`, async ({
    page,
  }) => {
    await page.goto(`/Select?multiple=true&value=[9]`);

    await page.waitForTimeout(200);

    await expectOverflowState({
      page,
      expectedItemLength: 1,
      expectedLastTagTextContent: 'Very long option',
    });

    await setContainerSize(page, '160px');

    await expectOverflowState({
      page,
      expectedItemLength: 1,
      expectedLastTagTextContent: 'Very long option',
    });
  });
});

// ----------------------------------------------------------------------------

const setContainerSize = async (page: Page, value: string | undefined) => {
  await page.locator('#container').evaluate(
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

const expectOverflowState = async ({
  page,
  expectedItemLength,
  expectedLastTagTextContent,
}: {
  page: Page;
  expectedItemLength: number;
  expectedLastTagTextContent: string | undefined;
}) => {
  const tags = await getSelectTagContainerTags(page);
  expect(tags).toHaveLength(expectedItemLength);

  const lastTag = tags[tags.length - 1];

  if (expectedLastTagTextContent != null) {
    await expect(lastTag).toHaveText(expectedLastTagTextContent);
  } else {
    expect(tags).toHaveLength(0);
  }
};

const getSelectTagContainerTags = async (page: Page) => {
  // TODO: Remove this implementation detail of class name when we can customize the tag container.
  // See: https://github.com/iTwin/iTwinUI/pull/2151#discussion_r1684394649
  return await page.locator('span[class$="-select-tag"]').all();
};

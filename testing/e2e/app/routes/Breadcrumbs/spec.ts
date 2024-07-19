import { test, expect, Page } from '@playwright/test';

test.describe('Breadcrumbs', () => {
  test(`should overflow whenever there is not enough space`, async ({
    page,
  }) => {
    await page.goto(`/Breadcrumbs`);

    await expectOverflowState({
      page,
      expectedItemLength: 5,
      expectedOverflowButtonVisibleCount: undefined,
    });

    await setContainerSize(page, '200px');

    await expectOverflowState({
      page,
      expectedItemLength: 2,
      expectedOverflowButtonVisibleCount: 2,
    });

    // should restore hidden items when space is available again
    await setContainerSize(page, undefined);

    await expectOverflowState({
      page,
      expectedItemLength: 5,
      expectedOverflowButtonVisibleCount: undefined,
    });
  });

  test(`should at minimum always show one overflow button and one item`, async ({
    page,
  }) => {
    await page.goto(`/Breadcrumbs`);

    await expectOverflowState({
      page,
      expectedItemLength: 5,
      expectedOverflowButtonVisibleCount: undefined,
    });

    await setContainerSize(page, '10px');

    await expectOverflowState({
      page,
      expectedItemLength: 1,
      expectedOverflowButtonVisibleCount: 1,
    });
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

const expectOverflowState = async ({
  page,
  expectedItemLength,
  expectedOverflowButtonVisibleCount,
}: {
  page: Page;
  expectedItemLength: number;
  expectedOverflowButtonVisibleCount: number | undefined;
}) => {
  const items = page.getByTestId('item');
  expect(items).toHaveCount(expectedItemLength);

  const overflowButton = page.locator('button');

  if (expectedOverflowButtonVisibleCount != null) {
    await expect(overflowButton).toHaveText(
      `${expectedOverflowButtonVisibleCount}`,
    );
  } else {
    await expect(overflowButton).not.toBeVisible();
  }
};

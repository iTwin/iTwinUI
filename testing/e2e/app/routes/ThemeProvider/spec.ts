import { test, expect } from '@playwright/test';

test('should respect the portalContainer prop', async ({ page }) => {
  await page.goto('/ThemeProvider?withPortalContainer=true');
  expect(page.locator('[data-container="custom"]')).toContainText(
    'main tooltip',
  );
});

test('should inherit the portalContainer if inheriting theme', async ({
  page,
}) => {
  await page.goto('/ThemeProvider?nested=true');

  expect(page.locator('[data-container="main"]')).toContainText('main tooltip');
  expect(page.locator('[data-container="main"]')).toContainText(
    'nested tooltip',
  );
  expect(page.locator('[data-container="nested"]')).not.toContainText(
    'nested tooltip',
  );
});

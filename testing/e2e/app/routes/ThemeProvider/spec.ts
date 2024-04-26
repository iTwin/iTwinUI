import { test, expect } from '@playwright/test';

test('should respect the portalContainer prop', async ({ page }) => {
  await page.goto('/ThemeProvider?withPortalContainer=true');

  await expect(page.locator('[data-container="custom"]')).toContainText(
    'main tooltip',
  );
});

test('should inherit the portalContainer if inheriting theme', async ({
  page,
}) => {
  await page.goto('/ThemeProvider?nested=true');

  await expect(page.locator('[data-container="main"]')).toContainText(
    'main tooltip',
  );
  await expect(page.locator('[data-container="main"]')).toContainText(
    'nested tooltip',
  );
  await expect(page.locator('[data-container="nested"]')).not.toContainText(
    'nested tooltip',
  );
});

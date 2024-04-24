import { test, expect } from '@playwright/test';

test('should respect the portalContainer prop', async ({ page }) => {
  await page.goto('/ThemeProvider?withPortalContainer=true');

  expect(
    page.locator('[data-container="main"]').locator('[data-tooltip]'),
  ).toBeVisible();
});

test('should inherit the portalContainer if inheriting theme', async ({
  page,
}) => {
  await page.goto('/ThemeProvider?nested=true');

  expect(
    page.locator('[data-container="main"]').locator('[data-tooltip="main"]'),
  ).toBeVisible();

  expect(
    page.locator('[data-container="main"]').locator('[data-tooltip="nested"]'),
  ).toBeVisible();

  expect(
    page.locator('[data-container="nested"]').locator('[data-tooltip]'),
  ).toBeNull();
});

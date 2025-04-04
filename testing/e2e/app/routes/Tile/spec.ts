import { test, expect } from '@playwright/test';

test('Close menu items on click', async ({ page }) => {
  await page.goto('/Tile');

  const button = page.getByTestId('tile-more-options');

  await page.getByTestId('tile').hover();
  await button.click();

  // Top-level MenuItems
  await expect(page.getByRole('menu')).toBeVisible();
  await page.getByRole('menuitem', { name: 'Item 1' }).click();
  await expect(page.getByRole('menu')).not.toBeVisible();

  await page.getByTestId('tile').hover();
  await button.click();

  // Nested MenuItems
  await expect(page.getByRole('menu')).toBeVisible();
  await page.getByRole('menuitem', { name: 'Item 3' }).hover();
  await page.getByRole('menuitem', { name: 'Sub Item 1' }).click();
  await expect(page.getByRole('menu')).not.toBeVisible();
});

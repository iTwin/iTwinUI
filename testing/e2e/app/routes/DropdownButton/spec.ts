import { test, expect } from '@playwright/test';

test('should render menu items', async ({ page }) => {
  await page.goto('/DropdownButton');

  const button = page.locator('button');
  const menu = page.getByRole('menu');
  const menuItems = page.getByRole('menuitem');

  await expect(button).toBeVisible();
  await expect(menu).not.toBeVisible();

  await button.click();

  await expect(menu).toBeVisible();
  await expect(menuItems).toHaveCount(3);

  await menuItems.first().click();

  await expect(menu).not.toBeVisible();
});

import { test, expect } from '@playwright/test';

test('should render moreMenu alone correctly', async ({ page }) => {
  await page.goto('/Header');

  const moreMenu = page.getByRole('menu');
  const button = page.locator('button');
  const menuItems = page.getByRole('menuitem');

  await expect(moreMenu).not.toBeVisible();
  await expect(button).toBeVisible();
  await button.click();

  await expect(moreMenu).toBeVisible();
  await expect(menuItems).toHaveCount(3);

  const consoleLog = page.waitForEvent('console');
  await menuItems.first().click();

  await expect(moreMenu).not.toBeVisible();
  expect((await consoleLog).text()).toBe('CLICKED');
});

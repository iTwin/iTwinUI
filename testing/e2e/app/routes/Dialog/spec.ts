import { test, expect } from '@playwright/test';

// https://github.com/iTwin/iTwinUI/issues/2445
test('should not jump focus from a child to the dialog', async ({ page }) => {
  await page.goto('/Dialog');

  await page.getByRole('button').focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeFocused();

  await page.locator('input').click();
  await expect(page.locator('input')).toBeFocused();

  // type in input
  await page.locator('input').fill('a');
  await expect(page.locator('input')).toBeFocused();
  await expect(page.getByRole('dialog')).not.toBeFocused();
});

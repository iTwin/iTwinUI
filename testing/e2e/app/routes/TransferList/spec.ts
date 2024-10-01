import { test, expect } from '@playwright/test';

test('should support toolbar keyboard navigation in TransferList.Toolbar', async ({
  page,
}) => {
  await page.goto('/TransferList');
  const buttons = page.locator('button');

  await page.keyboard.press('Tab');

  await page.keyboard.press('Tab');
  await expect(buttons.nth(0)).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(buttons.nth(1)).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(buttons.nth(2)).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(buttons.nth(3)).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(buttons.nth(0)).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await expect(buttons.nth(3)).toBeFocused();
});

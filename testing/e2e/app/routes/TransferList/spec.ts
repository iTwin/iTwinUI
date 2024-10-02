import { test, expect } from '@playwright/test';

test('should support toolbar keyboard navigation in TransferList.Toolbar', async ({
  page,
}) => {
  await page.goto('/TransferList');
  const buttons = page.locator('button');
  const listboxes = page.getByRole('listbox');

  await page.keyboard.press('Tab');
  await expect(listboxes.first()).toBeFocused();

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

test('should have only one tab stop in TransferList.Toolbar (toolbar pattern)', async ({
  page,
}) => {
  await page.goto('/TransferList');
  const buttons = page.locator('button');
  const listboxes = page.getByRole('listbox');

  await page.keyboard.press('Tab');
  await expect(listboxes.first()).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(buttons.first()).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(listboxes.last()).toBeFocused();
});

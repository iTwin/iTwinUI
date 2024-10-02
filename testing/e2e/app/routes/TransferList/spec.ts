import { test, expect } from '@playwright/test';

test.describe('toolbar pattern in TransferList.Toolbar', () => {
  test("should have role='toolbar'", async ({ page }) => {
    await page.goto('/TransferList');
    const toolbar = page.getByRole('toolbar');
    await expect(toolbar).toHaveCount(1);
  });

  test('should support toolbar arrow-key keyboard navigation', async ({
    page,
  }) => {
    await page.goto('/TransferList');
    const listboxes = page.getByRole('listbox');
    const toolbar = page.getByRole('toolbar');
    const buttons = toolbar.first().locator('button');

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

  test('should have only one tab stop and support Tab/Shift+Tab key navigation', async ({
    page,
  }) => {
    await page.goto('/TransferList');
    const listboxes = page.getByRole('listbox');
    const toolbar = page.getByRole('toolbar');
    const buttons = toolbar.first().locator('button');

    await page.keyboard.press('Tab');
    await expect(listboxes.first()).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(buttons.first()).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(listboxes.last()).toBeFocused();

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    await expect(buttons.first()).toBeFocused();

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    await expect(listboxes.first()).toBeFocused();
  });
});

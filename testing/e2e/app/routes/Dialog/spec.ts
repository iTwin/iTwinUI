import { test, expect } from '@playwright/test';

test.describe('Dialog triggers', () => {
  test('should close dialog when pressing Esc', async ({ page }) => {
    await page.goto('/Dialog');

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });
});

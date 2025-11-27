import { test, expect } from '@playwright/test';

test.describe('Toaster', () => {
  test.describe('should not create nested toast containers', () => {
    test('inside ThemeProvider', async ({ page }) => {
      await page.goto('/Toaster');
      const rootToast = page.getByText('Toast (root)');
      await expect(rootToast).toBeVisible();

      const nestedToast = page.getByText('Toast (nested)');
      await expect(nestedToast).toBeVisible();

      await expect(page.locator('[data-container="nested"]')).not.toContainText(
        'Toast',
      );
    });

    test('inside Popover', async ({ page }) => {
      await page.goto('/Toaster');

      // Open popover
      const popoverButton = page.getByRole('button', { name: 'Show popover' });
      await popoverButton.click();

      // Show toast
      const showToastButton = page.getByRole('button', { name: 'Show toast' });
      await showToastButton.click();

      const popoverToast = page.getByText('Toast (popover)');
      await expect(popoverToast).toBeVisible();

      // Toast should not be inside the popover
      const popover = page.getByRole('dialog');
      await expect(popover).toBeVisible();
      await expect(popover).not.toContainText('Toast');
    });
  });

  test('should work when using portalContainer prop', async ({ page }) => {
    await page.goto('/Toaster?portal=true');

    const portalToast = page.getByText('Toast (portal)');
    await expect(portalToast).toBeVisible();
  });
});

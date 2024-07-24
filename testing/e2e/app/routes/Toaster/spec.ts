import { test, expect } from '@playwright/test';

test.describe('Toaster', () => {
  test('should not create nested toast containers', async ({ page }) => {
    await page.goto('/Toaster');

    const rootToast = page.getByText('Toast (root)');
    await expect(rootToast).toBeVisible();

    const nestedToast = page.getByText('Toast (nested)');
    await expect(nestedToast).toBeVisible();

    await expect(page.locator('[data-container="nested"]')).not.toContainText(
      'Toast',
    );
  });

  test('should work when using portalContainer prop', async ({ page }) => {
    await page.goto('/Toaster?portal=true');

    const portalToast = page.getByText('Toast (portal)');
    await expect(portalToast).toBeVisible();
  });
});

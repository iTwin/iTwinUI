import { test, expect } from '@playwright/test';

test.describe('Popover (focus)', () => {
  test('should focus the popover by default', async ({ page }) => {
    await page.goto('/Popover');
    await page.click('button');
    await expect(page.getByRole('dialog')).toBeFocused();
  });

  test('should give priority to imperative focus', async ({ page }) => {
    await page.goto('/Popover?imperativeFocus=true');
    await page.click('button');
    await expect(page.getByRole('heading')).toBeFocused();
  });

  test('should give priority to interactive elements inside the popover', async ({
    page,
  }) => {
    await page.goto('/Popover?focusInput=true');
    await page.click('button');
    await expect(page.locator('input')).toBeFocused();
  });
});

import { test, expect } from '@playwright/test';

test.describe('Popover (focus)', () => {
  test('should focus the popover by default', async ({ page }) => {
    await page.goto('/Popover');
    await page.click('button');
    await expect(page.getByRole('dialog')).toBeFocused();
  });

  test('should allow imperative focus', async ({ page }) => {
    await page.goto('/Popover?imperativeFocus=true');
    await page.click('button');
    await expect(page.getByRole('heading')).toBeFocused();
  });

  test('should prioritize interactive elements inside the popover content (over the popover element)', async ({
    page,
  }) => {
    await page.goto('/Popover?focusInput=true');
    await page.click('button');
    await expect(page.locator('input')).toBeFocused();
  });

  test('should prioritize imperative focus over interactive elements', async ({
    page,
  }) => {
    await page.goto('/Popover?focusInput=true&imperativeFocus=true');
    await page.click('button');
    await expect(page.locator('heading')).toBeFocused();
  });
});

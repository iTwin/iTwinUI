import { test, expect } from '@playwright/test';

test.describe('Select', () => {
  test('should set focus on select and call onBlur', async ({ page }) => {
    await page.goto('/Select');

    const select = page.locator('.SelectButton');
    console.log('select', select);

    await select.focus();
    await expect(select).toBeFocused();

    await select.click();
    await expect(select).not.toBeFocused();

    await page.waitForTimeout(50);
  });
});

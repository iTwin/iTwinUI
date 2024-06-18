import { test, expect } from '@playwright/test';
import { keyboardPressOptions } from '~/utils/utils.js';

test.describe('Menu', () => {
  test('should move focus appropriately upon Menu open and close', async ({
    page,
  }) => {
    await page.goto('/Menu?children=complex&visible=false');

    const menu = page.locator('.Menu');
    await expect(menu).not.toBeVisible();

    // Click the trigger
    const button = page.getByTestId('toggle-menu-button');
    await button.click();
    await expect(menu).toBeVisible();

    // Opening the menu with a mouse click should keep the focus on the trigger itself.
    await expect(button).toBeFocused();

    // Close the menu
    await button.click();
    await expect(menu).not.toBeVisible();
    await expect(button).toBeFocused();

    // Focus the trigger and press Enter
    await page.keyboard.press('Enter', keyboardPressOptions);
    await expect(menu).toBeVisible();

    // Opening the menu with a keyboard press should focus the first focusable item.
    await expect(page.getByTestId('FocusTarget-0')).toBeFocused();
  });
});

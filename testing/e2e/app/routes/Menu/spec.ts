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

  test('should handle keyboard navigation', async ({ page }) => {
    await page.goto('/Menu?children=complex&visible=false');

    const menu = page.locator('.Menu');
    await expect(menu).not.toBeVisible();

    const button = page.getByTestId('toggle-menu-button');
    await button.focus();
    await page.keyboard.press('Enter', keyboardPressOptions);

    await expect(menu).toBeVisible();
    await expect(page.getByTestId('FocusTarget-0')).toBeFocused();

    // Should not loop around when navigating past the first or the last item.
    await page.keyboard.press('ArrowUp', keyboardPressOptions);
    await expect(page.getByTestId('FocusTarget-0')).toBeFocused();

    // Should skip all checkboxes, disabled items, and separators.
    await page.keyboard.press('ArrowDown', keyboardPressOptions);
    await expect(page.getByTestId('FocusTarget-1')).toBeFocused();
    await page.keyboard.press('ArrowDown', keyboardPressOptions);
    await expect(page.getByTestId('FocusTarget-2')).toBeFocused();
    await page.keyboard.press('ArrowDown', keyboardPressOptions);
    await expect(page.getByTestId('FocusTarget-3')).toBeFocused();

    // Should not loop around when navigating past the first or the last item.
    await page.keyboard.press('ArrowDown', keyboardPressOptions);
    await expect(page.getByTestId('FocusTarget-3')).toBeFocused();

    // ArrowUp should also work similar to ArrowDown
    await page.keyboard.press('ArrowUp', keyboardPressOptions);
    await expect(page.getByTestId('FocusTarget-2')).toBeFocused();
    await page.keyboard.press('ArrowUp', keyboardPressOptions);
    await expect(page.getByTestId('FocusTarget-1')).toBeFocused();
    await page.keyboard.press('ArrowUp', keyboardPressOptions);
    await expect(page.getByTestId('FocusTarget-0')).toBeFocused();

    await page.waitForTimeout(50);
  });
});

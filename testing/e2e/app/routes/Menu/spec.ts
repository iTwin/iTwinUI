import { test, expect } from '@playwright/test';
import { keyboardPressOptions } from '~/utils/utils.js';

test.describe('Menu', () => {
  test('should render menu items', async ({ page }) => {
    await page.goto('/Menu');

    expect(page.locator('.Menu')).toBeVisible();
    for (let i = 0; i < 3; i++) {
      expect(page.getByTestId(`MenuItem-${i}`)).toBeVisible();
    }

    await page.waitForTimeout(50);
  });

  test('should automatically handle conditional rendering', async ({
    page,
  }) => {
    await page.goto('/Menu?visible=false');
    await page.waitForTimeout(50);

    expect(page.locator('.Menu')).toBeHidden();
    for (let i = 0; i < 3; i++) {
      expect(page.getByTestId(`MenuItem-${i}`)).toBeHidden();
    }

    const button = page.getByTestId('toggle-menu-button');
    await button.click();

    await expect(page.locator('.Menu')).toBeVisible();
    for (let i = 0; i < 3; i++) {
      await expect(page.getByTestId(`MenuItem-${i}`)).toBeVisible();
    }

    await page.waitForTimeout(50);
  });

  test('should render menu with custom role', async ({ page }) => {
    await page.goto('/Menu?role=listbox');

    expect(page.locator('.Menu[role="listbox"]')).toBeVisible();

    await page.waitForTimeout(50);
  });

  test('should focus selected item', async ({ page }) => {
    // TODO: Do we need to focus the selected item?
    // await page.goto('/Menu?selectedIndex=1');
    // expect(page.getByTestId('MenuItem-0')).not.toBeFocused();
    // expect(page.getByTestId('MenuItem-1')).toBeFocused();
    // expect(page.getByTestId('MenuItem-2')).not.toBeFocused();
    // await page.waitForTimeout(50);
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.goto('/Menu?children=complex&visible=false&listNavigation=true');

    const menu = page.locator('.Menu');
    await expect(menu).not.toBeVisible();

    const button = page.getByTestId('toggle-menu-button');
    await button.click();

    await expect(menu).toBeVisible();

    // The first item should be automatically focused.
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

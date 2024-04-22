import { test, expect } from '@playwright/test';

test.describe('Nested DropdownMenu', () => {
  test('should support deep level submenus', async ({ page }) => {
    await page.goto('/DropdownMenu');

    const trigger = page.getByTestId('trigger');
    await trigger.click();

    expect(page.getByTestId('Item 1_1')).toBeFocused();

    // Go to the deepest level using keyboard
    await page.keyboard.press('ArrowRight');
    expect(page.getByTestId('Item 2_1')).toBeFocused();

    await page.keyboard.press('ArrowDown');
    expect(page.getByTestId('Item 2_2')).toBeFocused();

    await page.keyboard.press('ArrowDown');
    expect(page.getByTestId('Item 2_3')).toBeFocused();

    await page.keyboard.press('ArrowRight');
    expect(page.getByTestId('Item 3_1')).toBeFocused();

    await page.keyboard.press('ArrowDown');
    expect(page.getByTestId('Item 3_2')).toBeFocused();

    await page.keyboard.press('ArrowDown');
    expect(page.getByTestId('Item 3_3')).toBeFocused();

    await page.keyboard.press('ArrowRight');
    expect(page.getByTestId('Item 3_3_1')).toBeFocused();

    // Hovering an ancestor "X" that has a submenu "Y" should close all submenus of "Y"
    const item1_1 = page.getByTestId('Item 1_1');
    await item1_1.hover();

    expect(page.getByTestId('Item 2_1')).toBeVisible();
    expect(page.getByTestId('Item 2_2')).toBeVisible();
    expect(page.getByTestId('Item 2_3')).toBeVisible();
    expect(page.getByTestId('Item 3_1')).toBeHidden();
    expect(page.getByTestId('Item 3_2')).toBeHidden();
    expect(page.getByTestId('Item 3_3')).toBeHidden();

    // Go to the deepest level using mouse
    await page.getByTestId('Item 2_3').hover();
    expect(page.getByTestId('Item 2_3')).toBeFocused();

    await page.getByTestId('Item 3_3').hover();
    expect(page.getByTestId('Item 3_3')).toBeFocused();

    await page.getByTestId('Item 3_3_1').hover();
    expect(page.getByTestId('Item 3_3_1')).toBeFocused();

    // When a node "X" is focused, should close "X"'s siblings' submenus
    // i.e. only one submenu in each menu should be open at a time
    await page.getByTestId('Item 3_2').hover();

    expect(page.getByTestId('Item 3_2_1')).toBeVisible();
    expect(page.getByTestId('Item 3_3_1')).toBeHidden();
  });
});

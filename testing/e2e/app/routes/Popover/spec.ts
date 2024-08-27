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
    await expect(page.getByRole('heading')).toBeFocused();
  });
});

test.describe('Nested popovers', () => {
  test('should work with ComboBox', async ({ page }) => {
    await page.goto('/Popover?nestedComboBox=true');
    await page.click('button');

    const popover = page.getByRole('dialog');
    const comboboxInput = page.getByRole('combobox');
    const comboboxListbox = page.getByRole('listbox');

    await expect(popover).toBeVisible();
    await expect(comboboxInput).toBeVisible();
    await expect(comboboxListbox).toBeVisible();

    // close the combobox
    await comboboxInput.click();
    await expect(comboboxListbox).not.toBeVisible();
    await expect(popover).toBeVisible();
  });
});

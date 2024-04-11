import { test, expect } from '@playwright/test';

test.describe('ButtonGroup', () => {
  test("should support keyboard navigation when role='toolbar'", async ({
    page,
  }) => {
    await page.goto('/ButtonGroup');

    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Button 1')).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(page.getByLabel('Button 2')).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(page.getByLabel('Button 3')).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(page.getByLabel('Button 1')).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(page.getByLabel('Button 3')).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(page.getByLabel('Button 2')).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(page.getByLabel('Button 1')).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(page.getByLabel('Button 3')).toBeFocused();
  });

  test("should support keyboard navigation when role='toolbar' and orientation='vertical'", async ({
    page,
  }) => {
    await page.goto('/ButtonGroup?orientation=vertical');

    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Button 1')).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(page.getByLabel('Button 2')).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(page.getByLabel('Button 3')).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(page.getByLabel('Button 1')).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(page.getByLabel('Button 3')).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(page.getByLabel('Button 2')).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(page.getByLabel('Button 1')).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(page.getByLabel('Button 3')).toBeFocused();
  });
});

import { test, expect } from '@playwright/test';

test(`Close menu items on click if it doesn't have subMenuItems`, async ({
  page,
}) => {
  await page.goto('/Tile');

  const button = page.getByTestId('tile-more-options');

  await page.getByTestId('tile').hover();
  await button.click();

  // Top-level MenuItems
  await expect(page.getByRole('menu')).toBeVisible();
  await page.getByRole('menuitem', { name: 'Item 1', exact: true }).click();
  await expect(page.getByRole('menu')).not.toBeVisible();

  // reset
  await page.getByTestId('tile').hover();
  await button.click();

  // Nested MenuItems
  await expect(page.getByRole('menu')).toBeVisible();
  await page.getByRole('menuitem', { name: 'Item 3', exact: true }).hover();
  await page.getByRole('menuitem', { name: 'Sub Item 1', exact: true }).click();
  await expect(page.getByRole('menu')).not.toBeVisible();
});

test("Don't close menu items if has subMenuItems", async ({ page }) => {
  await page.goto('/Tile');

  const button = page.getByTestId('tile-more-options');

  await page.getByTestId('tile').hover();
  await button.click();

  // Top-level MenuItems
  await expect(page.getByRole('menu')).toBeVisible();
  await page.getByRole('menuitem', { name: 'Item 3', exact: true }).hover();
  await expect(page.getByText('Sub Item 1', { exact: true })).toBeVisible();
  await page.getByRole('menuitem', { name: 'Item 3', exact: true }).click();

  await expect(page.getByText('Sub Item 1', { exact: true })).not.toBeVisible(); // close sub menu
  await expect(page.getByText('Item 1', { exact: true })).toBeVisible(); // don't close parent menu

  // reset
  await button.click();
  await page.getByTestId('tile').hover();
  await button.click();

  // Nested MenuItems
  await page.getByRole('menuitem', { name: 'Item 3', exact: true }).hover();
  await page.getByRole('menuitem', { name: 'Sub Item 2', exact: true }).hover();
  await expect(page.getByText('Sub Sub Item 1', { exact: true })).toBeVisible();
  await page.getByRole('menuitem', { name: 'Sub Item 2', exact: true }).click();

  await expect(
    page.getByText('Sub Sub Item 1', { exact: true }),
  ).not.toBeVisible(); // close sub menu
  await expect(page.getByText('Item 1', { exact: true })).toBeVisible(); // don't close parent menu
});

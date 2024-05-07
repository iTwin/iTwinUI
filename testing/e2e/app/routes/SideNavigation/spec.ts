import { test, expect } from '@playwright/test';

test.describe('SideNavigation tooltips', () => {
  test('should show tooltip when collapsed', async ({ page }) => {
    await page.goto('/SideNavigation');
    const homeButton = page.getByRole('button', { name: 'Home' });

    // hover Home
    {
      const tooltip = page.getByText('Home').locator('visible=true');
      await expect(tooltip).not.toBeVisible();
      await homeButton.hover();
      await expect(tooltip).toBeVisible();
    }

    // hover Settings
    {
      const settingsButton = page.getByRole('button', { name: 'Settings' });
      const tooltip = page.getByText('Settings').locator('visible=true');
      await expect(tooltip).not.toBeVisible();
      await settingsButton.hover();
      await expect(tooltip).toBeVisible();
    }
  });

  test('should not show tooltip when expanded', async ({ page }) => {
    await page.goto('/SideNavigation');
    const homeButton = page.getByRole('button', { name: 'Home' });

    // hover Home
    {
      expect(await page.getByText('Home').count()).toBe(1);
      await homeButton.hover();
      expect(await page.getByText('Home').count()).toBe(2);
    }

    // expand SideNavigation
    const expandButton = page.getByRole('button', {
      name: 'Toggle icon labels',
    });
    await expandButton.click();

    // hover Home again
    {
      expect(await page.getByText('Home').count()).toBe(1);
      await homeButton.hover();

      // count stays the same because tooltip is not shown
      expect(await page.getByText('Home').count()).toBe(1);
    }
  });
});

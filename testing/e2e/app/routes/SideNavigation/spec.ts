import { test, expect } from '@playwright/test';

test.describe('SideNavigation tooltips', () => {
  test('should show tooltip when collapsed', async ({ page }) => {
    await page.goto('/SideNavigation');

    // hover Home
    {
      const homeButton = page.getByRole('button', { name: 'Home' });
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
      await expect(page.getByText('Home')).toHaveCount(1);
      await homeButton.hover();
      await expect(page.getByText('Home')).toHaveCount(2);
    }

    // expand SideNavigation
    const expandButton = page.getByRole('button', {
      name: 'Toggle icon labels',
    });
    await expandButton.click();

    // hover Home again
    {
      await expect(page.getByText('Home')).toHaveCount(1);
      await homeButton.hover();

      // count stays the same because tooltip is not shown
      await expect(page.getByText('Home')).toHaveCount(1);
    }
  });
});

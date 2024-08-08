import { test, expect } from '@playwright/test';

test('should respect the portalContainer prop', async ({ page }) => {
  await page.goto('/ThemeProvider?withPortalContainer=true');

  await expect(page.locator('[data-container="custom"]')).toContainText(
    'main tooltip',
  );
});

test('should inherit the portalContainer if inheriting theme', async ({
  page,
}) => {
  await page.goto('/ThemeProvider?nested=true');

  const firstPortal = page.locator('[data-iui-portal]').first();

  // both tooltips should be in the same container
  await expect(firstPortal).toContainText('main tooltip');
  await expect(firstPortal).toContainText('nested tooltip');

  // main container should not have any tooltips because we portal to <body>
  const mainContainer = page.locator('[data-container="main"]');
  await expect(mainContainer).not.toContainText('tooltip');
});

test('should not inherit portalContainer across different windows', async ({
  page,
}) => {
  const popoutPromise = page.waitForEvent('popup');
  await page.goto('/ThemeProvider?popout=true');
  await page.click('button');
  const popout = await popoutPromise;

  await expect(popout.locator('[data-iui-portal]')).toContainText(
    'popout tooltip',
  );
  await expect(popout.locator('[data-container="popout"]')).not.toContainText(
    'tooltip',
  );
});

test('should not cause an infinite loop when portaled', async ({ page }) => {
  await page.goto('/ThemeProvider?portaled=true');

  await expect(page.locator('[data-portaled]')).toContainText(
    'hello (portaled)',
  );
});

test('should use the same theme for the main root and the portaled root', async ({
  page,
}) => {
  await page.goto('/ThemeProvider?themeSwitch=true');

  const mainRoot = page.locator('.MainRoot');
  const portaledRoot = page.locator('[data-iui-portal]', {
    hasText: 'tooltip',
  });
  const themeSwitchButton = page.getByRole('button', { name: 'Toggle theme' });
  const contrastSwitchButton = page.getByRole('button', {
    name: 'Toggle high contrast',
  });

  // dark, default contrast
  await expect(mainRoot).toHaveAttribute('data-iui-theme', 'dark');
  await expect(mainRoot).toHaveAttribute('data-iui-contrast', 'default');
  await expect(portaledRoot).toHaveAttribute('data-iui-theme', 'dark');
  await expect(portaledRoot).toHaveAttribute('data-iui-contrast', 'default');

  // light, default contrast
  await themeSwitchButton.click();
  await expect(mainRoot).toHaveAttribute('data-iui-theme', 'light');
  await expect(mainRoot).toHaveAttribute('data-iui-contrast', 'default');
  await expect(portaledRoot).toHaveAttribute('data-iui-theme', 'light');
  await expect(portaledRoot).toHaveAttribute('data-iui-contrast', 'default');

  // light, high contrast
  await contrastSwitchButton.click();
  await expect(mainRoot).toHaveAttribute('data-iui-theme', 'light');
  await expect(mainRoot).toHaveAttribute('data-iui-contrast', 'high');
  await expect(portaledRoot).toHaveAttribute('data-iui-theme', 'light');
  await expect(portaledRoot).toHaveAttribute('data-iui-contrast', 'high');

  // dark, high contrast
  await themeSwitchButton.click();
  await expect(mainRoot).toHaveAttribute('data-iui-theme', 'dark');
  await expect(mainRoot).toHaveAttribute('data-iui-contrast', 'high');
  await expect(portaledRoot).toHaveAttribute('data-iui-theme', 'dark');
  await expect(portaledRoot).toHaveAttribute('data-iui-contrast', 'high');
});

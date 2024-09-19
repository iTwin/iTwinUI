import { test, expect } from '@playwright/test';

test('styles should exist in popout window', async ({ page }) => {
  const popoutPromise = page.waitForEvent('popup');
  await page.goto('/VisuallyHidden?popout=true');
  await page.click('button');
  const popout = await popoutPromise;

  const visuallyHidden = popout.getByText('Hello');
  await expect(visuallyHidden).toHaveCSS('position', 'absolute');
});

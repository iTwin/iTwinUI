import { test, expect } from '@playwright/test';

test('should greet the world', async ({ page }) => {
  await page.goto('/');

  const h1 = page.getByRole('heading', { level: 1 });
  await expect(h1).toHaveText('Hello world');
});

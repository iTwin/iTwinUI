import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

test('should greet the world', async ({ page }) => {
  await page.goto('/');

  const h1 = page.getByRole('heading', { level: 1 });
  await expect(h1).toHaveText('Hello world');
});

test('should have correct meta information', async ({ page }) => {
  await page.goto('/');

  const { version } = JSON.parse(
    await fs.promises.readFile(
      require.resolve('@itwin/itwinui-react/package.json'),
      'utf8',
    ),
  );

  await expect(page.getByTestId('version')).toHaveText(version);
  await expect(page.getByTestId('module')).toHaveText('ESM');
});

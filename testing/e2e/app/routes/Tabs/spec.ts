import { expect, test } from '@playwright/test';

// https://github.com/iTwin/iTwinUI/issues/2465
test('Keyboard navigation should work on virtualized tree', async ({
  page,
}) => {
  await page.goto('/Tabs');

  const testWrapper = page.getByTestId('test-wrapper');

  // Resize testContainer to trigger overflow
  await testWrapper.evaluate((el) => {
    el.style.width = '585px';
  });

  await page.getByTestId('test1').click();

  const tabsWrapper = page.getByTestId('tabs-wrapper');
  const stripePosition = await tabsWrapper.evaluate((el) => {
    return getComputedStyle(el).getPropertyValue('--iui-tabs-stripe-position');
  });

  await expect(stripePosition).toContain('658'); // The stripe should be where test1 is. i.e. at 658px
});

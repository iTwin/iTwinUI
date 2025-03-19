import { expect, test } from '@playwright/test';

// https://github.com/iTwin/iTwinUI/issues/2465
test('tab stripe is positioned correctly when tablist overflows/scrolls', async ({
  page,
}) => {
  await page.goto('/Tabs');

  const testWrapper = page.getByTestId('test-wrapper');
  const tabsWrapper = page.getByTestId('tabs-wrapper');
  const tabs = page.getByRole('tab');

  // Resize testWrapper to trigger overflow
  await testWrapper.evaluate((el) => {
    el.style.width = '585px';
  });

  await page.getByTestId('test1').click();

  const stripePosition = await tabsWrapper.evaluate((el) =>
    getComputedStyle(el).getPropertyValue('--iui-tabs-stripe-position'),
  );

  // test1 is the third tab, so we need to get the width of the first two tabs
  const expectedStripePosition = await tabs.evaluateAll((elements) =>
    elements
      .slice(0, 2)
      .map((el) => el.getBoundingClientRect().width)
      .reduce((a, b) => a + b, 0),
  );

  await expect(stripePosition).toEqual(`${expectedStripePosition}px`);
});

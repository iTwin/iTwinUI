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

test('onValueChange is called only when the value *changes*', async ({
  page,
}) => {
  await page.goto('/Tabs');

  const counter = page.getByTestId('counter');
  const tabs = page.getByRole('tab');

  await expect(counter).toHaveText('1'); // Always called once in the beginning
  await tabs.nth(0).click();
  await expect(counter).toHaveText('1'); // No change since the first tab is already selected, so no call

  await tabs.nth(1).click();
  await expect(counter).toHaveText('2');

  await tabs.nth(1).click();
  await expect(counter).toHaveText('2'); // No change, so no call
  await tabs.nth(1).focus();
  await expect(counter).toHaveText('2'); // No change, so no call

  await tabs.nth(2).focus();
  await expect(counter).toHaveText('3');
});

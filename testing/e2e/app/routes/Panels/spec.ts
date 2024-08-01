import { test, expect, Locator } from '@playwright/test';

test('should display initialActiveId as the initial panel', async ({
  page,
}) => {
  await page.goto('/Panels');

  await expect(page.locator('#root')).toBeVisible();
  await expect(page.locator('#more-info')).not.toBeVisible();
});

test('should animate to the next panel when the trigger is clicked', async ({
  page,
}) => {
  await page.goto('/Panels');

  await expect(page.locator('#root')).toBeVisible();
  await expect(page.locator('#more-info')).not.toBeVisible();

  const rootPanel = page.locator('#root').first();
  const moreInfoPanel = page.locator('#more-info').first();

  expect(await getComputedTransform(rootPanel)).toBe('none');
  expect(await getComputedTransform(moreInfoPanel)).toBe('none');

  await page.locator('#root button').first().click();

  await page.waitForTimeout(100);

  // Animation start
  expect(await getComputedTransform(rootPanel)).not.toBe('none');
  expect(await getComputedTransform(moreInfoPanel)).not.toBe('none');

  await page.waitForTimeout(550);

  // Animation end
  expect(await getComputedTransform(rootPanel)).toBe('none');
  expect(await getComputedTransform(moreInfoPanel)).toBe('none');

  await expect(page.locator('#root')).not.toBeVisible();
  await expect(page.locator('#more-info')).toBeVisible();
});

(['reduced motion is enabled', 'animations are disabled'] as const).forEach(
  (mode) => {
    test(`should not animate when ${mode}`, async ({ page }) => {
      if (mode === 'reduced motion is enabled') {
        await page.goto('/Panels');
        await page.emulateMedia({ reducedMotion: 'reduce' });
      } else {
        await page.goto('/Panels?disableAnimations=true');
      }

      await expect(page.locator('#root')).toBeVisible();
      await expect(page.locator('#more-info')).not.toBeVisible();

      await page.locator('#root button').first().click();

      await page.waitForTimeout(10);

      expect(page.locator('#root')).not.toBeVisible();
      expect(page.locator('#more-info')).toBeVisible();
    });
  },
);

test('should hide inactive or animating panels', async ({ page }) => {
  await page.goto('/Panels?exampleType=multi-panel-information-panel');

  await expect(page.locator('#root')).toBeVisible();

  const pages = Array.from(Array(20).keys());

  for (const i of pages) {
    await expect(page.locator(`#panel-${i}`).first()).not.toBeVisible();
  }

  await page.locator('#root button').first().click();

  // Animation in-progress
  await page.waitForTimeout(100);

  await expect(page.locator('#root')).toBeVisible();
  await expect(page.locator('#panel-0')).toBeVisible();

  for (let i = 0; i < pages.length; i++) {
    if (i !== 0) {
      await expect(page.locator(`#panel-${i}`).first()).not.toBeVisible();
    }

    // All panels should be inert during animations
    await expect(page.locator(`#panel-${i}`).first()).toHaveAttribute('inert');
  }

  // Animation over
  await page.waitForTimeout(550);

  await expect(page.locator('#root')).not.toBeVisible();
  await expect(page.locator('#panel-0')).toBeVisible();

  for (let i = 1; i < pages.length; i++) {
    await expect(page.locator(`#panel-${i}`).first()).not.toBeVisible();
  }
});

test('should not go to a panel that does not exist', async ({ page }) => {
  await page.goto('/Panels?animationDuration=0');

  await expect(page.locator('#root')).toBeVisible();
  await expect(page.locator('#more-info')).not.toBeVisible();

  await page.locator('#panel-trigger-dne').first().click();

  await page.waitForTimeout(100);

  await expect(page.locator('#root')).toBeVisible();
  await expect(page.locator('#more-info')).not.toBeVisible();
});

test('should not go back when no trigger points to a panel', async ({
  page,
}) => {
  await page.goto(
    '/Panels?exampleType=multi-panel-information-panel&showRootPanelBackButton=true&animationDuration=0',
  );

  const panels = Array.from(Array(20).keys());

  await expect(page.locator('#root')).toBeVisible();
  for (let i = 0; i < panels.length; i++) {
    await expect(page.locator(`#panel-${i}`).first()).not.toBeVisible();
  }

  await page.locator('#root-panel-back-button').first().click();

  await page.waitForTimeout(10);

  await expect(page.locator('#root')).toBeVisible();
  for (let i = 0; i < panels.length; i++) {
    await expect(page.locator(`#panel-${i}`).first()).not.toBeVisible();
  }
});

test('should not show a back button in the Panels.Header if no trigger points to the panel', async ({
  page,
}) => {
  await page.goto('/Panels');

  await expect(page.locator('#panels-header-1 button')).toHaveCount(0);
  await expect(page.locator('#panels-header-2 button')).toHaveCount(1);
});

test('should support custom animation options', async ({ page }) => {
  await page.goto('/Panels?animationDuration=10');

  await expect(page.locator('#root')).toBeVisible();
  await expect(page.locator('#more-info')).not.toBeVisible();

  await page.locator('#root button').first().click();

  await page.waitForTimeout(20);

  // Animation should have been finished in around 10ms instead of the default duration
  expect(page.locator('#root')).not.toBeVisible();
  expect(page.locator('#more-info')).toBeVisible();
});

// ----------------------------------------------------------------------------

const getComputedTransform = async (locator: Locator) => {
  return locator.evaluate((el) => getComputedStyle(el).transform);
};

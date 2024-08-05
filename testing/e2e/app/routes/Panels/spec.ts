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

      const rootPanel = page.locator('#root').first();
      const moreInfoPanel = page.locator('#more-info').first();

      await expect(rootPanel).toBeVisible();
      await expect(moreInfoPanel).not.toBeVisible();

      await page.locator('#root button').first().click();

      await page.waitForTimeout(100);

      // Animation should not have started
      expect(await getComputedTransform(rootPanel)).toBe('none');
      expect(await getComputedTransform(moreInfoPanel)).toBe('none');

      await expect(rootPanel).not.toBeVisible();
      await expect(moreInfoPanel).toBeVisible();
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

  const rootPanel = page.locator('#root').first();
  const moreInfoPanel = page.locator('#more-info').first();

  await expect(rootPanel).toBeVisible();
  await expect(moreInfoPanel).not.toBeVisible();

  await page.locator('#root button').first().click();

  await page.waitForTimeout(50);

  // Animation should have been finished in around 10ms instead of the default duration
  expect(await getComputedTransform(rootPanel)).toBe('none');
  expect(await getComputedTransform(moreInfoPanel)).toBe('none');

  await expect(rootPanel).not.toBeVisible();
  await expect(moreInfoPanel).toBeVisible();
});

test('should support panel instance methods', async ({ page }) => {
  await page.goto('/Panels?');

  // Preventing animations during testing
  await page.emulateMedia({ reducedMotion: 'reduce' });

  const rootPanel = page.locator('#root').first();
  const moreInfoPanel = page.locator('#more-info').first();

  await expect(rootPanel).toBeVisible();
  await expect(moreInfoPanel).not.toBeVisible();

  await page.locator('#root button').first().click();

  await expect(rootPanel).not.toBeVisible();
  await expect(moreInfoPanel).toBeVisible();

  // To explicitly test if animating or not
  await page.emulateMedia({ reducedMotion: 'no-preference' });

  // Should animate back when instance.goBack() is called
  expect(await getComputedTransform(rootPanel)).toBe('none');
  expect(await getComputedTransform(moreInfoPanel)).toBe('none');

  await page.locator('#instance-go-back').first().click();

  await page.waitForTimeout(100);

  // Animation start
  expect(await getComputedTransform(rootPanel)).not.toBe('none');
  expect(await getComputedTransform(moreInfoPanel)).not.toBe('none');

  await page.waitForTimeout(550);

  // Animation end
  expect(await getComputedTransform(rootPanel)).toBe('none');
  expect(await getComputedTransform(moreInfoPanel)).toBe('none');

  await expect(rootPanel).toBeVisible();
  await expect(moreInfoPanel).not.toBeVisible();

  await page.emulateMedia({ reducedMotion: 'reduce' });

  // Should not go back if no trigger points to the current panel
  await page.locator('#instance-go-back').first().click();

  await page.waitForTimeout(50);
  expect(await getComputedTransform(rootPanel)).toBe('none');
  expect(await getComputedTransform(moreInfoPanel)).toBe('none');

  await expect(rootPanel).toBeVisible();
  await expect(moreInfoPanel).not.toBeVisible();
});

test('should support nested panels', async ({ page }) => {
  const initialActiveId = 'root';
  const panel1Id = 'panel-1';
  const panel1_1Id = 'panel-1-1';
  const panel1_1_1Id = 'panel-1-1-1';

  const panels = [initialActiveId, panel1Id, panel1_1Id, panel1_1_1Id];

  await page.goto('/Panels?exampleType=nested-panels');
  await page.emulateMedia({ reducedMotion: 'reduce' });

  await expect(page.locator(`#${initialActiveId}`)).toBeVisible();
  for (let i = 1; i < panels.length; i++) {
    await expect(page.locator(`#${panels[i]}`)).not.toBeVisible();
  }

  for (let i = 0; i < panels.length; i++) {
    await page.locator(`#${panels[i]} button`).last().click();

    for (let j = 0; j < panels.length; j++) {
      if (
        // If the last panel has a trigger pointing nowhere, should stay at the last panel
        (i === panels.length - 1 && i === j) ||
        // Next panel should be visible
        j === i + 1
      ) {
        await expect(page.locator(`#${panels[j]}`)).toBeVisible();
      } else {
        await expect(page.locator(`#${panels[j]}`)).not.toBeVisible();
      }
    }
  }
});

// ----------------------------------------------------------------------------

const getComputedTransform = async (locator: Locator) => {
  return locator.evaluate((el) => getComputedStyle(el).transform);
};

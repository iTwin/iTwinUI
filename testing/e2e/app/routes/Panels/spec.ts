import { test, expect } from '@playwright/test';

test('should display initialActiveId as the initial panel', async ({
  page,
}) => {
  await page.goto('/Panels');

  await expect(page.locator('#root')).toBeVisible();
  await expect(page.locator('#more-info')).not.toBeVisible();
});

test('should go to the next panel when the trigger is clicked', async ({
  page,
}) => {
  await page.goto('/Panels');

  // Wait for Panels inner states to stabilize
  await page.waitForTimeout(550);

  const panelsWrapper = page.locator('#panels-wrapper');
  const rootPanel = page.locator('#root');
  const moreInfoPanel = page.locator('#more-info');
  const moreInfoPanelHeaderTitle = page.locator('#more-info-header-title');
  const rootPanelTrigger = page.locator('#root button');

  await expect(panelsWrapper.locator(':scope > *')).toHaveCount(1);
  await expect(rootPanel).toBeVisible();
  await expect(moreInfoPanel).toHaveCount(0);

  await rootPanelTrigger.first().click();

  // TODO: How to test scroll? The scrolling didn't seem to happen when testing in playwright ui mode

  await expect(panelsWrapper.locator(':scope > *')).toHaveCount(2);
  await expect(rootPanel).toBeVisible();
  await expect(rootPanel).toHaveAttribute('inert');
  await expect(moreInfoPanelHeaderTitle).toBeFocused();
  await expect(moreInfoPanel).toBeVisible();

  await expect(panelsWrapper.locator(':scope > *')).toHaveCount(1);
  await expect(rootPanel).toHaveCount(0);
  await expect(moreInfoPanel).toBeVisible();
});

(['back button is clicked', 'instance.goBack() is called'] as const).forEach(
  (backNavigationTrigger) => {
    test(`should go back to the previous panel when ${backNavigationTrigger}`, async ({
      page,
    }) => {
      await page.goto('/Panels');

      // Wait for Panels inner states to stabilize
      await page.waitForTimeout(550);

      const panelsWrapper = page.locator('#panels-wrapper');
      const rootPanel = page.locator('#root');
      const moreInfoPanel = page.locator('#more-info');
      const moreInfoPanelHeader = page.locator('#panels-header-2');
      const instanceGoBackButton = page.locator('#instance-go-back');
      const rootPanelTrigger = page.locator('#root button');

      await rootPanelTrigger.first().click();

      await expect(panelsWrapper.locator(':scope > *')).toHaveCount(1);
      await expect(rootPanel).toHaveCount(0);
      await expect(moreInfoPanel).toBeVisible();

      if (backNavigationTrigger === 'back button is clicked') {
        await moreInfoPanelHeader.locator(':scope button').first().click();
      } else {
        await instanceGoBackButton.first().click();
      }

      await expect(panelsWrapper.locator(':scope > *')).toHaveCount(2);
      await expect(rootPanel).toBeVisible();
      await expect(moreInfoPanel).toBeVisible();

      await expect(panelsWrapper.locator(':scope > *')).toHaveCount(1);
      await expect(rootPanel).toBeVisible();
      await expect(moreInfoPanel).toHaveCount(0);

      await expect(rootPanelTrigger.first()).toBeFocused();
    });
  },
);

test(`should not scroll when reduced motion is enabled`, async ({ page }) => {
  await page.goto('/Panels');
  await page.emulateMedia({ reducedMotion: 'reduce' });

  const rootPanelTrigger = page.locator('#root button');

  await rootPanelTrigger.first().click();

  // TODO: How to test scroll? The front scrolling didn't seem to happen when testing in playwright ui mode.
  // But maybe back scrolling works?
});

test('should inert and/or unmount inactive panels', async ({ page }) => {
  await page.goto('/Panels?exampleType=multi-panel-information-panel');

  // Wait for Panels inner states to stabilize
  await page.waitForTimeout(550);

  await expect(page.locator('#root')).toBeVisible();

  const pages = Array.from(Array(20).keys());

  for (const i of pages) {
    await expect(page.locator(`#panel-${i}`)).toHaveCount(0);
  }

  await page.locator('#root button').first().click();

  await expect(page.locator('#root')).toBeVisible();
  await expect(page.locator('#panel-0')).toBeVisible();

  // visible inactive panels should be inert
  await expect(page.locator('#root')).toHaveAttribute('inert');
  await expect(page.locator('#panel-0')).not.toHaveAttribute('inert');

  // non-visible inactive panels should be unmounted
  for (let i = 1; i < pages.length; i++) {
    await expect(page.locator(`#panel-${i}`)).toHaveCount(0);
  }

  // after scroll finishes, even the previously visible inactive panel should be unmounted
  await page.waitForTimeout(550);
  expect(await page.locator('#root').count()).toBe(0);
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

test('should not show a back button in the Panels.Header if no trigger points to the panel', async ({
  page,
}) => {
  await page.goto('/Panels');
  await expect(page.locator('#panels-header-1 button')).toHaveCount(0);
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

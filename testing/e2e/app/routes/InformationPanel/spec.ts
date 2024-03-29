import { test, expect, type Page } from '@playwright/test';

test.describe('Information Panel Resizing', () => {
  test('should adjust information panel width', async ({ page }) => {
    await page.goto('/InformationPanel', { waitUntil: 'domcontentloaded' });
    const infoPanel = page.locator('#InformationPanel');
    const initialWidth = (await infoPanel.boundingBox())?.width;
    expect(await infoPanel.getAttribute('style')).toBeFalsy();

    await resizeInformationPanel(page);

    const newWidth = (await infoPanel.boundingBox())?.width;
    expect(newWidth).toBe((initialWidth as number) - 100);
    expect(await infoPanel.getAttribute('style')).toBeTruthy();
  });
  test('should reset styles on orientation change', async ({ page }) => {
    await page.goto('/InformationPanel', { waitUntil: 'domcontentloaded' });
    const infoPanel = page.locator('#InformationPanel');
    expect(await infoPanel.getAttribute('style')).toBeFalsy();

    await resizeInformationPanel(page);

    expect(await infoPanel.getAttribute('style')).toBeTruthy();
    await page.click('#OrientationButton');
    expect(await infoPanel.getAttribute('style')).toBeFalsy();
  });

  async function resizeInformationPanel(page: Page) {
    const resizer = page.locator('._iui3-resizer');
    const resizerBox = await resizer.boundingBox();

    if (resizerBox) {
      await resizer.hover({
        position: { x: resizerBox.width / 2, y: resizerBox.height / 2 },
      });
      await page.mouse.down();
      await page.mouse.move(
        Math.max(1, resizerBox.x + 100 + resizerBox.width / 2),
        resizerBox.y + resizerBox.height / 2,
        { steps: 5 },
      );
      await page.mouse.up();
    }
  }
});

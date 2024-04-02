import { test, expect, type Page } from '@playwright/test';

test.describe('Information Panel Resizing', () => {
  test('should adjust information panel width', async ({ page }) => {
    await page.goto('/InformationPanel');
    const infoPanel = page.locator('#InformationPanel');
    const initialWidth = (await infoPanel.boundingBox())!.width;

    await resizeInformationPanel(page);

    const newWidth = (await infoPanel.boundingBox())!.width;
    expect(newWidth).toBe(initialWidth - 100);
  });
  test('should reset styles on orientation change', async ({ page }) => {
    await page.goto('/InformationPanel');
    const infoPanel = page.locator('#InformationPanel');
    const infoPanelWrapper = page.locator('#InformationPanelWrapper');
    const wrapperWidth = (await infoPanelWrapper.boundingBox())!.width;
    const wrapperHeight = (await infoPanelWrapper.boundingBox())!.height;
    const orientationButton = page.getByRole('button');

    const initialWidth = (await infoPanel.boundingBox())!.width;

    {
      await resizeInformationPanel(page);
      const newWidth = (await infoPanel.boundingBox())!.width;
      expect(newWidth).toBe(initialWidth - 100);
    }

    {
      await orientationButton.click();
      const newWidth = (await infoPanel.boundingBox())!.width;
      expect(newWidth).toBe(wrapperWidth);
    }

    {
      const initialHeight = (await infoPanel.boundingBox())!.height;
      await resizeInformationPanel(page, { orientation: 'horizontal' });
      const newHeight = (await infoPanel.boundingBox())!.height;
      expect(newHeight).toBe(initialHeight - 100);
    }

    {
      await orientationButton.click();
      const newHeight = (await infoPanel.boundingBox())!.height;
      expect(newHeight).toBe(wrapperHeight);
    }
  });

  async function resizeInformationPanel(
    page: Page,
    { orientation = 'vertical' } = {},
  ) {
    const infoPanel = page.locator('#InformationPanel');
    const infoPanelBox = await infoPanel.boundingBox();

    if (infoPanelBox) {
      if (orientation === 'vertical') {
        await infoPanel.hover({
          position: { x: 0, y: infoPanelBox.height / 2 },
        });
      } else {
        await infoPanel.hover({
          position: { x: infoPanelBox.width / 2, y: 0 },
        });
      }
      await page.mouse.down();
      if (orientation === 'vertical') {
        await page.mouse.move(
          Math.max(1, infoPanelBox.x + 100),
          infoPanelBox.y + infoPanelBox.height / 2,
          { steps: 5 },
        );
      } else {
        await page.mouse.move(
          infoPanelBox.x + infoPanelBox.width / 2,
          Math.max(1, infoPanelBox.y + 100),
          { steps: 5 },
        );
      }
      await page.mouse.up();
    }
  }
});

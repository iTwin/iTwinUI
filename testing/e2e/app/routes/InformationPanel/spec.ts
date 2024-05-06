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
    // When orientation changes, the style of the panel should be reset so that the width, if it is being made horizontal, or height, if it is becoming vertical, becomes the same as the wrapper's value.
    await page.goto('/InformationPanel');
    const infoPanel = page.locator('#InformationPanel');
    const infoPanelWrapper = page.locator('#InformationPanelWrapper');
    const wrapperWidth = (await infoPanelWrapper.boundingBox())!.width;
    const wrapperHeight = (await infoPanelWrapper.boundingBox())!.height;
    const orientationButton = page.getByRole('button');

    const initialWidth = (await infoPanel.boundingBox())!.width;

    // Tests resizing the panel's width.
    {
      await resizeInformationPanel(page);
      const newWidth = (await infoPanel.boundingBox())!.width;
      expect(newWidth).toBe(initialWidth - 100);
    }

    // Changes the orientation and makes sure that the width becomes the same as the wrapper's.
    {
      await orientationButton.click();
      const newWidth = (await infoPanel.boundingBox())!.width;
      expect(newWidth).toBe(wrapperWidth);
    }

    // Tests resizing the panel's height.
    {
      const initialHeight = (await infoPanel.boundingBox())!.height;
      await resizeInformationPanel(page, { orientation: 'horizontal' });
      const newHeight = (await infoPanel.boundingBox())!.height;
      expect(newHeight).toBe(initialHeight + 100);
    }

    // Changes orientation again and makes sure that height returns to the wrapper's height.
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
          Math.max(1, infoPanelBox.y - 100),
          { steps: 5 },
        );
      }
      await page.mouse.up();
    }
  }
});

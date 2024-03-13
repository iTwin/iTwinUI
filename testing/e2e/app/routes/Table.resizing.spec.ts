import { test, expect, type Page } from '@playwright/test';

test.describe('Table resizing', () => {
  test('should adjust column widths', async ({ page }) => {
    await page.goto('/Table/resizing');
    const resizers = page.getByRole('separator');

    // resize first column
    {
      const initialWidths = await getColumnWidths(page);
      const resizerBox = (await resizers.first().boundingBox())!;
      await resizers
        .first()
        .hover({ position: { x: resizerBox.width / 2, y: 0 } });

      await page.mouse.down();
      await page.mouse.move(
        resizerBox.x + 100 + resizerBox.width / 2,
        resizerBox.y,
      );
      await page.mouse.up();

      const newWidths = await getColumnWidths(page);
      expect(newWidths[0]).toBe(initialWidths[0] + 100);
      expect(newWidths[1]).toBe(initialWidths[1] - 100);
    }

    // resize second column
    {
      const initialWidths = await getColumnWidths(page);
      const resizerBox = (await resizers.nth(1).boundingBox())!;
      await resizers
        .nth(1)
        .hover({ position: { x: resizerBox.width / 2, y: 0 } });

      await page.mouse.down();
      await page.mouse.move(
        resizerBox.x - 100 + resizerBox.width / 2,
        resizerBox.y,
      );
      await page.mouse.up();

      const newWidths = await getColumnWidths(page);
      expect(newWidths[1]).toBe(initialWidths[1] - 100);
      expect(newWidths[2]).toBe(initialWidths[2]); // this one is not resizable
      expect(newWidths[3]).toBe(initialWidths[3] + 100);
    }
  });

  test('should respect min width', async ({ page }) => {
    await page.goto('/Table/resizing');
    const resizers = page.getByRole('separator');

    // resize first column (has min width)
    {
      const initialWidths = await getColumnWidths(page);
      const resizerBox = (await resizers.first().boundingBox())!;
      await resizers
        .first()
        .hover({ position: { x: resizerBox.width / 2, y: 0 } });

      await page.mouse.down();
      await page.mouse.move(resizerBox.x - 30, resizerBox.y);
      await page.mouse.up();

      const newWidths = await getColumnWidths(page);
      expect(newWidths[0]).toBe(initialWidths[0]); // can't resize below min width
      expect(newWidths[1]).toBe(initialWidths[1]);
    }
  });

  test('should respect implicit min width', async ({ page }) => {
    await page.goto('/Table/resizing');
    const resizers = page.getByRole('separator');

    // resize second column
    {
      const resizerBox = (await resizers.nth(1).boundingBox())!;
      await resizers
        .nth(1)
        .hover({ position: { x: resizerBox.width / 2, y: 4 } });

      await page.mouse.down();
      await page.mouse.move(
        resizerBox.x - 400 + resizerBox.width / 2,
        resizerBox.y,
      );
      await page.mouse.up();

      const newWidths = await getColumnWidths(page);
      expect(newWidths[1]).toBe(72); // can't resize below implicit min width
    }

    // // resize last column (has explicit max width)
    // {
    //   const resizerBox = (await resizers.last().boundingBox())!;
    //   await resizers
    //     .last()
    //     .hover({ position: { x: resizerBox.width / 2, y: 0 } });

    //   await page.mouse.down();
    //   await page.mouse.move(resizerBox.x - 400, resizerBox.y);
    //   await page.mouse.up();

    //   const newWidths = await getColumnWidths(page);
    //   expect(newWidths[3]).toBe(300); // can't resize above max width
    // }
  });
});

const getColumnWidths = async (page: Page) => {
  const columnHeaders = page.locator('[role="columnheader"]');
  const columnCount = await columnHeaders.count();
  return await Promise.all(
    Array.from({ length: columnCount }).map(async (_, i) => {
      const header = columnHeaders.nth(i);
      return (await header.boundingBox())!.width;
    }),
  );
};

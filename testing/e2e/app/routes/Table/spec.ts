import { test, expect, type Page } from '@playwright/test';

test.describe('Table sorting', () => {
  test('should work with keyboard', async ({ page }) => {
    await page.goto('/Table');

    const firstColumnCells = page.locator('[role="cell"]:nth-child(2)');
    expect(firstColumnCells).toHaveText(['1', '2', '3']);

    await page.keyboard.press('Tab');

    // ascending
    await page.keyboard.press('Enter');
    expect(firstColumnCells).toHaveText(['1', '2', '3']);

    // descending
    await page.keyboard.press('Enter');
    expect(firstColumnCells).toHaveText(['3', '2', '1']);

    // ascending again
    await page.keyboard.press('Enter');
    expect(firstColumnCells).toHaveText(['1', '2', '3']);
  });
});

test.describe('Table resizing', () => {
  test('should adjust column widths', async ({ page }) => {
    await page.goto('/Table');

    // resize second column
    {
      const initialWidths = await getColumnWidths(page);

      const delta = +100;
      await resizeColumn({ index: 1, delta, page });

      const newWidths = await getColumnWidths(page);
      expect(newWidths[2]).toBe(initialWidths[2] + delta);
      expect(newWidths[3]).toBe(initialWidths[3] - delta);
    }

    // resize third column
    {
      const initialWidths = await getColumnWidths(page);

      const delta = +40;
      await resizeColumn({ index: 2, delta, page });

      const newWidths = await getColumnWidths(page);
      expect(newWidths[3]).toBe(initialWidths[3] + delta);
      expect(newWidths[4]).toBe(initialWidths[4] - delta);
    }
  });

  test('should respect columnResizeMode=expand', async ({ page }) => {
    await page.goto('/Table?columnResizeMode=expand');

    // resize second column
    {
      const initialWidths = await getColumnWidths(page);

      const delta = +100;
      await resizeColumn({ index: 1, delta, page });

      const newWidths = await getColumnWidths(page);
      expect(newWidths[2]).toBe(initialWidths[2] + delta);

      // other columns should not change
      expect(newWidths[0]).toBe(initialWidths[0]);
      expect(newWidths[1]).toBe(initialWidths[1]);
      expect(newWidths[3]).toBe(initialWidths[3]);
      expect(newWidths[4]).toBe(initialWidths[4]);
    }

    // resize third column
    {
      const initialWidths = await getColumnWidths(page);

      const delta = +100;
      await resizeColumn({ index: 2, delta, page });

      const newWidths = await getColumnWidths(page);
      expect(newWidths[3]).toBe(initialWidths[3] + delta);

      // other columns should not change
      expect(newWidths[0]).toBe(initialWidths[0]);
      expect(newWidths[1]).toBe(initialWidths[1]);
      expect(newWidths[2]).toBe(initialWidths[2]);
      expect(newWidths[4]).toBe(initialWidths[4]);
    }
  });

  test('should respect min width', async ({ page }) => {
    const minWidth0 = 50;
    const minWidth1 = 300;

    await page.goto(`/Table?minWidth=${minWidth0}&minWidth=${minWidth1}`);

    // resize first column
    {
      await resizeColumn({ index: 0, delta: -100, page, step: true });
      const newWidths = await getColumnWidths(page);
      expect(newWidths[1]).toBe(minWidth0);
    }

    // resize second column
    {
      await resizeColumn({ index: 1, delta: -600, page, step: true });
      const newWidths = await getColumnWidths(page);
      expect(newWidths[2]).toBe(minWidth1);
    }

    // resize third column (has implicit min width)
    {
      await resizeColumn({ index: 2, delta: -800, page, step: true });
      const newWidths = await getColumnWidths(page);
      expect(newWidths[3]).toBe(72); // 72 is the implicit min width
    }
  });

  test('should respect max width', async ({ page }) => {
    const maxWidth0 = 150;
    const maxWidth1 = 300;

    await page.goto(`/Table?maxWidth=${maxWidth0}&maxWidth=${maxWidth1}`);

    // resize first column
    {
      await resizeColumn({ index: 0, delta: +100, page, step: true });
      const newWidths = await getColumnWidths(page);
      expect(newWidths[1]).toBe(maxWidth0);
    }

    // resize second column
    {
      await resizeColumn({ index: 1, delta: +100, page, step: true });
      const newWidths = await getColumnWidths(page);
      expect(newWidths[2]).toBe(maxWidth1);
    }
  });

  test('should respect disableResizing', async ({ page }) => {
    await page.goto('/Table?disableResizing=true');

    // resize second column
    {
      const initialWidths = await getColumnWidths(page);

      const delta = +50;
      await resizeColumn({ index: 1, delta, page });

      const newWidths = await getColumnWidths(page);
      expect(newWidths[2]).toBe(initialWidths[2]);
      expect(newWidths[3]).toBe(initialWidths[3] - delta); // should not change
    }
  });

  // #region Helpers for column resizing tests
  const resizeColumn = async (options: {
    index: number;
    delta: number;
    page: Page;
    step?: boolean;
  }) => {
    const { index, delta, page, step = false } = options;

    const resizer = page.getByRole('separator').nth(index);
    const resizerBox = (await resizer.boundingBox())!;

    await resizer.hover({
      position: { x: resizerBox.width / 2, y: resizerBox.height / 2 },
    });
    await page.mouse.down();
    await page.mouse.move(
      Math.max(1, resizerBox.x + delta + resizerBox.width / 2),
      resizerBox.y + resizerBox.height / 2,
      { steps: step ? Math.abs(delta) : 5 },
    );
    await page.mouse.up();
  };

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
  // #endregion
});

test.describe('Table row selection', () => {
  test('Should select single row', async ({ page }) => {
    await page.goto('/Table');

    const checkboxes = page.locator('input[type="checkbox"]');
    const firstRowCheckbox = checkboxes.nth(1);

    await firstRowCheckbox.click();
    await expect(firstRowCheckbox).toBeChecked();

    await firstRowCheckbox.click();
    await expect(firstRowCheckbox).not.toBeChecked();
  });

  test('Should show indeterminate when sub rows are disabled', async ({
    page,
  }) => {
    await page.goto('/Table');

    const subRowExpander = page.getByLabel('Toggle sub row');
    await subRowExpander.click();

    const checkboxes = page.locator('input[type="checkbox"]');
    const thirdRowCheckbox = checkboxes.nth(3);
    const firstSubRowCheckbox = checkboxes.nth(4);

    await thirdRowCheckbox.click();
    await expect(thirdRowCheckbox).toHaveJSProperty('indeterminate', true);
    await expect(firstSubRowCheckbox).toBeChecked();

    await thirdRowCheckbox.click();
    await expect(thirdRowCheckbox).not.toHaveJSProperty('indeterminate', true);
    await expect(firstSubRowCheckbox).not.toBeChecked();
  });
});

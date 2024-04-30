import { test, expect, type Page } from '@playwright/test';

test.describe('Table sorting', () => {
  test('should work with keyboard', async ({ page }) => {
    await page.goto('/Table');

    const firstColumnCells = page.locator('[role="cell"]:first-child');
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

    // resize first column
    {
      const initialWidths = await getColumnWidths(page);

      const delta = +100;
      await resizeColumn({ index: 0, delta, page });

      const newWidths = await getColumnWidths(page);
      expect(newWidths[0]).toBe(initialWidths[0] + delta);
      expect(newWidths[1]).toBe(initialWidths[1] - delta);
    }

    // resize second column
    {
      const initialWidths = await getColumnWidths(page);

      const delta = +100;
      await resizeColumn({ index: 1, delta, page });

      const newWidths = await getColumnWidths(page);
      expect(newWidths[1]).toBe(initialWidths[1] + delta);
      expect(newWidths[2]).toBe(initialWidths[2] - delta);
    }
  });

  test('should respect columnResizeMode=expand', async ({ page }) => {
    await page.goto('/Table?columnResizeMode=expand');

    // resize first column
    {
      const initialWidths = await getColumnWidths(page);

      const delta = +100;
      await resizeColumn({ index: 0, delta, page });

      const newWidths = await getColumnWidths(page);
      expect(newWidths[0]).toBe(initialWidths[0] + delta);

      // other columns should not change
      expect(newWidths[1]).toBe(initialWidths[1]);
      expect(newWidths[2]).toBe(initialWidths[2]);
      expect(newWidths[3]).toBe(initialWidths[3]);
    }

    // resize second column
    {
      const initialWidths = await getColumnWidths(page);

      const delta = +100;
      await resizeColumn({ index: 1, delta, page });

      const newWidths = await getColumnWidths(page);
      expect(newWidths[1]).toBe(initialWidths[1] + delta);

      // other columns should not change
      expect(newWidths[0]).toBe(initialWidths[0]);
      expect(newWidths[2]).toBe(initialWidths[2]);
      expect(newWidths[3]).toBe(initialWidths[3]);
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
      expect(newWidths[0]).toBe(minWidth0);
    }

    // resize second column
    {
      await resizeColumn({ index: 1, delta: -600, page, step: true });
      const newWidths = await getColumnWidths(page);
      expect(newWidths[1]).toBe(minWidth1);
    }

    // resize third column (has implicit min width)
    {
      await resizeColumn({ index: 2, delta: -800, page, step: true });
      const newWidths = await getColumnWidths(page);
      expect(newWidths[2]).toBe(72); // 72 is the implicit min width
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
      expect(newWidths[0]).toBe(maxWidth0);
    }

    // resize second column
    {
      await resizeColumn({ index: 1, delta: +100, page, step: true });
      const newWidths = await getColumnWidths(page);
      expect(newWidths[1]).toBe(maxWidth1);
    }
  });

  test('should respect disableResizing', async ({ page }) => {
    await page.goto('/Table?disableResizing=true');

    // resize first column
    {
      const initialWidths = await getColumnWidths(page);

      const delta = +50;
      await resizeColumn({ index: 0, delta, page });

      const newWidths = await getColumnWidths(page);
      expect(newWidths[0]).toBe(initialWidths[0] + delta);
      expect(newWidths[1]).toBe(initialWidths[1]); // should not change
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
    await page.goto('/Table?isSelectable=true');

    const checkboxes = page.locator('input[type="checkbox"]');
    const firstRowCheckbox = checkboxes.nth(1);

    await firstRowCheckbox.click();
    await expect(firstRowCheckbox).toBeChecked();

    await firstRowCheckbox.click();
    await expect(firstRowCheckbox).not.toBeChecked();
  });

  test('Should select all sub rows when parent row is selected', async ({
    page,
  }) => {
    await page.goto('/Table?isSelectable=true&subRows=true');

    const subRowExpanders = page.getByLabel('Toggle sub row');
    await subRowExpanders.nth(0).click();

    const checkboxes = page.locator('input[type="checkbox"]');
    const secondRowCheckbox = checkboxes.nth(2);
    const firstSubRowCheckbox = checkboxes.nth(3);
    const secondSubRowCheckbox = checkboxes.nth(4);

    await secondRowCheckbox.click();
    await expect(secondRowCheckbox).toBeChecked();
    await expect(firstSubRowCheckbox).toBeChecked();
    await expect(secondSubRowCheckbox).toBeChecked();

    await secondRowCheckbox.click();
    await expect(secondRowCheckbox).not.toBeChecked();
    await expect(firstSubRowCheckbox).not.toBeChecked();
    await expect(secondSubRowCheckbox).not.toBeChecked();
  });

  test('Should show indeterminate when sub rows are disabled', async ({
    page,
  }) => {
    await page.goto('/Table?isSelectable=true&subRows=true');

    const subRowExpander = page.getByLabel('Toggle sub row');
    await subRowExpander.nth(1).click();

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

  test('Should show indeterminate when some sub rows are filtered out', async ({
    page,
  }) => {
    await page.goto('/Table?isSelectable=true&subRows=true&filter=true');

    await filter(page);

    //Testing without selected filtered sub rows(parent should flip between unchecked and indeterminate)
    {
      const subRowExpander = page.getByLabel('Toggle sub row');
      await subRowExpander.click();

      const checkboxes = page.locator('input[type="checkbox"]');
      const secondRowCheckbox = checkboxes.nth(1);
      const subRowCheckbox = checkboxes.nth(2);

      await secondRowCheckbox.click();
      await expect(secondRowCheckbox).toHaveJSProperty('indeterminate', true);
      await expect(subRowCheckbox).toBeChecked();

      await secondRowCheckbox.click();
      await expect(secondRowCheckbox).not.toHaveJSProperty(
        'indeterminate',
        true,
      );
      await expect(secondRowCheckbox).not.toBeChecked();
      await expect(subRowCheckbox).not.toBeChecked();
    }

    await clearFilter(page);

    const checkboxes = page.locator('input[type="checkbox"]');
    const secondRowCheckbox = checkboxes.nth(2);
    await secondRowCheckbox.click();

    await filter(page);

    //Testing with selected filtered sub rows(parent row should flip between indeterminate and checked)
    {
      const checkboxes = page.locator('input[type="checkbox"]');
      const secondRowCheckbox = checkboxes.nth(1);
      const subRowCheckbox = checkboxes.nth(2);

      await secondRowCheckbox.click();
      await expect(secondRowCheckbox).toHaveJSProperty('indeterminate', true);
      await expect(subRowCheckbox).not.toBeChecked();

      await secondRowCheckbox.click();
      await expect(secondRowCheckbox).not.toHaveJSProperty(
        'indeterminate',
        true,
      );
      await expect(secondRowCheckbox).toBeChecked();
      await expect(subRowCheckbox).toBeChecked();
    }
  });

  test('parent checkbox state should become indeterminate when some filtered sub rows are deselected', async ({
    page,
  }) => {
    await page.goto('/Table?isSelectable=true&subRows=true&filter=true');

    //expand subRows
    const subRowExpanders = page.getByLabel('Toggle sub row');
    await subRowExpanders.nth(0).click();

    //select second row
    {
      const checkboxes = page.locator('input[type="checkbox"]');
      const secondRowCheckbox = checkboxes.nth(2);
      await secondRowCheckbox.click();
    }

    //filter
    await filter(page);

    //unselect sub row
    {
      const checkboxes = page.locator('input[type="checkbox"]');
      const secondRowCheckbox = checkboxes.nth(1);
      const subRow = checkboxes.nth(2);
      await subRow.click();
      await expect(secondRowCheckbox).toHaveJSProperty('indeterminate', true);
      await expect(subRow).not.toBeChecked();
    }

    //clear filter
    await clearFilter(page);

    //evaluate checkbox state
    {
      const checkboxes = page.locator('input[type="checkbox"]');
      const secondRowCheckbox = checkboxes.nth(2);
      const firstSubRowCheckbox = checkboxes.nth(3);
      const secondSubRowCheckbox = checkboxes.nth(4);
      await expect(secondRowCheckbox).toHaveJSProperty('indeterminate', true);
      await expect(firstSubRowCheckbox).not.toBeChecked();
      await expect(secondSubRowCheckbox).toBeChecked();
    }
  });

  const filter = async (page: Page) => {
    const filterButton = page.getByLabel('Filter');
    await filterButton.click();
    const filterInput = page.locator('input[value]');
    await filterInput.fill('Name2.1');
    await page.keyboard.press('Enter');
  };

  const clearFilter = async (page: Page) => {
    const filterButton = page.getByLabel('Filter');
    await filterButton.click();
    const clearButton = page.getByText('Clear');
    await clearButton.click();
  };
});

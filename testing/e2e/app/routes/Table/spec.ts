import { test, expect, type Page } from '@playwright/test';

test.describe('Table sorting', () => {
  test('should work with keyboard', async ({ page }) => {
    await page.goto('/Table');

    const firstColumnCells = page.locator('[role="cell"]:first-child');
    await expect(firstColumnCells).toHaveText(['1', '2', '3']);

    await page.keyboard.press('Tab');

    // ascending
    await page.keyboard.press('Enter');
    await expect(firstColumnCells).toHaveText(['1', '2', '3']);

    // descending
    await page.keyboard.press('Enter');
    await expect(firstColumnCells).toHaveText(['3', '2', '1']);

    // ascending again
    await page.keyboard.press('Enter');
    await expect(firstColumnCells).toHaveText(['1', '2', '3']);
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

    const row1 = page.getByText('1Name1Description1');
    const row1Checkbox = row1.getByRole('checkbox');

    await row1Checkbox.click();
    await expect(row1Checkbox).toBeChecked();

    await row1Checkbox.click();
    await expect(row1Checkbox).not.toBeChecked();
  });

  test('Should select all sub rows when parent row is selected', async ({
    page,
  }) => {
    await page.goto('/Table?isSelectable=true&subRows=true');

    const row2 = page.getByText('2Name2Description2');
    const row2SubRowExpander = row2.getByLabel('Toggle sub row');
    await row2SubRowExpander.click();
    const row21 = page.getByText('2.1Name2.1Description2.1');
    const row22 = page.getByText('2.2Name2.2Description2.2');

    const row2Checkbox = row2.getByRole('checkbox');
    const row21Checkbox = row21.getByRole('checkbox');
    const row22Checkbox = row22.getByRole('checkbox');

    await row2Checkbox.click();
    await expect(row2Checkbox).toBeChecked();
    await expect(row21Checkbox).toBeChecked();
    await expect(row22Checkbox).toBeChecked();

    await row2Checkbox.click();
    await expect(row2Checkbox).not.toBeChecked();
    await expect(row21Checkbox).not.toBeChecked();
    await expect(row22Checkbox).not.toBeChecked();
  });

  test('Should show indeterminate when sub rows are disabled', async ({
    page,
  }) => {
    await page.goto('/Table?isSelectable=true&subRows=true');

    const row3 = page.getByText('3Name3Description3');
    const row3SubRowExpander = row3.getByLabel('Toggle sub row');
    await row3SubRowExpander.click();
    const row31 = page.getByText('3.1Name3.1Description3.1');

    const row3Checkbox = row3.getByRole('checkbox');
    const row31Checkbox = row31.getByRole('checkbox');

    await row3Checkbox.click();
    await expect(row3Checkbox).toHaveJSProperty('indeterminate', true);
    await expect(row31Checkbox).toBeChecked();

    await row3Checkbox.click();
    await expect(row3Checkbox).not.toHaveJSProperty('indeterminate', true);
    await expect(row31Checkbox).not.toBeChecked();
  });

  test('Should show indeterminate when some sub rows are filtered out', async ({
    page,
  }) => {
    await page.goto('/Table?isSelectable=true&subRows=true&filter=true');

    await filter(page);
    const row2 = page.getByText('2Name2Description2');
    const row2SubRowExpander = row2.getByLabel('Toggle sub row');
    await row2SubRowExpander.click();
    const row21 = page.getByText('2.1Name2.1Description2.1');

    //Testing without selected filtered sub rows(parent should flip between unchecked and indeterminate)

    const row2Checkbox = row2.getByRole('checkbox');
    const row21Checkbox = row21.getByRole('checkbox');

    await row2Checkbox.click();
    await expect(row2Checkbox).toHaveJSProperty('indeterminate', true);
    await expect(row21Checkbox).toBeChecked();

    await row2Checkbox.click();
    await expect(row2Checkbox).not.toHaveJSProperty('indeterminate', true);
    await expect(row2Checkbox).not.toBeChecked();
    await expect(row21Checkbox).not.toBeChecked();

    await clearFilter(page);

    await row2Checkbox.click();

    await filter(page);

    //Testing with selected filtered sub rows(parent row should flip between indeterminate and checked)

    await row2Checkbox.click();
    await expect(row2Checkbox).toHaveJSProperty('indeterminate', true);
    await expect(row21Checkbox).not.toBeChecked();

    await row2Checkbox.click();
    await expect(row2Checkbox).not.toHaveJSProperty('indeterminate', true);
    await expect(row2Checkbox).toBeChecked();
    await expect(row21Checkbox).toBeChecked();
  });

  test('parent checkbox state should become indeterminate when some filtered sub rows are deselected', async ({
    page,
  }) => {
    await page.goto('/Table?isSelectable=true&subRows=true&filter=true');

    //expand subRows
    const row2 = page.getByText('2Name2Description2');
    const row2SubRowExpander = row2.getByLabel('Toggle sub row');
    await row2SubRowExpander.click();
    const row21 = page.getByText('2.1Name2.1Description2.1');
    const row22 = page.getByText('2.2Name2.2Description2.2');
    const row2Checkbox = row2.getByRole('checkbox');
    const row21Checkbox = row21.getByRole('checkbox');
    const row22Checkbox = row22.getByRole('checkbox');

    //select second row
    await row2Checkbox.click();

    //filter
    await filter(page);

    //unselect sub row
    await row21Checkbox.click();
    await expect(row2Checkbox).toHaveJSProperty('indeterminate', true);
    await expect(row21Checkbox).not.toBeChecked();

    //clear filter
    await clearFilter(page);

    //evaluate checkbox state
    await expect(row2Checkbox).toHaveJSProperty('indeterminate', true);
    await expect(row21Checkbox).not.toBeChecked();
    await expect(row22Checkbox).toBeChecked();
  });

  test('parent checkbox should have normal checkbox behavior when selectSubRows is false', async ({
    page,
  }) => {
    await page.goto(
      '/Table?isSelectable=true&subRows=true&selectSubRows=false',
    );

    const row2 = page
      .getByRole('row')
      .filter({ has: page.getByRole('cell').getByText('2', { exact: true }) });
    const row2SubRowExpander = row2.getByLabel('Toggle sub row');
    await row2SubRowExpander.click();

    const row21 = page.getByRole('row').filter({
      has: page.getByRole('cell').getByText('2.1', { exact: true }),
    });
    const row2Checkbox = row2.getByRole('checkbox');
    const row21Checkbox = row21.getByRole('checkbox');

    //Check the row
    await row2Checkbox.click();
    await expect(row2Checkbox).toBeChecked();
    await expect(row21Checkbox).not.toBeChecked();

    //Uncheck the row
    await row2Checkbox.click();
    await expect(row2Checkbox).not.toBeChecked();
    await expect(row21Checkbox).not.toBeChecked();
  });

  //#region Helpers for row selection tests
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
  //#endregion
});
test.describe('Virtual Scroll Tests', () => {
  test('should render only a few elements out of a big data set', async ({
    page,
  }) => {
    await page.goto('/Table?virtualization=true', { waitUntil: 'networkidle' }); //Need to wait until the virtual rows are able to be rendered for the tests to work.

    const rows = page.getByRole('rowgroup').getByRole('row');
    expect((await rows.all()).length).toBe(21);
    await expect(rows.nth(0)).toContainText('Name0');
    await expect(rows.nth(20)).toContainText('Name20');

    //scroll a little
    await page.mouse.move(100, 300);
    await page.mouse.wheel(0, 620);
    await expect(rows.nth(0)).toContainText('Name0');
    await expect(rows.nth(30)).toContainText('Name30');
    expect((await rows.all()).length).toBe(31);

    //scroll back up
    await page.mouse.wheel(0, -620);
    await expect(rows.nth(0)).toContainText('Name0');
    await expect(rows.nth(20)).toContainText('Name20');
    expect((await rows.all()).length).toBe(21);

    //scroll to end
    await page.mouse.wheel(0, 6200000);
    await expect(rows.nth(0)).toContainText('Name99980');
    await expect(rows.nth(19)).toContainText('Name99999');
    expect((await rows.all()).length).toBe(20);
  });

  test('should not crash with empty data objects', async ({ page }) => {
    await page.goto('/Table?virtualization=true&empty=true', {
      waitUntil: 'networkidle',
    }); //Need to wait until the virtual rows are able to be rendered for the tests to work.

    const rows = page.getByRole('rowgroup').getByRole('row');
    expect((await rows.all()).length).toBe(0);
  });

  test('virtualized table should scroll to provided row', async ({ page }) => {
    await page.goto('/Table?virtualization=true&scroll=true', {
      waitUntil: 'networkidle',
    }); //Need to wait until the virtual rows are able to be rendered for the tests to work.

    const rows = page.getByRole('rowgroup').getByRole('row');
    expect((await rows.all()).length).toBe(31);
    await expect(rows.nth(0)).toContainText('Name30');
    await expect(rows.nth(30)).toContainText('Name60');
  });
});

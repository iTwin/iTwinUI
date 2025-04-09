import { test, expect, type Page } from '@playwright/test';

test('un-virtualized table should scroll to provided row', async ({ page }) => {
  await page.goto('/Table?rows=large&scroll=true&scrollRow=50');

  await expect(page.getByText('Name47')).not.toBeInViewport();
  await expect(page.getByText('Name48')).toBeInViewport();
  await expect(page.getByText('Name49')).toBeInViewport();
  await expect(page.getByText('Name50')).toBeInViewport();
  await expect(page.getByText('Name51')).toBeInViewport();
});

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

  test('should resize correctly when column width is set lower than default min width', async ({
    page,
  }) => {
    await page.goto('/Table?rows=subRows');

    // resize first column
    {
      const initialWidths = await getColumnWidths(page);

      const delta = +50;
      await resizeColumn({ index: 0, delta, page });

      const newWidths = await getColumnWidths(page);
      expect(newWidths[0]).toBe(initialWidths[0] + delta);
      expect(newWidths[1]).toBe(initialWidths[1] - delta);
      expect(newWidths[2]).toBe(initialWidths[2]); // should not change
      expect(newWidths[3]).toBe(initialWidths[3]); // should not change
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
    await page.goto('/Table?isSelectable=true&rows=subRows');

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
    await page.goto('/Table?isSelectable=true&rows=subRows');

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
    await page.goto('/Table?isSelectable=true&rows=subRows&filter=true');

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
    await page.goto('/Table?isSelectable=true&rows=subRows&filter=true');

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
      '/Table?isSelectable=true&rows=subRows&selectSubRows=false',
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

  test('action object for row selection in state reducer should have a defined value when selectSubRows is set to false', async ({
    page,
  }) => {
    await page.goto(
      '/Table?isSelectable=true&rows=subRows&selectSubRows=false&stateReducer=true',
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

    //Works correctly for sub row
    const firstSubRowMessage = page.waitForEvent('console');
    await row21Checkbox.click();
    expect((await firstSubRowMessage).text()).toBe('true');
    const secondSubRowMessage = page.waitForEvent('console');
    await row21Checkbox.click();
    expect((await secondSubRowMessage).text()).toBe('false');

    //Works correctly for parent row
    const firstParentRowMessage = page.waitForEvent('console');
    await row2Checkbox.click();
    expect((await firstParentRowMessage).text()).toBe('true');
    const secondParentRowMessage = page.waitForEvent('console');
    await row2Checkbox.click();
    expect((await secondParentRowMessage).text()).toBe('false');
  });

  test('should not call onSelect when clicking on text', async ({ page }) => {
    await page.goto('/Table?isSelectable=true&onSelect=true');

    const row1 = page.getByText('1Name1Description1');
    const row1Cell = row1.getByText('Name1');

    let consoleText = '';
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        consoleText = msg.text();
      }
    });

    const row1CellBox = (await row1Cell.boundingBox())!;
    // Approximate the positionn of the text
    await page.mouse.click(
      row1CellBox.x + 24, // A few pixels from the left edge
      row1CellBox.y + row1CellBox.height / 2, // Vertically middle of the cell
    );
    expect(consoleText).not.toContain('onSelect');

    await row1.click();
    expect(consoleText).toContain('onSelect');
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

test.describe('Table Paginator', () => {
  test(`should render data in pages`, async ({ page }) => {
    await page.goto(`/Table?exampleType=withTablePaginator`);

    const paginatorButtons = page.locator('#paginator button', {
      hasText: /[0-9]+/,
    });

    await expect(page.locator(`[role="cell"]`).first()).toHaveText('Name 0');
    await expect(page.locator(`[role="cell"]`).last()).toHaveText(
      'Description 49',
    );

    // Go to the 6th page
    await paginatorButtons.nth(5).click();

    await expect(page.locator(`[role="cell"]`).first()).toHaveText('Name 250');
    await expect(page.locator(`[role="cell"]`).last()).toHaveText(
      'Description 299',
    );
  });

  test('should render truncated pages list', async ({ page }) => {
    await page.goto(`/Table?exampleType=withTablePaginator`);

    const paginatorButtons = page.locator('#paginator button', {
      hasText: /[0-9]+/,
    });

    await setContainerSize(page, '800px');

    // Go to the 5th page
    await paginatorButtons.nth(4).click();

    await expect(paginatorButtons).toHaveText([
      '1',
      '3',
      '4',
      '5',
      '6',
      '7',
      '11',
    ]);
    await expect(paginatorButtons.nth(3)).toHaveAttribute(
      'data-iui-active',
      'true',
    );

    await expect(page.getByText('…')).toHaveCount(2);
  });

  test(`should overflow whenever there is not enough space`, async ({
    page,
  }) => {
    await page.goto(`/Table?exampleType=withTablePaginator`);

    await expectOverflowState({
      page,
      expectedItemLength: 11,
      expectedOverflowingEllipsisVisibleCount: 0,
    });

    await setContainerSize(page, '750px');

    await expectOverflowState({
      page,
      expectedItemLength: 6,
      expectedOverflowingEllipsisVisibleCount: 1,
    });

    // should restore hidden items when space is available again
    await setContainerSize(page, undefined);

    await expectOverflowState({
      page,
      expectedItemLength: 11,
      expectedOverflowingEllipsisVisibleCount: 0,
    });
  });

  test(`should show ellipses only when a gap of one or more pages`, async ({
    page,
  }) => {
    await page.goto(`/Table?exampleType=withTablePaginator`);

    await expectOverflowState({
      page,
      expectedItemLength: 11,
      expectedOverflowingEllipsisVisibleCount: 0,
    });

    await setContainerSize(page, '800px');

    const paginatorButtons = page.locator('#paginator button', {
      hasText: /[0-9]+/,
    });
    const ellipses = page.locator('#paginator span', {
      hasText: /^…$/,
    });

    await expect(paginatorButtons).toHaveText(['1', '2', '3', '4', '5', '11']);
    await expect(ellipses).toHaveCount(1);

    await paginatorButtons.locator('*', { hasText: '4' }).click();
    await expect(paginatorButtons).toHaveText([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '11',
    ]);
    await expect(ellipses).toHaveCount(1);

    await paginatorButtons.locator('*', { hasText: '5' }).click();
    await expect(paginatorButtons).toHaveText([
      '1',
      '3',
      '4',
      '5',
      '6',
      '7',
      '11',
    ]);
    await expect(ellipses).toHaveCount(2);

    await paginatorButtons.locator('*', { hasText: '11' }).click();
    await expect(paginatorButtons).toHaveText(['1', '7', '8', '9', '10', '11']);
    await expect(ellipses).toHaveCount(1);

    await paginatorButtons.locator('*', { hasText: '8' }).click();
    await expect(paginatorButtons).toHaveText([
      '1',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
    ]);
    await expect(ellipses).toHaveCount(1);

    await paginatorButtons.locator('*', { hasText: '7' }).click();
    await expect(paginatorButtons).toHaveText([
      '1',
      '5',
      '6',
      '7',
      '8',
      '9',
      '11',
    ]);
    await expect(ellipses).toHaveCount(2);
  });

  test(`should at minimum always show one page`, async ({ page }) => {
    await page.goto(`/Table?exampleType=withTablePaginator`);

    await expectOverflowState({
      page,
      expectedItemLength: 11,
      expectedOverflowingEllipsisVisibleCount: 0,
    });

    await setContainerSize(page, '100px');

    await expectOverflowState({
      page,
      expectedItemLength: 1,
      expectedOverflowingEllipsisVisibleCount: 0,
    });

    await expect(
      page.locator('#paginator button', { hasText: /1/ }),
    ).toHaveAttribute('data-iui-active', 'true');
  });

  test(`should render elements in small size`, async ({ page }) => {
    await page.goto(`/Table?exampleType=withTablePaginator&density=condensed`);

    await setContainerSize(page, '500px');

    (await page.locator('#paginator button').all()).forEach(async (button) => {
      await expect(button).toHaveAttribute('data-iui-size', 'small');
    });

    await expect(page.getByText('…')).toHaveClass(
      /_iui[0-9]+-table-paginator-ellipsis-small/,
    );

    await page.waitForTimeout(300);
  });

  test('should handle focus of page buttons when focusActivationMode is manual', async ({
    page,
  }) => {
    await page.goto(
      '/Table?exampleType=withTablePaginator&focusActivationMode=manual',
    );

    const paginatorButtons = page.locator('#paginator button', {
      hasText: /[0-9]+/,
    });

    await paginatorButtons.nth(8).click();
    await expect(paginatorButtons.nth(8)).toBeFocused();

    // Confirm that arrow keys move focus from _previously focused page_.
    await page.keyboard.press('ArrowRight');
    await expect(paginatorButtons.nth(9)).toBeFocused();
    await expect(paginatorButtons.nth(1)).not.toBeFocused();

    // Clicking current page itself focuses that page button.
    await paginatorButtons.nth(8).click();
    await expect(paginatorButtons.nth(8)).toBeFocused();

    // Confirm that arrow keys move focus from _previously focused page_.
    await page.keyboard.press('ArrowRight');
    await expect(paginatorButtons.nth(9)).toBeFocused();
    await expect(paginatorButtons.nth(10)).not.toBeFocused();

    // Clicking non-current page focuses that page button.
    await paginatorButtons.nth(4).click();
    await expect(paginatorButtons.nth(4)).toBeFocused();

    // Confirm that arrow keys move focus from _previously focused page_.
    await page.keyboard.press('ArrowLeft');
    await expect(paginatorButtons.nth(3)).toBeFocused();
    await expect(paginatorButtons.nth(8)).not.toBeFocused();
  });

  //#region Helpers for table paginator tests
  const setContainerSize = async (page: Page, value: string | undefined) => {
    await page.locator('#container').evaluate(
      (element, args) => {
        if (args.value != null) {
          element.style.setProperty('width', args.value ? args.value : `999px`);
        } else {
          element.style.removeProperty('width');
        }
      },
      {
        value,
      },
    );
    await page.waitForTimeout(200);
  };

  const expectOverflowState = async ({
    page,
    expectedItemLength,
    expectedOverflowingEllipsisVisibleCount,
  }: {
    page: Page;
    expectedItemLength: number;
    expectedOverflowingEllipsisVisibleCount: number;
  }) => {
    const allItems = await page.locator('#paginator button').all();
    const items =
      allItems.length >= 2
        ? allItems.slice(1, allItems.length - 1) // since the first and last button and to toggle pages
        : [];
    expect(items).toHaveLength(expectedItemLength);

    const overflowingEllipsis = page.getByText('…');
    await expect(overflowingEllipsis).toHaveCount(
      expectedOverflowingEllipsisVisibleCount,
    );
  };
  //#endregion
});

test.describe('Virtual Scroll Tests', () => {
  test('should render only a few elements out of a big data set', async ({
    page,
  }) => {
    await page.goto('/Table?virtualization=true', { waitUntil: 'networkidle' }); //Need to wait until the virtual rows are able to be rendered for the tests to work.

    const rows = page.getByRole('rowgroup').getByRole('row');
    expect((await rows.all()).length).toBe(12);
    await expect(rows.nth(0)).toContainText('Name0');
    await expect(rows.nth(11)).toContainText('Name11');

    //scroll a little
    await page.mouse.move(100, 300);
    await page.mouse.wheel(0, 620);
    await expect(rows.nth(0)).toContainText('Name9');
    await expect(rows.nth(12)).toContainText('Name21');
    expect((await rows.all()).length).toBe(13);

    //scroll back up
    await page.mouse.wheel(0, -620);
    await expect(rows.nth(0)).toContainText('Name0');
    await expect(rows.nth(11)).toContainText('Name11');
    expect((await rows.all()).length).toBe(12);

    //scroll to end
    await page.mouse.wheel(0, 6200000);
    await expect(rows.nth(0)).toContainText('Name99989');
    await expect(rows.nth(10)).toContainText('Name99999');
    expect((await rows.all()).length).toBe(11);
  });

  test('should not crash with empty data objects', async ({ page }) => {
    await page.goto('/Table?virtualization=true&empty=true', {
      waitUntil: 'networkidle',
    }); //Need to wait until the virtual rows are able to be rendered for the tests to work.

    const rows = page.getByRole('rowgroup').getByRole('row');
    const emptyContent = page.getByRole('rowgroup').getByText('No Data.');
    expect((await rows.all()).length).toBe(0);

    //Checks empty content to make sure it appears correctly.
    await expect(emptyContent).toBeInViewport();
  });

  test('virtualized table should scroll to provided row', async ({ page }) => {
    await page.goto('/Table?virtualization=true&scroll=true&scrollRow=50', {
      waitUntil: 'networkidle',
    }); //Need to wait until the virtual rows are able to be rendered for the tests to work.

    const rows = page.getByRole('rowgroup').getByRole('row');
    const row50NameCell = page.getByText('Name50');
    expect((await rows.all()).length).toBe(13);
    await expect(rows.nth(0)).toContainText('Name49');
    await expect(rows.nth(1)).toContainText('Name50');
    await expect(rows.nth(12)).toContainText('Name61');

    await expect(row50NameCell).toBeInViewport();
  });

  test('virtualized table should render 1 item', async ({ page }) => {
    await page.goto('/Table?virtualization=true&oneRow=true', {
      waitUntil: 'networkidle',
    }); //Need to wait until the virtual rows are able to be rendered for the tests to work.
    const rows = page.getByRole('rowgroup').getByRole('row');
    expect((await rows.all()).length).toBe(1);
  });

  test('virtualized table should allow expandable contents', async ({
    page,
  }) => {
    await page.goto(
      '/Table?virtualization=true&scroll=true&scrollRow=50&hasSubComponent=true',
      {
        waitUntil: 'networkidle',
      },
    ); //Need to wait until the virtual rows are able to be rendered for the tests to work.

    const rows = page.getByRole('rowgroup').getByRole('row');
    await expect(rows.nth(1)).toContainText('Name50');
    await expect(rows.nth(4)).toContainText('Name53');

    const row50ExpanderContent = page.getByText(
      'Expanded component, name: Name50',
    );
    const row53ExpanderContent = page.getByText(
      'Expanded component, name: Name53',
    );

    const expanderButtonRow50Cell = rows
      .nth(1)
      .getByRole('cell')
      .nth(0)
      .getByRole('button');
    const expanderButtonRow53Cell = rows
      .nth(4)
      .getByRole('cell')
      .nth(0)
      .getByRole('button');

    await expanderButtonRow50Cell.click();
    await expanderButtonRow53Cell.click();
    await expect(row50ExpanderContent).toBeInViewport();
    await expect(row53ExpanderContent).toBeInViewport();

    // Collapse the expanded content
    await expanderButtonRow50Cell.click();
    await expect(row50ExpanderContent).not.toBeInViewport();
    await expanderButtonRow53Cell.click();
    await expect(row53ExpanderContent).not.toBeInViewport();
  });
});

test.describe('Table filters', () => {
  test('DateRangeFilter should show DatePicker', async ({ page }) => {
    await page.goto('/Table?exampleType=allFilters');

    // open Date filter
    const dateHeader = page.locator('[role="columnheader"]', {
      hasText: 'Date',
    });
    const dateFilterButton = dateHeader.getByRole('button', { name: 'Filter' });
    await dateFilterButton.click();
    const dateFilterPopover = page.getByRole('dialog', { name: 'Filter' });
    await expect(dateFilterPopover).toBeVisible();

    // open Date picker in Date filter
    const datePickerButton = dateFilterPopover
      .getByRole('button', { name: 'Date picker' })
      .first();
    await datePickerButton.click();
    const datePicker = page.getByRole('dialog', { name: 'Date picker' });
    await expect(datePicker).toBeVisible();

    // close DatePicker
    await page.keyboard.press('Escape');
    await expect(datePicker).not.toBeVisible();
    await expect(dateFilterPopover).toBeVisible();

    // close Date filter
    await page.keyboard.press('Escape');
    await expect(dateFilterPopover).not.toBeVisible();
  });
});

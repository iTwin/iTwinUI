import { test, expect, Page } from '@playwright/test';

test.describe('DropdownMenu', () => {
  test('should support deep level submenus', async ({ page }) => {
    await page.goto('/DropdownMenu');

    const trigger = page.getByTestId('trigger');
    await trigger.click();

    await expect(page.getByTestId('Item 1_1')).toBeFocused();

    // Go to the deepest level using keyboard
    await page.keyboard.press('ArrowRight', keyboardPressOptions);
    await expect(page.getByTestId('Item 2_1')).toBeFocused();

    await page.keyboard.press('ArrowDown', keyboardPressOptions);
    await expect(page.getByTestId('Item 2_2')).toBeFocused();

    await page.keyboard.press('ArrowDown', keyboardPressOptions);
    await expect(page.getByTestId('Item 2_3')).toBeFocused();

    await page.keyboard.press('ArrowRight', keyboardPressOptions);
    await expect(page.getByTestId('Item 3_1')).toBeFocused();

    await page.keyboard.press('ArrowDown', keyboardPressOptions);
    await expect(page.getByTestId('Item 3_2')).toBeFocused();

    await page.keyboard.press('ArrowDown', keyboardPressOptions);
    await expect(page.getByTestId('Item 3_3')).toBeFocused();

    await page.keyboard.press('ArrowRight', keyboardPressOptions);
    await expect(page.getByTestId('Item 3_3_1')).toBeFocused();

    // Hovering out of a submenu should not close the entire menu tree
    await moveMouseWithRespectToComponent({
      side: 'right',
      direction: 'out',
      componentTestId: 'Item 3_3_1',
      page,
    });

    // If the last menu item of the tree is visible, the whole tree is visible.
    // So just checking for the last item is enough.
    await expect(page.getByTestId('Item 3_3_1')).toBeFocused();

    // Hovering an ancestor "X" that has a submenu "Y" should close all submenus of "Y"
    await moveMouseWithRespectToComponent({
      side: 'left',
      direction: 'in',
      componentTestId: 'Item 1_1',
      page,
    });

    await expect(page.getByTestId('Item 2_1')).toBeVisible();
    await expect(page.getByTestId('Item 2_2')).toBeVisible();
    await expect(page.getByTestId('Item 2_3')).toBeVisible();
    await expect(page.getByTestId('Item 3_1')).toBeHidden();
    await expect(page.getByTestId('Item 3_2')).toBeHidden();
    await expect(page.getByTestId('Item 3_3')).toBeHidden();

    // Go to the deepest level using mouse.
    // Hovering an element should focus it.
    await moveMouseWithRespectToComponent({
      side: 'left',
      direction: 'in',
      componentTestId: 'Item 2_3',
      page,
    });
    await expect(page.getByTestId('Item 2_3')).toBeFocused();

    await moveMouseWithRespectToComponent({
      side: 'left',
      direction: 'in',
      componentTestId: 'Item 3_3',
      page,
    });
    await expect(page.getByTestId('Item 3_3')).toBeFocused();

    await moveMouseWithRespectToComponent({
      side: 'left',
      direction: 'in',
      componentTestId: 'Item 3_3_1',
      page,
    });
    await expect(page.getByTestId('Item 3_3_1')).toBeFocused();

    // When a node "X" is focused, should close "X"'s siblings' submenus
    // i.e. only one submenu in each menu should be open at a time
    await moveMouseWithRespectToComponent({
      side: 'right',
      direction: 'out',
      componentTestId: 'Item 3_3_1',
      page,
    });
    await moveMouseWithRespectToComponent({
      side: 'right',
      direction: 'in',
      componentTestId: 'Item 3_2',
      page,
    });

    await expect(page.getByTestId('Item 3_2_1')).toBeVisible();
    await expect(page.getByTestId('Item 3_3_1')).toBeHidden();

    await page.waitForTimeout(100);
  });

  test('should respect click and keyboard enter/space triggers', async ({
    page,
  }) => {
    await page.goto('/DropdownMenu');

    const trigger = page.getByTestId('trigger');
    await trigger.click();

    await expect(page.getByTestId('Item 1_1')).toBeFocused();

    await page.getByTestId('Item 1_1').click();
    await expect(page.getByTestId('Item 1_1')).toBeFocused();
    await expect(page.getByTestId('Item 2_1')).toBeVisible();

    await page.getByTestId('Item 1_1').click();
    await expect(page.getByTestId('Item 1_1')).toBeFocused();
    await expect(page.getByTestId('Item 2_1')).toBeHidden();

    await page.keyboard.press('Enter', keyboardPressOptions);
    await expect(page.getByTestId('Item 2_1')).toBeFocused();

    await page.keyboard.press('ArrowLeft', keyboardPressOptions);
    await expect(page.getByTestId('Item 1_1')).toBeFocused();

    await page.keyboard.press('Space', keyboardPressOptions);
    await expect(page.getByTestId('Item 2_1')).toBeFocused();

    await page.keyboard.press('ArrowLeft', keyboardPressOptions);
    await expect(page.getByTestId('Item 1_1')).toBeFocused();
  });

  test('should close entire menu on pressing escape or tab key', async ({
    page,
  }) => {
    const goToTheDeepestLevel = async () => {
      await page.keyboard.press('ArrowRight', keyboardPressOptions);
      await page.keyboard.press('ArrowDown', keyboardPressOptions);
      await page.keyboard.press('ArrowDown', keyboardPressOptions);
      await page.keyboard.press('ArrowRight', keyboardPressOptions);
      await page.keyboard.press('ArrowDown', keyboardPressOptions);
      await page.keyboard.press('ArrowDown', keyboardPressOptions);
      await page.keyboard.press('ArrowRight', keyboardPressOptions);
    };

    await page.goto('/DropdownMenu');

    const trigger = page.getByTestId('trigger');
    await trigger.click();

    await expect(page.getByTestId('Item 1_1')).toBeFocused();
    await goToTheDeepestLevel();
    await expect(page.getByTestId('Item 3_3_1')).toBeFocused();

    await page.keyboard.press('Escape', keyboardPressOptions);
    await expect(page.locator('.iui-menu')).not.toBeVisible();

    await trigger.click();

    await expect(page.getByTestId('Item 1_1')).toBeFocused();
    await goToTheDeepestLevel();
    await expect(page.getByTestId('Item 3_3_1')).toBeFocused();

    await page.keyboard.press('Tab', keyboardPressOptions);
    await expect(page.locator('.iui-menu')).not.toBeVisible();
  });

  test('should focus target after hide', async ({ page }) => {
    await page.goto('/DropdownMenu');

    const trigger = page.getByTestId('trigger');

    await page.keyboard.press('Tab', keyboardPressOptions);
    await expect(trigger).toBeFocused();

    await trigger.click();
    await expect(trigger).not.toBeFocused();

    await trigger.click();
    await expect(trigger).toBeFocused();
  });
});

// ----------------------------------------------------------------------------

// Needed to solve flakiness in the test
const keyboardPressOptions = {
  delay: 30,
};

/**
 * Sometimes `component.hover()` doesn't work as expected.
 * This function instead uses `mouse.move()` to move the mouse along the `direction` on the specified `side`.
 *
 * @example
 * <caption>Mouse moves in small increments starting slightly from the left of the left edge and ending slightly to the right of the left edge. </caption>
 * moveMouseWithRespectToComponent({
 *   side: 'left',
 *   direction: 'in',
 *   componentTestId: 'my-test-id',
 *   page,
 * })
 */
const moveMouseWithRespectToComponent = async ({
  side,
  direction,
  componentTestId,
  page,
}: {
  side: 'left' | 'top' | 'right' | 'bottom';
  direction: 'in' | 'out';
  componentTestId: string;
  page: Page;
}) => {
  const component = page.getByTestId(componentTestId);
  const boundingBox = await component.boundingBox({
    timeout: 200,
  });

  if (boundingBox == null) {
    throw new Error(`Component with test id ${componentTestId} not found.`);
  }

  const edges = {
    left: {
      x: boundingBox.x,
      y: boundingBox.y + boundingBox.height / 2,
    },
    top: {
      x: boundingBox.x + boundingBox.width / 2,
      y: boundingBox.y,
    },
    right: {
      x: boundingBox.x + boundingBox.width,
      y: boundingBox.y + boundingBox.height / 2,
    },
    bottom: {
      x: boundingBox.x + boundingBox.width / 2,
      y: boundingBox.y + boundingBox.height,
    },
  };

  const stepsCount = 10;
  const stepSize = 1;

  // E.g. if stepsCount = 10, stepSize = 1, then steps = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4]
  const steps = Array.from(
    { length: stepsCount },
    (_, i) => (stepsCount / 2) * stepSize - i,
  );

  const directionalMultiplier = (() => {
    if (direction === 'in') {
      if (side === 'left' || side === 'top') {
        return -1;
      }
      return 1;
    }

    if (side === 'left' || side === 'top') {
      return 1;
    }
    return -1;
  })();

  steps.forEach(async (i) => {
    await page.mouse.move(
      side === 'left' || side === 'right'
        ? edges[side].x + i * stepSize * directionalMultiplier
        : edges[side].x,
      side === 'top' || side === 'bottom'
        ? edges[side].y + i * stepSize * directionalMultiplier
        : edges[side].y,
    );
  });
};

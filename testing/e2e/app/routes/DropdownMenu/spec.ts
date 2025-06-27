import { test, expect, Page } from '@playwright/test';

test.describe('DropdownMenu', () => {
  test('should render menu items', async ({ page }) => {
    await page.goto('/DropdownMenu?menuType=withSubmenu');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await expect(page.locator('.DropdownMenu')).toBeVisible();
    await expect(page.getByTestId(`Item 1_1`)).toBeVisible();
    await expect(page.getByTestId(`Item 1_2`)).toBeVisible();
    await expect(page.getByTestId(`Item 1_3`)).toBeVisible();

    await page.waitForTimeout(50);
  });

  test('should support deep level submenus', async ({ page }) => {
    await page.goto('/DropdownMenu?menuType=withSubmenu');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('Item 1_1')).toBeFocused();

    // Go to the deepest level using keyboard
    await page.keyboard.press('ArrowRight');
    await expect(page.getByTestId('Item 2_1')).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(page.getByTestId('Item 2_2')).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(page.getByTestId('Item 2_3')).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(page.getByTestId('Item 3_1')).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(page.getByTestId('Item 3_2')).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(page.getByTestId('Item 3_3')).toBeFocused();

    await page.keyboard.press('ArrowRight');
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

  test('should handle keyboard navigation even with non MenuItems', async ({
    page,
  }) => {
    await page.goto('/DropdownMenu?menuType=withExtraContent');

    const menu = page.locator('.DropdownMenu');
    await expect(menu).not.toBeVisible();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await expect(menu).toBeVisible();
    await expect(page.getByTestId('FocusTarget-0')).toBeFocused();

    // Should not loop around when navigating past the first or the last item.
    await page.keyboard.press('ArrowUp');
    await expect(page.getByTestId('FocusTarget-0')).toBeFocused();

    // Should skip all checkboxes, disabled items, and separators.
    await page.keyboard.press('ArrowDown');
    await expect(page.getByTestId('FocusTarget-1')).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(page.getByTestId('FocusTarget-2')).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(page.getByTestId('FocusTarget-3')).toBeFocused();

    // Should not loop around when navigating past the first or the last item.
    await page.keyboard.press('ArrowDown');
    await expect(page.getByTestId('FocusTarget-3')).toBeFocused();

    // ArrowUp should also work similar to ArrowDown
    await page.keyboard.press('ArrowUp');
    await expect(page.getByTestId('FocusTarget-2')).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expect(page.getByTestId('FocusTarget-1')).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expect(page.getByTestId('FocusTarget-0')).toBeFocused();

    await page.waitForTimeout(50);
  });

  test('should respect the click trigger', async ({ page }) => {
    await page.goto('/DropdownMenu?menuType=withSubmenu');

    // open the whole menu
    const trigger = page.getByTestId('trigger');
    await trigger.click();

    await expect(page.getByTestId('Item 1_1')).toBeVisible();

    // open the sub-menu
    await page.getByTestId('Item 1_1').click();
    await expect(page.getByTestId('Item 1_1')).toBeFocused();
    await expect(page.getByTestId('Item 2_1')).toBeVisible();

    // toggle off and on
    await page.getByTestId('Item 1_1').click();
    await expect(page.getByTestId('Item 1_1')).toBeFocused();
    await expect(page.getByTestId('Item 2_1')).toBeHidden();
    await page.getByTestId('Item 1_1').click();
    await expect(page.getByTestId('Item 1_1')).toBeFocused();
    await expect(page.getByTestId('Item 2_1')).toBeVisible();

    // click outside to close
    await page.locator('body').click();
    await expect(page.getByTestId('Item 1_1')).toBeHidden();

    // click again to open whole menu
    await trigger.click();

    await expect(page.getByTestId('Item 1_1')).toBeVisible();
  });

  test('should respect the keyboard enter/space triggers', async ({ page }) => {
    await page.goto('/DropdownMenu?menuType=withSubmenu');

    // open the whole menu (using Enter)
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('Item 1_1')).toBeFocused();
    await expect(page.getByTestId('Item 2_1')).not.toBeVisible();

    // open the sub-menu (using Enter)
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('Item 2_1')).toBeFocused();

    // close and start over
    await page.keyboard.press('Escape');
    await expect(page.getByTestId('Item 1_1')).not.toBeVisible();

    // open the whole menu (using Space)
    await page.keyboard.press('Space', { delay: 30 });
    await expect(page.getByTestId('Item 1_1')).toBeFocused();
    await expect(page.getByTestId('Item 2_1')).not.toBeVisible();

    // open the sub-menu (using Space)
    await page.keyboard.press('Space');
    await expect(page.getByTestId('Item 2_1')).toBeFocused();
    await expect(page.getByTestId('Item 2_1')).toBeVisible();
  });

  test('should close entire menu on pressing escape or tab key and move focus back to the trigger', async ({
    page,
  }) => {
    const goToTheDeepestLevel = async () => {
      await page.keyboard.press('ArrowRight', { delay: 30 });
      await page.keyboard.press('ArrowDown', { delay: 30 });
      await page.keyboard.press('ArrowDown', { delay: 30 });
      await page.keyboard.press('ArrowRight', { delay: 30 });
      await page.keyboard.press('ArrowDown', { delay: 30 });
      await page.keyboard.press('ArrowDown', { delay: 30 });
      await page.keyboard.press('ArrowRight', { delay: 30 });
    };

    await page.goto('/DropdownMenu?menuType=withSubmenu');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('Item 1_1')).toBeFocused();
    await goToTheDeepestLevel();
    await expect(page.getByTestId('Item 3_3_1')).toBeFocused();

    await page.keyboard.press('Escape');

    const trigger = page.getByTestId('trigger');
    await expect(trigger).toBeFocused();
    await expect(page.locator('.DropdownMenu')).not.toBeVisible();

    await page.keyboard.press('Enter');

    await expect(page.getByTestId('Item 1_1')).toBeFocused();
    await goToTheDeepestLevel();
    await expect(page.getByTestId('Item 3_3_1')).toBeFocused();

    await page.keyboard.press('Tab');

    await expect(trigger).toBeFocused();
    await expect(page.locator('.DropdownMenu')).not.toBeVisible();
  });

  test('should move focus appropriately upon DropdownMenu open and close', async ({
    page,
  }) => {
    await page.goto('/DropdownMenu?menuType=withExtraContent');

    const menu = page.locator('.DropdownMenu');
    await expect(menu).not.toBeVisible();

    // Click the trigger
    const trigger = page.getByTestId('trigger');
    await trigger.click();
    await expect(menu).toBeVisible();

    // Opening the menu with a mouse click should keep the focus on the trigger itself.
    await expect(trigger).toBeFocused();

    // Close the menu by clicking trigger
    await trigger.click();
    await expect(menu).not.toBeVisible();
    await expect(trigger).toBeFocused();

    // Focus the trigger and press Enter
    await page.keyboard.press('Enter');
    await expect(menu).toBeVisible();

    // Opening the menu with a keyboard press should focus the first focusable item.
    await expect(page.getByTestId('FocusTarget-0')).toBeFocused();

    // Close the menu with Tab
  });

  test('should hide menu when trigger hidden', async ({ page }) => {
    await page.goto('/DropdownMenu?menuType=withHideMiddleware');

    await page.locator('button').first().click();
    await page.locator('button').nth(10).scrollIntoViewIfNeeded();

    await expect(page.getByRole('menu').first()).not.toBeVisible();
  });

  test('should allow opting out of hide middleware', async ({ page }) => {
    await page.goto(
      '/DropdownMenu?menuType=withHideMiddleware&hideMiddleware=false',
    );

    await page.locator('button').first().click();
    await page.locator('button').nth(10).scrollIntoViewIfNeeded();

    await expect(page.getByRole('menu')).toHaveCount(1);
  });

  test('should support closeOnItemClick prop', async ({ page }) => {
    await page.goto('/DropdownMenu?closeOnItemClick=true');

    const trigger = page.getByRole('button', { name: 'More' });
    const menu = page.getByRole('menu');

    // open
    await trigger.click();
    await expect(menu).toBeVisible();

    // click on item => close
    await page.getByRole('menuitem', { name: 'Item #1' }).click();
    await expect(menu).not.toBeVisible();

    // click on disabled item => do not close
    await trigger.click();
    await expect(menu).toBeVisible();
    await page
      .getByRole('menuitem', { name: 'Item #3' })
      .click({ force: true });
    await expect(menu).toBeVisible();
  });

  test('should call onVisibleChange only when the visibility changes', async ({
    page,
  }) => {
    await page.goto('/DropdownMenu?menuType=multipleCloseCalls');

    const trigger = page.getByTestId('trigger');
    const onVisibleChangeCounter = page.getByTestId('calls-count');

    // open
    await expect(onVisibleChangeCounter).toHaveText('0');
    await trigger.click();
    await expect(onVisibleChangeCounter).toHaveText('1');

    // click first item
    await page.getByRole('menuitem', { name: 'Item #1' }).click();
    await expect(onVisibleChangeCounter).toHaveText('2');
  });

  test('should support positionReference prop for context menus', async ({
    page,
  }) => {
    await page.goto('/DropdownMenu?menuType=contextMenu');

    const container = page.getByTestId('context-menu-container');
    const menu = page.getByRole('menu');

    // open with right click
    await container.click({ button: 'right' });
    await expect(menu).toBeVisible();

    // menu should be near the center of the container
    const containerBox = await container.boundingBox();
    const menuBox = await menu.boundingBox();
    if (containerBox && menuBox) {
      expect(menuBox.x).toBeCloseTo(containerBox.x + containerBox.width / 2);
      expect(menuBox.y).toBeCloseTo(containerBox.y + containerBox.height / 2);
    }

    // close
    await page.locator('body').click();
    await expect(menu).not.toBeVisible();
  });
});

// ----------------------------------------------------------------------------

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

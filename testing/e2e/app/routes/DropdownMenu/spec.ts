import { test, expect, Page } from '@playwright/test';

test.describe('DropdownMenu', () => {
  test('should support deep level submenus', async ({ page }) => {
    await page.goto('/DropdownMenu');

    const trigger = page.getByTestId('trigger');
    await trigger.click();

    expect(page.getByTestId('Item 1_1')).toBeFocused();

    // Go to the deepest level using keyboard
    await page.keyboard.press('ArrowRight', {
      delay: 200,
    });
    expect(page.getByTestId('Item 2_1')).toBeFocused();

    await page.keyboard.press('ArrowDown', {
      delay: 200,
    });
    expect(page.getByTestId('Item 2_2')).toBeFocused();

    await page.keyboard.press('ArrowDown', {
      delay: 200,
    });
    expect(page.getByTestId('Item 2_3')).toBeFocused();

    await page.keyboard.press('ArrowRight', {
      delay: 200,
    });
    expect(page.getByTestId('Item 3_1')).toBeFocused();

    await page.keyboard.press('ArrowDown', {
      delay: 200,
    });
    expect(page.getByTestId('Item 3_2')).toBeFocused();

    await page.keyboard.press('ArrowDown', {
      delay: 200,
    });
    expect(page.getByTestId('Item 3_3')).toBeFocused();

    await page.keyboard.press('ArrowRight', {
      delay: 200,
    });
    expect(page.getByTestId('Item 3_3_1')).toBeFocused();

    // Hovering out of a submenu should not close the entire menu tree
    await moveMouseWithRespectToComponent({
      side: 'right',
      direction: 'out',
      componentTestId: 'Item 3_3_1',
      page,
    });

    // If the last menu item of the tree is visible, the whole tree is visible
    expect(page.getByTestId('Item 3_3_1')).toBeFocused();

    // Hovering an ancestor "X" that has a submenu "Y" should close all submenus of "Y"
    await moveMouseWithRespectToComponent({
      side: 'left',
      direction: 'in',
      componentTestId: 'Item 1_1',
      page,
    });

    // const item1_1 = page.getByTestId('Item 1_1');

    // const item1_1Coordinates = await item1_1.boundingBox();
    // const xMid = item1_1Coordinates.x + item1_1Coordinates.width / 2;
    // const yBottom = item1_1Coordinates.y + item1_1Coordinates.height;
    // // Move the mouse incrementally into item1_1. Don't hover directly

    // // Array from +30 to -30 in steps of 1
    // Array.from({ length: 60 }, (_, i) => 30 - i).forEach(async (i) => {
    //   await page.mouse.move(xMid, yBottom + i);
    // });

    // await page.mouse.move(xMid, yBottom + 2);
    // await page.mouse.move(xMid, yBottom + 2);
    // await page.mouse.move(xMid, yBottom + 2);
    // await page.mouse.move(xMid, yBottom + 2);
    // await page.mouse.move(xMid, yBottom + 2);
    // await page.mouse.move(xMid, yBottom + 1);
    // await page.mouse.move(xMid, yBottom);
    // await page.mouse.move(xMid, yBottom - 1);
    // await page.mouse.move(xMid, yBottom - 2);
    // await page.mouse.move(1, 1);
    // await page.mouse.move(2, 2);
    // await page.mouse.move(3, 3);
    // await page.mouse.move(4, 4);
    // await page.mouse.move(5, 5);

    // await item1_1.hover();
    // await page.getByTestId('Item 2_3').hover();
    // await page.getByTestId('Item 2_3').click();
    // await item1_1.hover();

    // await page.waitForTimeout(1000);

    expect(page.getByTestId('Item 2_1')).toBeVisible();
    expect(page.getByTestId('Item 2_2')).toBeVisible();
    expect(page.getByTestId('Item 2_3')).toBeVisible();
    expect(page.getByTestId('Item 3_1')).toBeHidden();
    expect(page.getByTestId('Item 3_2')).toBeHidden();
    expect(page.getByTestId('Item 3_3')).toBeHidden();

    // Go to the deepest level using mouse
    await moveMouseWithRespectToComponent({
      side: 'left',
      direction: 'in',
      componentTestId: 'Item 2_3',
      page,
    });
    expect(page.getByTestId('Item 2_3')).toBeFocused();

    await moveMouseWithRespectToComponent({
      side: 'left',
      direction: 'in',
      componentTestId: 'Item 3_3',
      page,
    });
    expect(page.getByTestId('Item 3_3')).toBeFocused();

    await moveMouseWithRespectToComponent({
      side: 'left',
      direction: 'in',
      componentTestId: 'Item 3_3_1',
      page,
    });
    expect(page.getByTestId('Item 3_3_1')).toBeFocused();

    // expect('q').toBe('q');

    // When a node "X" is focused, should close "X"'s siblings' submenus
    // i.e. only one submenu in each menu should be open at a time
    await moveMouseWithRespectToComponent({
      side: 'right',
      direction: 'out',
      componentTestId: 'Item 3_3_1',
      page,
    });
    // await page.waitForTimeout(1000);
    await moveMouseWithRespectToComponent({
      side: 'right',
      direction: 'in',
      componentTestId: 'Item 3_2',
      page,
    });

    await page.waitForTimeout(200);

    expect(page.getByTestId('Item 3_2_1')).toBeVisible();
    expect(page.getByTestId('Item 3_3_1')).toBeHidden();
  });
});

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
    expect('HERE').not.toBe('HERE');
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

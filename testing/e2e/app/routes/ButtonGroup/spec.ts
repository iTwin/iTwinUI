import { test, expect, Page } from '@playwright/test';

test.describe('ButtonGroup (toolbar)', () => {
  test("should support keyboard navigation when role='toolbar'", async ({
    page,
  }) => {
    await page.goto('/ButtonGroup');

    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Button 1' })).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('button', { name: 'Button 2' })).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('button', { name: 'Button 3' })).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('button', { name: 'Button 1' })).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(page.getByRole('button', { name: 'Button 3' })).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(page.getByRole('button', { name: 'Button 2' })).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(page.getByRole('button', { name: 'Button 1' })).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(page.getByRole('button', { name: 'Button 3' })).toBeFocused();
  });

  test("should support keyboard navigation when role='toolbar' and orientation='vertical'", async ({
    page,
  }) => {
    await page.goto('/ButtonGroup?orientation=vertical');

    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Button 1' })).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('button', { name: 'Button 2' })).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('button', { name: 'Button 3' })).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('button', { name: 'Button 1' })).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(page.getByRole('button', { name: 'Button 3' })).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(page.getByRole('button', { name: 'Button 2' })).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(page.getByRole('button', { name: 'Button 1' })).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(page.getByRole('button', { name: 'Button 3' })).toBeFocused();
  });
});

test.describe('ButtonGroup (overflow)', () => {
  (
    [
      {
        orientation: 'horizontal',
        overflowPlacement: 'end',
      },
      {
        orientation: 'horizontal',
        overflowPlacement: 'start',
      },
      {
        orientation: 'vertical',
        overflowPlacement: 'end',
      },
      {
        orientation: 'vertical',
        overflowPlacement: 'start',
      },
    ] as const
  ).forEach(({ orientation, overflowPlacement }) => {
    test(`should overflow whenever there is not enough space (orientation=${orientation}, overflowPlacement=${overflowPlacement})`, async ({
      page,
    }) => {
      await page.goto(
        `/ButtonGroup?orientation=${orientation}&overflowPlacement=${overflowPlacement}`,
      );

      const setContainerSize = getSetContainerSize(page, orientation);
      const expectOverflowState = getExpectOverflowState(
        page,
        overflowPlacement,
      );

      await expectOverflowState({
        expectedButtonLength: 3,
        expectedOverflowTagFirstOverflowingIndex: undefined,
      });

      await setContainerSize(2.5);

      await expectOverflowState({
        expectedButtonLength: 2,
        expectedOverflowTagFirstOverflowingIndex: 1,
      });

      await setContainerSize(1.5);

      await expectOverflowState({
        expectedButtonLength: 1,
        expectedOverflowTagFirstOverflowingIndex:
          overflowPlacement === 'end' ? 0 : 2,
      });

      await setContainerSize(0.5);

      // should return 1 overflowTag when item is bigger than the container
      await expectOverflowState({
        expectedButtonLength: 1,
        expectedOverflowTagFirstOverflowingIndex:
          overflowPlacement === 'end' ? 0 : 2,
      });

      // should restore hidden items when space is available again
      await setContainerSize(1.5);

      await expectOverflowState({
        expectedButtonLength: 1,
        expectedOverflowTagFirstOverflowingIndex:
          overflowPlacement === 'end' ? 0 : 2,
      });

      await setContainerSize(2.5);

      await expectOverflowState({
        expectedButtonLength: 2,
        expectedOverflowTagFirstOverflowingIndex: 1,
      });

      await setContainerSize(10);

      await expectOverflowState({
        expectedButtonLength: 3,
        expectedOverflowTagFirstOverflowingIndex: undefined,
      });
    });
  });

  test(`should handle overflow only whenever overflowButton is passed`, async ({
    page,
  }) => {
    await page.goto(
      `/ButtonGroup?provideOverflowButton=false&showToggleProvideOverflowButton=true`,
    );

    const setContainerSize = getSetContainerSize(page, 'horizontal');
    const expectOverflowState = getExpectOverflowState(page, 'end');

    await expectOverflowState({
      expectedButtonLength: 3,
      expectedOverflowTagFirstOverflowingIndex: undefined,
    });

    await setContainerSize(2.5);

    await expectOverflowState({
      expectedButtonLength: 3,
      expectedOverflowTagFirstOverflowingIndex: undefined,
    });

    const toggleProviderOverflowContainerButton = page.getByTestId(
      'toggle-provide-overflow-container',
    );

    await toggleProviderOverflowContainerButton.click();
    await expectOverflowState({
      expectedButtonLength: 2,
      expectedOverflowTagFirstOverflowingIndex: 1,
    });

    await toggleProviderOverflowContainerButton.click();
    await expectOverflowState({
      expectedButtonLength: 3,
      expectedOverflowTagFirstOverflowingIndex: undefined,
    });
  });

  (
    [
      {
        visibleCount: 9,
        overflowStart: 1,
        overflowPlacement: 'start',
      },
      {
        visibleCount: 8,
        overflowStart: 2,
        overflowPlacement: 'start',
      },
      {
        visibleCount: 4,
        overflowStart: 6,
        overflowPlacement: 'start',
      },
      {
        visibleCount: 3,
        overflowStart: 7,
        overflowPlacement: 'start',
      },
      {
        visibleCount: 1,
        overflowStart: 9,
        overflowPlacement: 'start',
      },
      {
        visibleCount: 9,
        overflowStart: 8,
        overflowPlacement: 'end',
      },
      {
        visibleCount: 8,
        overflowStart: 7,
        overflowPlacement: 'end',
      },
      {
        visibleCount: 4,
        overflowStart: 3,
        overflowPlacement: 'end',
      },
      {
        visibleCount: 3,
        overflowStart: 2,
        overflowPlacement: 'end',
      },
      {
        visibleCount: 1,
        overflowStart: 0,
        overflowPlacement: 'end',
      },
    ] as const
  ).forEach(({ visibleCount, overflowStart, overflowPlacement }) => {
    test(`should calculate correct values when overflowPlacement=${overflowPlacement} and visibleCount=${visibleCount}`, async ({
      page,
    }) => {
      await page.goto(
        `/ButtonGroup?exampleType=overflow&overflowPlacement=${overflowPlacement}`,
      );

      const setContainerSize = getSetContainerSize(page, 'horizontal');
      await setContainerSize(visibleCount + 0.5);

      const allItems = await page.locator('button').all();
      const overflowButton =
        allItems[overflowPlacement === 'end' ? allItems.length - 1 : 0];
      const buttonGroupButtons = allItems.slice(
        overflowPlacement === 'end' ? 0 : 1,
        overflowPlacement === 'end' ? -1 : undefined,
      );

      await expect(overflowButton).toHaveText(`${overflowStart}`);
      expect(buttonGroupButtons).toHaveLength(visibleCount - 1);
    });
  });
});

// ----------------------------------------------------------------------------

const getSetContainerSize = (
  page: Page,
  orientation: 'horizontal' | 'vertical',
) => {
  return async (
    /**
     * Set container size relative to the item size.
     */
    multiplier: number | undefined,
  ) => {
    await page.locator('#container').evaluate(
      (element, args) => {
        if (args.multiplier != null) {
          const overlappingBorderOvercount = args.multiplier - 1;

          if (args.orientation === 'horizontal') {
            element.style.setProperty(
              'width',
              `${50 * args.multiplier - overlappingBorderOvercount - 1}px`, // - 1 to force the overflow
            );
          } else {
            element.style.setProperty(
              'height',
              `${36 * args.multiplier - overlappingBorderOvercount - 1}px`,
            );
          }
        } else {
          if (args.orientation === 'horizontal') {
            element.style.removeProperty('width');
          } else {
            element.style.removeProperty('height');
          }
        }
      },
      { orientation, multiplier },
    );
    await page.waitForTimeout(300);
  };
};

const getExpectOverflowState = (
  page: Page,
  overflowPlacement: 'start' | 'end',
) => {
  return async ({
    expectedButtonLength,
    expectedOverflowTagFirstOverflowingIndex,
  }: {
    expectedButtonLength: number;
    expectedOverflowTagFirstOverflowingIndex: number | undefined;
  }) => {
    const buttons = await page.locator('#container button').all();
    expect(buttons).toHaveLength(expectedButtonLength);

    if (expectedOverflowTagFirstOverflowingIndex != null) {
      await expect(
        buttons[overflowPlacement === 'end' ? buttons.length - 1 : 0],
      ).toHaveText(`${expectedOverflowTagFirstOverflowingIndex}`);
    } else {
      await expect(page.getByTestId('overflow-button')).toHaveCount(0);
    }
  };
};

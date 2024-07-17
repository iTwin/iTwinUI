import { test, expect, Page } from '@playwright/test';

test.describe('ButtonGroup', () => {
  test.describe('Toolbar', () => {
    test("should support keyboard navigation when role='toolbar'", async ({
      page,
    }) => {
      await page.goto('/ButtonGroup');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(
        page.getByRole('button', { name: 'Button 1' }),
      ).toBeFocused();

      await page.keyboard.press('ArrowRight');
      await expect(
        page.getByRole('button', { name: 'Button 2' }),
      ).toBeFocused();

      await page.keyboard.press('ArrowRight');
      await expect(
        page.getByRole('button', { name: 'Button 3' }),
      ).toBeFocused();

      await page.keyboard.press('ArrowRight');
      await expect(
        page.getByRole('button', { name: 'Button 1' }),
      ).toBeFocused();

      await page.keyboard.press('ArrowLeft');
      await expect(
        page.getByRole('button', { name: 'Button 3' }),
      ).toBeFocused();

      await page.keyboard.press('ArrowLeft');
      await expect(
        page.getByRole('button', { name: 'Button 2' }),
      ).toBeFocused();

      await page.keyboard.press('ArrowLeft');
      await expect(
        page.getByRole('button', { name: 'Button 1' }),
      ).toBeFocused();

      await page.keyboard.press('ArrowLeft');
      await expect(
        page.getByRole('button', { name: 'Button 3' }),
      ).toBeFocused();
    });

    test("should support keyboard navigation when role='toolbar' and orientation='vertical'", async ({
      page,
    }) => {
      await page.goto('/ButtonGroup?orientation=vertical');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(
        page.getByRole('button', { name: 'Button 1' }),
      ).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(
        page.getByRole('button', { name: 'Button 2' }),
      ).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(
        page.getByRole('button', { name: 'Button 3' }),
      ).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(
        page.getByRole('button', { name: 'Button 1' }),
      ).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await expect(
        page.getByRole('button', { name: 'Button 3' }),
      ).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await expect(
        page.getByRole('button', { name: 'Button 2' }),
      ).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await expect(
        page.getByRole('button', { name: 'Button 1' }),
      ).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await expect(
        page.getByRole('button', { name: 'Button 3' }),
      ).toBeFocused();
    });
  });

  test.describe('Overflow', () => {
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

        await setContainerSize(undefined);

        await expectOverflowState({
          expectedButtonLength: 3,
          expectedOverflowTagFirstOverflowingIndex: undefined,
        });
      });
    });

    test(`should handle overflow only whenever overflowButton is passed`, async ({
      page,
    }) => {
      await page.goto(`/ButtonGroup?provideOverflowButton=false`);

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
          visibleCount: 10,
          containerSize: '488px',
          overflowStart: 0,
          overflowPlacement: 'start',
        },
        {
          visibleCount: 9,
          containerSize: '481px',
          overflowStart: 1,
          overflowPlacement: 'start',
        },
        {
          visibleCount: 8,
          containerSize: '429px',
          overflowStart: 2,
          overflowPlacement: 'start',
        },
        {
          visibleCount: 4,
          containerSize: '220px',
          overflowStart: 6,
          overflowPlacement: 'start',
        },
        {
          visibleCount: 3,
          containerSize: '183px',
          overflowStart: 7,
          overflowPlacement: 'start',
        },
        {
          visibleCount: 1,
          containerSize: '77px',
          overflowStart: 9,
          overflowPlacement: 'start',
        },
        {
          visibleCount: 10,
          containerSize: '487px',
          overflowStart: 9,
          overflowPlacement: 'end',
        },
        {
          visibleCount: 9,
          containerSize: '475px',
          overflowStart: 8,
          overflowPlacement: 'end',
        },
        {
          visibleCount: 8,
          containerSize: '429px',
          overflowStart: 7,
          overflowPlacement: 'end',
        },
        {
          visibleCount: 4,
          containerSize: '221px',
          overflowStart: 3,
          overflowPlacement: 'end',
        },
        {
          visibleCount: 3,
          containerSize: '183px',
          overflowStart: 2,
          overflowPlacement: 'end',
        },
        {
          visibleCount: 1,
          containerSize: '78px',
          overflowStart: 0,
          overflowPlacement: 'end',
        },
      ] as const
    ).forEach(
      ({ visibleCount, containerSize, overflowStart, overflowPlacement }) => {
        test(`should calculate correct values when overflowPlacement=${overflowPlacement} and visibleCount=${visibleCount}`, async ({
          page,
        }) => {
          await page.goto(
            `/ButtonGroup?exampleType=overflow&containerSize${containerSize}&overflowPlacement=${overflowPlacement}`,
          );

          await page.waitForTimeout(60);

          const setContainerSize = getSetContainerSize(page, 'horizontal');
          await setContainerSize(
            visibleCount === 10 ? visibleCount : visibleCount + 0.5,
          );

          const allItems = await page.locator('button').all();
          const overflowButton =
            allItems[overflowPlacement === 'end' ? allItems.length - 1 : 0];
          const buttonGroupButtons = allItems.slice(
            overflowPlacement === 'end' ? 0 : 1,
            overflowPlacement === 'end' ? -1 : undefined,
          );

          expect(overflowButton).toHaveText(`${overflowStart}`);
          expect(buttonGroupButtons).toHaveLength(visibleCount - 1);
        });
      },
    );
  });
});

// ----------------------------------------------------------------------------

const getSetContainerSize = (
  page: Page,
  orientation: 'horizontal' | 'vertical',
) => {
  return async (multiplier: number | undefined) => {
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
    await page.waitForTimeout(30);
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
    await expect(buttons.length).toBe(expectedButtonLength);

    if (expectedOverflowTagFirstOverflowingIndex != null) {
      await expect(
        await buttons[
          overflowPlacement === 'end' ? buttons.length - 1 : 0
        ].textContent(),
      ).toBe(`${expectedOverflowTagFirstOverflowingIndex}`);
    } else {
      await expect(page.getByTestId('overflow-button')).toHaveCount(0);
    }
  };
};

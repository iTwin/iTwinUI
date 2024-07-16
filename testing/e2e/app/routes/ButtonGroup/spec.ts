import { test, expect, Page } from '@playwright/test';

test.describe('ButtonGroup', () => {
  // test("should support keyboard navigation when role='toolbar'", async ({
  //   page,
  // }) => {
  //   await page.goto('/ButtonGroup');

  //   await page.keyboard.press('Tab');
  //   await expect(page.getByRole('button', { name: 'Button 1' })).toBeFocused();

  //   await page.keyboard.press('ArrowRight');
  //   await expect(page.getByRole('button', { name: 'Button 2' })).toBeFocused();

  //   await page.keyboard.press('ArrowRight');
  //   await expect(page.getByRole('button', { name: 'Button 3' })).toBeFocused();

  //   await page.keyboard.press('ArrowRight');
  //   await expect(page.getByRole('button', { name: 'Button 1' })).toBeFocused();

  //   await page.keyboard.press('ArrowLeft');
  //   await expect(page.getByRole('button', { name: 'Button 3' })).toBeFocused();

  //   await page.keyboard.press('ArrowLeft');
  //   await expect(page.getByRole('button', { name: 'Button 2' })).toBeFocused();

  //   await page.keyboard.press('ArrowLeft');
  //   await expect(page.getByRole('button', { name: 'Button 1' })).toBeFocused();

  //   await page.keyboard.press('ArrowLeft');
  //   await expect(page.getByRole('button', { name: 'Button 3' })).toBeFocused();
  // });

  // test("should support keyboard navigation when role='toolbar' and orientation='vertical'", async ({
  //   page,
  // }) => {
  //   await page.goto('/ButtonGroup?orientation=vertical');

  //   await page.keyboard.press('Tab');
  //   await expect(page.getByRole('button', { name: 'Button 1' })).toBeFocused();

  //   await page.keyboard.press('ArrowDown');
  //   await expect(page.getByRole('button', { name: 'Button 2' })).toBeFocused();

  //   await page.keyboard.press('ArrowDown');
  //   await expect(page.getByRole('button', { name: 'Button 3' })).toBeFocused();

  //   await page.keyboard.press('ArrowDown');
  //   await expect(page.getByRole('button', { name: 'Button 1' })).toBeFocused();

  //   await page.keyboard.press('ArrowUp');
  //   await expect(page.getByRole('button', { name: 'Button 3' })).toBeFocused();

  //   await page.keyboard.press('ArrowUp');
  //   await expect(page.getByRole('button', { name: 'Button 2' })).toBeFocused();

  //   await page.keyboard.press('ArrowUp');
  //   await expect(page.getByRole('button', { name: 'Button 1' })).toBeFocused();

  //   await page.keyboard.press('ArrowUp');
  //   await expect(page.getByRole('button', { name: 'Button 3' })).toBeFocused();
  // });

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
      await page.waitForTimeout(30); // TODO: Try removing all timeouts

      await expectOverflowState({
        expectedButtonLength: 2,
        expectedOverflowTagFirstOverflowingIndex: 1,
      });

      await setContainerSize(1.5);
      await page.waitForTimeout(30);

      await expectOverflowState({
        expectedButtonLength: 1,
        expectedOverflowTagFirstOverflowingIndex:
          overflowPlacement === 'end' ? 0 : 2,
      });

      await setContainerSize(0.5);
      await page.waitForTimeout(30);

      // should return 1 overflowTag when item is bigger than the container
      await expectOverflowState({
        expectedButtonLength: 1,
        expectedOverflowTagFirstOverflowingIndex:
          overflowPlacement === 'end' ? 0 : 2,
      });

      await page.waitForTimeout(30);

      // should restore hidden items when space is available again
      await setContainerSize(1.5);
      await page.waitForTimeout(30);

      await expectOverflowState({
        expectedButtonLength: 1,
        expectedOverflowTagFirstOverflowingIndex:
          overflowPlacement === 'end' ? 0 : 2,
      });

      await setContainerSize(2.5);
      await page.waitForTimeout(30);

      await expectOverflowState({
        expectedButtonLength: 2,
        expectedOverflowTagFirstOverflowingIndex: 1,
      });

      await setContainerSize(undefined);
      await page.waitForTimeout(30);

      await expectOverflowState({
        expectedButtonLength: 3,
        expectedOverflowTagFirstOverflowingIndex: undefined,
      });

      await page.waitForTimeout(30);
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
    await page.waitForTimeout(30);

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
});

// ----------------------------------------------------------------------------

const getSetContainerSize = (
  page: Page,
  orientation: 'horizontal' | 'vertical',
) => {
  return async (multiplier: number | undefined) => {
    await page.locator('#container').evaluate(
      (element, args) => {
        if (args.orientation === 'horizontal') {
          if (args.multiplier != null) {
            element.style.setProperty('width', `${50 * args.multiplier}px`);
          } else {
            element.style.removeProperty('width');
          }
        } else {
          if (args.multiplier != null) {
            element.style.setProperty('height', `${36 * args.multiplier}px`);
          } else {
            element.style.removeProperty('height');
          }
        }
      },
      { orientation, multiplier },
    );
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
    expect(buttons.length).toBe(expectedButtonLength);

    if (expectedOverflowTagFirstOverflowingIndex != null) {
      expect(
        await buttons[
          overflowPlacement === 'end' ? buttons.length - 1 : 0
        ].textContent(),
      ).toBe(`${expectedOverflowTagFirstOverflowingIndex}`);
    } else {
      expect(page.getByTestId('overflow-button')).toHaveCount(0);
    }
  };
};

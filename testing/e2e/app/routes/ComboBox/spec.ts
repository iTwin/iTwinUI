import { test, expect, Page } from '@playwright/test';

const defaultOptions = [
  { label: 'Item 0', value: 0 },
  { label: 'Item 1', value: 1, subLabel: 'sub label' },
  { label: 'Item 2', value: 2 },
  { label: 'Item 3', value: 3 },
  { label: 'Item 4', value: 4 },
  { label: 'Item 10', value: 10 },
  { label: 'Item 11', value: 11 },
];

test.describe('ComboBox', () => {
  test.describe('General', () => {
    test('should select multiple options', async ({ page }) => {
      await page.goto('/ComboBox?multiple=true');

      await page.keyboard.press('Tab');

      const options = await page.locator('[role="option"]').all();
      for (const option of options) {
        await option.click();
      }

      const tags = await page
        .locator('#test-component-selected-live > span')
        .all();
      expect(tags).toHaveLength(options.length);

      for (let i = 0; i < tags.length; i++) {
        await expect(tags[i]).toHaveText(
          (await options[i].textContent()) ?? '',
        );
      }
    });

    [true, false].forEach((multiple) => {
      test(`should respect the value prop (${multiple})`, async ({ page }) => {
        await page.goto(
          `/ComboBox?multiple=${multiple}&value=${multiple ? 'all' : 11}`,
        );

        await page.waitForTimeout(30);

        // Should change internal state when the value prop changes
        if (multiple) {
          let tags = await page
            .locator('#test-component-selected-live > span')
            .all();
          expect(tags).toHaveLength(defaultOptions.length);

          for (let i = 0; i < tags.length; i++) {
            await expect(tags[i]).toHaveText(defaultOptions[i].label);
          }

          await page.getByTestId('change-value-to-first-option-button').click();
          tags = await page
            .locator('#test-component-selected-live > span')
            .all();

          expect(tags).toHaveLength(1);
          await expect(tags[0]).toHaveText(defaultOptions[0].label);
        } else {
          await expect(page.locator('input')).toHaveValue('Item 11');
          await page.getByTestId('change-value-to-first-option-button').click();
          await expect(page.locator('input')).toHaveValue('Item 0');
        }

        // Should not allow to select other options
        await page.keyboard.press('Tab');

        page.getByRole('option').nth(3).click();

        if (multiple) {
          const tags = await page
            .locator('#test-component-selected-live > span')
            .all();

          expect(tags).toHaveLength(1);
          await expect(tags[0]).toHaveText(defaultOptions[0].label);
        } else {
          await expect(page.locator('input')).toHaveValue('Item 0');
        }
      });
    });
  });

  test.describe('Virtualization', () => {
    test('should support keyboard navigation when virtualization is enabled', async ({
      page,
    }) => {
      await page.goto('/ComboBox?virtualization=true');

      await page.keyboard.press('Tab');
      const comboBoxInput = page.locator('#test-component').locator('input');
      const comboBoxMenu = page.getByRole('listbox');
      await expect(comboBoxInput).toHaveAttribute(
        'aria-controls',
        'test-component-list',
      );
      await expect(comboBoxMenu).toBeVisible();

      const items = page.getByRole('option');

      //focus first
      await page.keyboard.press('ArrowDown');
      await expect(comboBoxInput).toHaveAttribute(
        'aria-activedescendant',
        'test-component-option-Item-0',
      );
      await expect(items.first()).toHaveAttribute('data-iui-focused', 'true');

      //stay on first
      await page.keyboard.press('ArrowUp');
      await expect(comboBoxInput).toHaveAttribute(
        'aria-activedescendant',
        'test-component-option-Item-0',
      );
      await expect(items.first()).toHaveAttribute('data-iui-focused', 'true');

      //focus second
      await page.keyboard.press('ArrowDown');
      await expect(comboBoxInput).toHaveAttribute(
        'aria-activedescendant',
        'test-component-option-Item-1',
      );
      await expect(items.first()).not.toHaveAttribute(
        'data-iui-focused',
        'true',
      );
      await expect(items.nth(1)).toHaveAttribute('data-iui-focused', 'true');

      //focus last
      for (let i = 0; i <= 6; ++i) {
        await page.keyboard.press('ArrowDown');
      }
      await expect(comboBoxInput).toHaveAttribute(
        'aria-activedescendant',
        'test-component-option-Item-11',
      );
      await expect(items.last()).toHaveAttribute('data-iui-focused', 'true');

      //stay on last
      await page.keyboard.press('ArrowDown');
      await expect(comboBoxInput).toHaveAttribute(
        'aria-activedescendant',
        'test-component-option-Item-11',
      );
      await expect(items.last()).toHaveAttribute('data-iui-focused', 'true');

      //select last
      await page.keyboard.press('Enter');
      await expect(comboBoxInput).not.toHaveAttribute(
        'aria-controls',
        'test-component-list',
      );
      await expect(comboBoxMenu).not.toBeVisible();
      await expect(comboBoxInput).toHaveAttribute('value', 'Item 11');

      //reopen menu
      await page.keyboard.press('Enter');
      await expect(items.last()).toHaveAttribute('data-iui-focused', 'true');
      await expect(items.last()).toHaveAttribute('data-iui-active', 'true');

      //Filter and focus first
      await comboBoxInput.fill('1');
      expect(items).toHaveCount(3);
      await page.keyboard.press('ArrowDown');
      await expect(comboBoxInput).toHaveAttribute(
        'aria-activedescendant',
        'test-component-option-Item-1',
      );
      await expect(items.first()).toHaveAttribute('data-iui-focused', 'true');

      //stay on first
      await page.keyboard.press('ArrowUp');
      await expect(comboBoxInput).toHaveAttribute(
        'aria-activedescendant',
        'test-component-option-Item-1',
      );
      await expect(items.first()).toHaveAttribute('data-iui-focused', 'true');

      //focus second
      await page.keyboard.press('ArrowDown');
      await expect(comboBoxInput).toHaveAttribute(
        'aria-activedescendant',
        'test-component-option-Item-10',
      );
      await expect(items.first()).not.toHaveAttribute(
        'data-iui-focused',
        'true',
      );
      await expect(items.nth(1)).toHaveAttribute('data-iui-focused', 'true');

      //focus third(last filtered)
      await page.keyboard.press('ArrowDown');
      await expect(comboBoxInput).toHaveAttribute(
        'aria-activedescendant',
        'test-component-option-Item-11',
      );
      await expect(items.last()).toHaveAttribute('data-iui-focused', 'true');

      //stay on third(last filtered)
      await page.keyboard.press('ArrowDown');
      await expect(comboBoxInput).toHaveAttribute(
        'aria-activedescendant',
        'test-component-option-Item-11',
      );
      await expect(items.last()).toHaveAttribute('data-iui-focused', 'true');

      //select last
      await page.keyboard.press('Enter');
      await expect(comboBoxInput).not.toHaveAttribute(
        'aria-controls',
        'test-component-list',
      );
      await expect(comboBoxMenu).not.toBeVisible();
      await expect(comboBoxInput).toHaveAttribute('value', 'Item 11');

      //reopen menu
      await page.keyboard.press('ArrowDown');
      await expect(items.nth(6)).toHaveAttribute('data-iui-focused', 'true');
      await expect(items.nth(6)).toHaveAttribute('data-iui-active', 'true');

      //close menu
      await page.keyboard.press('Escape');
      await expect(comboBoxInput).not.toHaveAttribute(
        'aria-controls',
        'test-component-list',
      );
      await expect(comboBoxMenu).not.toBeVisible();

      //reopen and close menu
      await page.keyboard.press('X');
      await expect(comboBoxInput).toHaveAttribute(
        'aria-controls',
        'test-component-list',
      );
      await expect(comboBoxMenu).toBeVisible();
      await page.keyboard.press('Tab');
      await expect(comboBoxInput).not.toHaveAttribute(
        'aria-controls',
        'test-component-list',
      );
      await expect(comboBoxMenu).not.toBeVisible();
    });

    test('virtualized ComboBox should support dynamic sizing', async ({
      page,
    }) => {
      await page.goto('/ComboBox?virtualization=true');

      await page.keyboard.press('Tab');
      const comboBoxList = page.getByRole('listbox');
      const outerVirtualizedContainer = comboBoxList.locator('>div', {
        has: page.locator('slot'),
      });
      const items = page.getByRole('option');

      let totalItemsHeight = 0;
      for (const item of await items.all()) {
        totalItemsHeight += (await item.boundingBox())?.height ?? 0;
      }

      // accounts for height lost due to gap
      totalItemsHeight -= (await items.all()).length - 1;

      expect((await outerVirtualizedContainer.boundingBox())?.height).toBe(
        totalItemsHeight,
      );
    });
  });

  test.describe('Overflow', () => {
    test(`should overflow whenever there is not enough space`, async ({
      page,
    }) => {
      await page.goto(`/ComboBox?multiple=true&value=all`);

      const setContainerSize = getSetContainerSize(page);
      const expectOverflowState = getExpectOverflowState(page);

      await expectOverflowState({
        expectedItemLength: 7,
        expectedLastTagTextContent: 'Item 11',
      });

      await setContainerSize('500px');

      await expectOverflowState({
        expectedItemLength: 4,
        expectedLastTagTextContent: '+4 item(s)',
      });
    });

    test(`should at minimum always show one overflow tag`, async ({ page }) => {
      await page.goto(`/ComboBox?multiple=true&value=all`);

      const setContainerSize = getSetContainerSize(page);
      const expectOverflowState = getExpectOverflowState(page);

      await expectOverflowState({
        expectedItemLength: 7,
        expectedLastTagTextContent: 'Item 11',
      });

      await setContainerSize('10px');
      await page.waitForTimeout(60);

      await expectOverflowState({
        expectedItemLength: 1,
        expectedLastTagTextContent: '+7 item(s)',
      });
    });

    test('should always show the selected tag and no overflow tag when only one item is selected', async ({
      page,
    }) => {
      await page.goto(`/ComboBox?multiple=true&value=[11]`);

      const setContainerSize = getSetContainerSize(page);
      const expectOverflowState = getExpectOverflowState(page);

      await expectOverflowState({
        expectedItemLength: 1,
        expectedLastTagTextContent: 'Item 11',
      });

      await setContainerSize('50px');

      await expectOverflowState({
        expectedItemLength: 1,
        expectedLastTagTextContent: 'Item 11',
      });
    });
  });
});

// ----------------------------------------------------------------------------

const getSetContainerSize = (page: Page) => {
  return async (dimension: string | undefined) => {
    await page.getByTestId('container').evaluate(
      (element, args) => {
        if (args.dimension != null) {
          element.style.setProperty('width', args.dimension);
        } else {
          element.style.removeProperty('width');
        }
      },
      { dimension },
    );
    await page.waitForTimeout(30);
  };
};

const getExpectOverflowState = (page: Page) => {
  return async ({
    expectedItemLength,
    expectedLastTagTextContent,
  }: {
    expectedItemLength: number;
    expectedLastTagTextContent: string | undefined;
  }) => {
    const tags = await page.locator('div[id$="-selected-live"] > span').all();
    expect(tags).toHaveLength(expectedItemLength);

    const lastTag = tags[tags.length - 1];

    if (expectedLastTagTextContent != null) {
      expect(lastTag).toHaveText(expectedLastTagTextContent);
    } else {
      expect(tags).toHaveLength(0);
    }
  };
};

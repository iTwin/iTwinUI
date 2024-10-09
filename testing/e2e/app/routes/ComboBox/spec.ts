import { test, expect } from '@playwright/test';

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
  await expect(items.first()).not.toHaveAttribute('data-iui-focused', 'true');
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
  expect((await items.all()).length).toBe(3);
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
  await expect(items.first()).not.toHaveAttribute('data-iui-focused', 'true');
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

test('virtualized ComboBox should support dynamic sizing', async ({ page }) => {
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

[false, true].map((clearFilterOnOptionToggle) => {
  test(`should support clearFilterOnOptionToggle=${clearFilterOnOptionToggle}`, async ({
    page,
  }) => {
    await page.goto(
      `/ComboBox?multiple=true&clearFilterOnOptionToggle=${clearFilterOnOptionToggle}`,
    );

    const options = page.locator('[role="option"]');
    const input = page.locator('input');

    await input.fill('1');
    await expect(options).toHaveCount(3);

    await options.first().click();

    if (clearFilterOnOptionToggle) {
      await expect(input).toHaveValue('');
      await expect(options).not.toHaveCount(3);
    } else {
      await expect(input).toHaveValue('1');
      await expect(options).toHaveCount(3);
    }

    await expect(page.locator('[role=option][aria-selected=true]')).toHaveCount(
      1,
    );
  });
});

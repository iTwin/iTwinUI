import { test, expect } from '@playwright/test';

test.describe('className, style, and ...rest are applied on the correct element', () => {
  (
    [
      {
        themeProviderConsistentPropsSpread: false,
        expectedClassNameAndStyleLocation: 'wrapper',
      },
      {
        themeProviderConsistentPropsSpread: true,
        expectedClassNameAndStyleLocation: 'input',
      },
    ] as const
  ).forEach(
    ({
      themeProviderConsistentPropsSpread,
      expectedClassNameAndStyleLocation,
    }) => {
      test(`themeProviderConsistentPropsSpread: ${themeProviderConsistentPropsSpread}`, async ({
        page,
      }) => {
        await page.goto(
          `/ToggleSwitch?themeProviderConsistentPropsSpread=${themeProviderConsistentPropsSpread}`,
        );

        const wrapper = page.locator("div:has(> input[role='switch'])");
        const input = page.locator('input[role="switch"]');

        // Check if className and style are applied on the correct element
        if (expectedClassNameAndStyleLocation === 'wrapper') {
          // className
          await expect(wrapper).toContainClass('my-class');
          await expect(input).not.toContainClass('my-class');

          // style
          await expect(
            await wrapper.evaluate(
              (el) => getComputedStyle(el).backgroundColor,
            ),
          ).toBe('rgb(255, 0, 0)');
          await expect(
            await input.evaluate((el) => getComputedStyle(el).backgroundColor),
          ).not.toBe('rgb(255, 0, 0)');
        } else {
          // className
          await expect(wrapper).not.toContainClass('my-class');
          await expect(input).toContainClass('my-class');

          // style
          await expect(
            await wrapper.evaluate(
              (el) => getComputedStyle(el).backgroundColor,
            ),
          ).not.toBe('rgb(255, 0, 0)');
          await expect(
            await input.evaluate((el) => getComputedStyle(el).backgroundColor),
          ).toBe('rgb(255, 0, 0)');
        }

        // rest props should always go to input
        await expect(wrapper).not.toHaveAttribute(
          'data-dummy-data-attr',
          'dummy-value-root',
        );
        await expect(input).toHaveAttribute(
          'data-dummy-data-attr',
          'dummy-value-root',
        );
      });
    },
  );
});

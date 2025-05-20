import { test, expect } from '@playwright/test';

test.describe('className, style, and ...rest are applied on the correct element', () => {
  [true, false].forEach((shouldPassWrapperProps) => {
    test(`shouldPassWrapperProps: ${shouldPassWrapperProps}`, async ({
      page,
    }) => {
      await page.goto(
        `/ToggleSwitch?shouldPassWrapperProps=${shouldPassWrapperProps}`,
      );

      const wrapper = page.locator("div:has(> input[role='switch'])");
      const input = page.locator('input[role="switch"]');

      if (shouldPassWrapperProps) {
        // className goes to input. wrapperProps.className goes to wrapper.
        await expect(wrapper).toContainClass('wrapper-class');
        await expect(wrapper).not.toContainClass('my-class');
        await expect(input).not.toContainClass('wrapper-class');
        await expect(input).toContainClass('my-class');

        // style goes to input. wrapperProps.style goes to wrapper.
        await expect(
          await wrapper.evaluate((el) => getComputedStyle(el).backgroundColor),
        ).toBe('rgb(0, 0, 255)');
        await expect(
          await input.evaluate((el) => getComputedStyle(el).backgroundColor),
        ).toBe('rgb(255, 0, 0)');

        // ...rest goes to input. wrapperProps go to wrapper.
        await expect(wrapper).toHaveAttribute(
          'data-dummy-data-attr',
          'dummy-value-wrapper-props',
        );
        await expect(input).toHaveAttribute(
          'data-dummy-data-attr',
          'dummy-value-root',
        );
      } else {
        // className goes to the wrapper.
        await expect(wrapper).toContainClass('my-class');
        await expect(wrapper).not.toContainClass('wrapper-class');
        await expect(input).not.toContainClass('my-class');
        await expect(input).not.toContainClass('wrapper-class');

        // style goes to the wrapper.
        await expect(
          await wrapper.evaluate((el) => getComputedStyle(el).backgroundColor),
        ).toBe('rgb(255, 0, 0)');

        // ...rest goes to the input.
        await expect(wrapper).not.toHaveAttribute('data-dummy-data-attr');
        await expect(input).toHaveAttribute(
          'data-dummy-data-attr',
          'dummy-value-root',
        );
      }
    });
  });
});

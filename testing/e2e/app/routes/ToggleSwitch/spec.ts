import { test, expect } from '@playwright/test';

test.describe('className, style, ...rest, and wrapperProps are applied on the correct element', () => {
  (
    [
      {
        shouldPassWrapperProps: false,
        themeProviderConsistentPropsSpread: false,
        themeProviderPreferRenderingWithoutWrapper: false,
        expectedClassNameAndStyleLocation: 'wrapper',
      },
      {
        shouldPassWrapperProps: false,
        themeProviderConsistentPropsSpread: false,
        themeProviderPreferRenderingWithoutWrapper: true,
        expectedClassNameAndStyleLocation: 'input',
      },
      {
        shouldPassWrapperProps: true,
        themeProviderConsistentPropsSpread: false,
        themeProviderPreferRenderingWithoutWrapper: false,
        expectedClassNameAndStyleLocation: 'input',
      },
      {
        shouldPassWrapperProps: true,
        themeProviderConsistentPropsSpread: false,
        themeProviderPreferRenderingWithoutWrapper: true,
        expectedClassNameAndStyleLocation: 'input',
      },
      {
        shouldPassWrapperProps: false,
        themeProviderConsistentPropsSpread: true,
        themeProviderPreferRenderingWithoutWrapper: false,
        expectedClassNameAndStyleLocation: 'input',
      },
      {
        shouldPassWrapperProps: true,
        themeProviderConsistentPropsSpread: true,
        themeProviderPreferRenderingWithoutWrapper: true,
        expectedClassNameAndStyleLocation: 'input',
      },
    ] as const
  ).forEach(
    ({
      shouldPassWrapperProps,
      themeProviderConsistentPropsSpread,
      themeProviderPreferRenderingWithoutWrapper,
      expectedClassNameAndStyleLocation,
    }) => {
      test(`shouldPassWrapperProps: ${shouldPassWrapperProps}, themeProviderConsistentPropsSpread: ${themeProviderConsistentPropsSpread}, themeProviderPreferRenderingWithoutWrapper: ${themeProviderPreferRenderingWithoutWrapper}`, async ({
        page,
      }) => {
        await page.goto(
          `/ToggleSwitch?withThemeProvider=true&shouldPassWrapperProps=${shouldPassWrapperProps}&themeProviderConsistentPropsSpread=${themeProviderConsistentPropsSpread}&themeProviderPreferRenderingWithoutWrapper=${themeProviderPreferRenderingWithoutWrapper}`,
        );

        const wrapper = page.locator(
          "div:has(> input[role='switch']):not(.theme-provider)",
        );
        const input = page.locator('input[role="switch"]');

        const shouldRenderWrapper = !themeProviderPreferRenderingWithoutWrapper;

        // 1. If no label and no icon and the preferRenderingWithoutWrapper future flag is enabled, then only input should be rendered.
        if (themeProviderPreferRenderingWithoutWrapper) {
          await expect(wrapper).toHaveCount(0);
          await expect(input).toHaveCount(1);
        } else {
          await expect(wrapper).toHaveCount(1);
          await expect(input).toHaveCount(1);
        }

        // 2. Check if wrapperProps is applied on wrapper (if wrapper exists)
        if (shouldPassWrapperProps) {
          if (shouldRenderWrapper) {
            await expect(wrapper).toContainClass('wrapper-class');
          }
          await expect(input).not.toContainClass('wrapper-class');

          if (shouldRenderWrapper) {
            await expect(
              await wrapper.evaluate(
                (el) => getComputedStyle(el).backgroundColor,
              ),
            ).toBe('rgb(0, 0, 255)');
          }
          await expect(
            await input.evaluate((el) => getComputedStyle(el).backgroundColor),
          ).not.toBe('rgb(0, 0, 255)');
        }

        // 3. Check if className and style are applied on the correct element
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
          if (shouldRenderWrapper) {
            await expect(wrapper).not.toContainClass('my-class');
          }
          await expect(input).toContainClass('my-class');

          // style
          if (shouldRenderWrapper) {
            await expect(
              await wrapper.evaluate(
                (el) => getComputedStyle(el).backgroundColor,
              ),
            ).not.toBe('rgb(255, 0, 0)');
          }
          await expect(
            await input.evaluate((el) => getComputedStyle(el).backgroundColor),
          ).toBe('rgb(255, 0, 0)');
        }

        // 4. rest props should always go to input
        if (shouldRenderWrapper) {
          await expect(wrapper).not.toHaveAttribute(
            'data-dummy-data-attr',
            'dummy-value-root',
          );
        }
        await expect(input).toHaveAttribute(
          'data-dummy-data-attr',
          'dummy-value-root',
        );
      });
    },
  );
});

import * as React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';
import * as allExamples from 'examples';

test.describe('Should have no WCAG violations', () => {
  Object.entries(allExamples).forEach(([name, Component]) => {
    test(name, async ({ mount, page }) => {
      await mount(<Component />);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toHaveLength(0);
    });
  });
});

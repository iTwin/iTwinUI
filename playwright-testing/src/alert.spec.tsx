import * as React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';

import AlertMain from 'examples/Alert.main';
import AlertPositive from 'examples/Alert.positive';

test.describe('Alert should have no WCAG violations', () => {
  test('main', async ({ mount, page }) => {
    await mount(<AlertMain />);

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toHaveLength(0);
  });

  test('positive', async ({ mount, page }) => {
    await mount(<AlertPositive />);

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toHaveLength(0);
  });
});

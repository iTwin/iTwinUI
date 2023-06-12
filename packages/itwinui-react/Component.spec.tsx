import * as AllExamples from 'examples';
import * as React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';
import type { HooksConfig } from '@playwright/test';
import type { Page } from 'playwright';

// Alert Test

test('Alert should meet WCAG criteria', async ({
  mount,
  page,
}: {
  mount: (
    jsx: JSX.Element,
    config?: { hooksConfig?: HooksConfig },
  ) => Promise<void>;
  page: Page;
}) => {
  await mount(
    <>
      <AllExamples.AlertMainExample />
      <AllExamples.AlertInformationalExample />
      <AllExamples.AlertInlineExample />
      <AllExamples.AlertNegativeExample />
      <AllExamples.AlertPositiveExample />
      <AllExamples.AlertStickyExample />
      <AllExamples.AlertWarningExample />
    </>,
  );

  // pass component to axebuilder

  const accessibilityScanResults = await new AxeBuilder({ page })
    .include('#navigation-menu-flyout')
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as allExamples from 'examples';
import { ThemeProvider } from '@itwin/itwinui-react';

type commonRulesKeys = 'ignore_color_contrast_violation';
const commonRules: Record<commonRulesKeys, Record<string, any>> = {
  ignore_color_contrast_violation: {
    id: 'color-contrast',
    enabled: true,
    selector: ':not(.iui-root, [data-iui-theme]) .iui-time > ol > li)',
  },
};

const axeConfigPerExample = {
  DatePickerWithCombinedTimeExample: {
    rules: [commonRules.ignore_color_contrast_violation],
  },
  DatePickerWithTimeExample: {
    rules: [commonRules.ignore_color_contrast_violation],
  },
};

describe('Should have no WCAG violations', () => {
  Object.entries(allExamples).forEach(([name, Component]) => {
    it(name, () => {
      cy.mount(
        <ThemeProvider theme='dark' style={{ height: '100vh' }}>
          <Component />
        </ThemeProvider>,
      );
      cy.injectAxe({
        axeCorePath: Cypress.env('axeCorePath'),
      });

      cy.configureAxe(axeConfigPerExample[name]);

      cy.checkA11y(undefined, undefined, (violations) => {
        const violationData = violations.map(({ id, help }) => ({
          Component: name,
          'Rule ID': id,
          Description: help,
        }));
        cy.task('table', violationData);
      });
    });
  });
});

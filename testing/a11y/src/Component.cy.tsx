/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as allExamples from 'examples';
import { ThemeProvider } from '@itwin/itwinui-react';

type commonRulesKeys = 'ignore_color_contrast_for_select_placeholder';

const commonRules: Record<commonRulesKeys, Record<string, any>> = {
  ignore_color_contrast_for_select_placeholder: {
    id: 'color-contrast',
    enabled: true,
    selector: ':not(._iui3-placeholder > span._iui3-content)',
  },
};

const skipRules = {
  SelectIconExample: {
    rules: [commonRules.ignore_color_contrast_for_select_placeholder],
  },
  SelectMainExample: {
    rules: [commonRules.ignore_color_contrast_for_select_placeholder],
  },
  SelectStatusesExample: {
    rules: [commonRules.ignore_color_contrast_for_select_placeholder],
  },
  SelectSublabelsExample: {
    rules: [commonRules.ignore_color_contrast_for_select_placeholder],
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

      const rules = skipRules[name] ? skipRules[name].rules : undefined;

      cy.configureAxe({
        rules: rules,
      });

      cy.checkA11y(undefined, undefined, (violations) => {
        let violationData = violations.map(({ id, help }) => ({
          Component: name,
          'Rule ID': id,
          Description: help,
        }));

        cy.task('table', violationData);
      });
    });
  });
});

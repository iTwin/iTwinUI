/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as allExamples from 'examples';
import { ThemeProvider } from '@itwin/itwinui-react';

describe('Should have no WCAG violations', () => {
  Object.entries(allExamples).forEach(([name, Component]) => {
    const testsToTestFor = [
      'SelectDisableExample',
      'SelectIconExample',
      'SelectMainExample',
      'SelectStatusesExample',
      'SelectSublabelsExample',
      'SelectTruncateExample',
    ];

    const skipRules = {
      SelectIconExample: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
            selector: ':not(._iui3-content)',
          },
        ],
      },
      SelectMainExample: { rules: [{ id: 'color-contrast', enabled: false }] },
      SelectStatusesExample: {
        rules: [{ id: 'color-contrast', enabled: false }],
      },
      SelectSublabelsExample: {
        rules: [{ id: 'color-contrast', enabled: false }],
      },
    };

    if (!testsToTestFor.includes(name)) {
      return;
    }

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
        let violationData = violations.map(({ id, help, ...rest }) => ({
          Component: name,
          'Rule ID': id,
          Description: help,
          ...rest,
        }));

        console.log('violationData', violationData);

        // violationData = violationData.filter((data) => {
        //   if (skipVioloations[name]) {
        //     return !skipVioloations[name].includes(data['Rule ID']);
        //   }
        //   return true;
        // });

        cy.task('table', violationData);
      });
    });
  });
});

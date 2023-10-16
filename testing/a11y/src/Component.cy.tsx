/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as allExamples from 'examples';
import { ThemeProvider } from '@itwin/itwinui-react';

// We are disabling few rules on certain elements to ignore false positives.
const axeConfigPerExample = (example) => {
  switch (example) {
    // disabled elements do not need to meet contrast requirements
    case 'TileLoadingExample': {
      return { rules: [{ id: 'color-contrast', enabled: false }] };
    }

    // false positive only in CI
    case 'InputStatusExample': {
      return {
        rules: [{ id: 'color-contrast', enabled: !Cypress.env('CI') }],
      };
    }
  }
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

      cy.configureAxe(axeConfigPerExample(name));

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

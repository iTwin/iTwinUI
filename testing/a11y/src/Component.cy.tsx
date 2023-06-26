import React from 'react';
import * as allExamples from 'examples';

describe('Should have no WCAG violations', () => {
  Object.entries(allExamples).forEach(([name, Component]) => {
    it(name, () => {
      cy.mount(<Component />);
      // A11y Tests
      cy.injectAxe({ axeCorePath: Cypress.env('axeCorePath') });
      cy.checkA11y(undefined, undefined, (violations) => {
        const violationData = violations.map(
          ({ id, impact, description, nodes }) => ({
            id,
            impact,
            description,
            nodes: nodes.length,
          }),
        );

        cy.task('table', violationData);
      });
    });
  });
});

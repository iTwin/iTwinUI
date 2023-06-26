import React from 'react';
import { AlertInformationalExample } from 'examples';

describe('AlertInformationalExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<AlertInformationalExample />);
    // A11y Tests
    cy.injectAxe({ axeCorePath: Cypress.env('axeCorePath') });
    cy.checkA11y(undefined, undefined, (violations) => {
      cy.task(
        'log',
        `${violations.length} accessibility violation${
          violations.length === 1 ? '' : 's'
        } ${violations.length === 1 ? 'was' : 'were'} detected`,
      );
      // pluck specific keys to keep the table readable
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

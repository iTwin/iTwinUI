import React from 'react';
import { AlertInformationalExample } from 'examples-js';
import 'cypress-axe';

describe('AlertInformationalExample', () => {
  it('mounts', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AlertInformationalExample />);
    // A11Y Tests
    cy.injectAxe();
    cy.configureAxe({
      rules: [
        {
          id: 'html-has-lang',
          enabled: false,
        },
        {
          id: 'landmark-one-main',
          enabled: false,
        },
        {
          id: 'page-has-heading-one',
          enabled: false,
        },
        {
          id: 'region',
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});

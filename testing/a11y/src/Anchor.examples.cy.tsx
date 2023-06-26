import React from 'react';
import { AnchorAsButtonExample, AnchorMainExample } from 'examples-js';
import 'cypress-axe';

describe('AnchorAsButtonExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<AnchorAsButtonExample />);
    // A11y tests
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
        // {
        //   id: 'region',
        //   enabled: false,
        // },
      ],
    });
    cy.checkA11y();
  });
});
describe('AnchorMainExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<AnchorMainExample />);
    // A11y tests
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

import React from 'react';
import {
  AlertInformationalExample,
  AlertInlineExample,
  AlertMainExample,
  AlertNegativeExample,
  AlertPositiveExample,
  AlertStickyExample,
  AlertWarningExample,
} from 'examples-js';
import 'cypress-axe';

describe('AlertInformationalExample', () => {
  it('is a11y compliant', () => {
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
describe('AlertInlineExample', () => {
  it('is a11y compliant', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AlertInlineExample />);
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
describe('AlertMainExample', () => {
  it('is a11y compliant', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AlertMainExample />);
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
describe('AlertNegativeExample', () => {
  it('is a11y compliant', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AlertNegativeExample />);
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
describe('AlertPositiveExample', () => {
  it('is a11y compliant', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AlertPositiveExample />);
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
describe('AlertStickyExample', () => {
  it('is a11y compliant', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AlertStickyExample />);
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
describe('AlertWarningExample', () => {
  it('is a11y compliant', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AlertWarningExample />);
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

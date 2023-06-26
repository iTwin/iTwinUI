import React from 'react';
import {
  BadgeMainExample,
  BadgeSoftExample,
  BadgeStatusesExample,
} from 'examples-js';
import 'cypress-axe';

describe('BadgeMainExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<BadgeMainExample />);
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
  });
});

describe('BadgeSoftExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<BadgeSoftExample />);
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
  });
});

describe('BadgeStatusesExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<BadgeStatusesExample />);
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
  });
});

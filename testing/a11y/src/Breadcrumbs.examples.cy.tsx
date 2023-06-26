import React from 'react';
import {
  BreadcrumbsButtonExample,
  BreadcrumbsCustomOverflowDropdownExample,
  BreadcrumbsExtremeTruncationExample,
  BreadcrumbsFolderExample,
  BreadcrumbsLinkExample,
  BreadcrumbsMainExample,
  BreadcrumbsTruncationExample,
} from 'examples-js';
import 'cypress-axe';

describe('BreadcrumbsButtonExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<BreadcrumbsButtonExample />);
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

describe('BreadcrumbsCustomOverflowDropdownExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<BreadcrumbsCustomOverflowDropdownExample />);
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

describe('BreadcrumbsExtremeTruncationExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<BreadcrumbsExtremeTruncationExample />);
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

describe('BreadcrumbsFolderExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<BreadcrumbsFolderExample />);
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

describe('BreadcrumbsLinkExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<BreadcrumbsLinkExample />);
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

describe('BreadcrumbsMainExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<BreadcrumbsMainExample />);
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

describe('BreadcrumbsTruncationExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<BreadcrumbsTruncationExample />);
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

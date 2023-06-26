import React from 'react';
import {
  ButtonBorderlessExample,
  ButtonCTAExample,
  ButtonDefaultExample,
  ButtonGroupInputExample,
  ButtonGroupMainExample,
  ButtonGroupOverflowExample,
  ButtonGroupUsageExample,
  ButtonGroupVerticalExample,
  ButtonHighVisibilityExample,
  ButtonMainExample,
  ButtonSizeExample,
} from 'examples-js';
import 'cypress-axe';

describe('ButtonBorderlessExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<ButtonBorderlessExample />);
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

describe('ButtonCTAExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<ButtonCTAExample />);
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

describe('ButtonDefaultExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<ButtonDefaultExample />);
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

describe('ButtonGroupInputExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<ButtonGroupInputExample />);
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

describe('ButtonGroupMainExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<ButtonGroupMainExample />);
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

describe('ButtonGroupOverflowExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<ButtonGroupOverflowExample />);
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

describe('ButtonGroupUsageExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<ButtonGroupUsageExample />);
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

describe('ButtonGroupVerticalExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<ButtonGroupVerticalExample />);
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

describe('ButtonHighVisibilityExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<ButtonHighVisibilityExample />);
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

describe('ButtonMainExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<ButtonMainExample />);
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

describe('ButtonSizeExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<ButtonSizeExample />);
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

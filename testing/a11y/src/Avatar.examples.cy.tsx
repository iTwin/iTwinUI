import React from 'react';
import {
  AvatarGroupExample,
  AvatarGroupAnimatedExample,
  AvatarGroupOverflowExample,
  AvatarGroupOverflowTooltipExample,
  AvatarGroupStackedExample,
  AvatarIconExample,
  AvatarInitialsExample,
  AvatarMainExample,
  AvatarPictureExample,
  AvatarSizesExample,
  AvatarStatusesExample,
} from 'examples-js';
import 'cypress-axe';

describe('AvatarGroupExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<AvatarGroupExample />);
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

describe('AvatarGroupAnimated', () => {
  it('is a11y compliant', () => {
    cy.mount(<AvatarGroupAnimatedExample />);
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

describe('AvatarGroupOverflowExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<AvatarGroupOverflowExample />);
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

describe('AvatarGroupOverflowTooltipExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<AvatarGroupOverflowTooltipExample />);
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

describe('AvatarGroupStackedExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<AvatarGroupStackedExample />);
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

describe('AvatarIconExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<AvatarIconExample />);
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

describe('AvatarInitialsExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<AvatarInitialsExample />);
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

describe('AvatarMainExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<AvatarMainExample />);
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

describe('AvatarPictureExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<AvatarPictureExample />);
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

describe('AvatarSizesExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<AvatarSizesExample />);
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

describe('AvatarStatusesExample', () => {
  it('is a11y compliant', () => {
    cy.mount(<AvatarStatusesExample />);
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

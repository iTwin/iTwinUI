import React from 'react';
import { AlertInformationalExample } from 'examples';

describe('AlertInformationalExample', () => {
  it('mounts', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AlertInformationalExample />);
  });
});

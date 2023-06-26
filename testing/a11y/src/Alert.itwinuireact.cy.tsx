import React from 'react';
import { Alert } from '@itwin/itwinui-react';
import 'cypress-axe';

describe('Alert', () => {
  it('is a11y compliant', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Alert type='informational' style={{ minWidth: 'min(100%, 350px)' }}>
        <Alert.Icon />
        <Alert.Message>
          This is an informational alert
          <Alert.Action onClick={() => console.log('Clicked more info!')}>
            Learn more
          </Alert.Action>
        </Alert.Message>
        <Alert.CloseButton onClick={() => console.log('CLOSED')} />
      </Alert>,
    );
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

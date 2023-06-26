import React from 'react';
import { ExpandableBlock } from '@itwin/itwinui-react';
import 'cypress-axe';

describe('Expandable Block', () => {
  it('is a11y compliant', () => {
    cy.mount(
      <div style={{ width: 'min(100%, 300px)' }}>
        <ExpandableBlock title='Expandable Block'>
          Content in block!
        </ExpandableBlock>
      </div>,
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

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Tabs', () => {
  const storyPath = 'Core/Tabs';
  const tests = [
    'Default Tabs',
    'Borderless Tabs',
    'Pill Tabs',
    'Sublabels And Icons',
    'Vertical',
    'Horizontal Overflow',
    'Vertical Overflow',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.wait(1000); // wait for resize observer to be done
      cy.compareSnapshot(testName);

      if (testName === 'Horizontal Overflow') {
        cy.get('#storybook-root').within(() => {
          cy.get('[role=tab]').last().focus();
        });
        cy.wait(500);
        cy.compareSnapshot(`${testName} (Scroll end)`);

        // cy somehow loses tabs list and does not focus on first element so getting it again.
        cy.focused().blur();
        cy.get('#storybook-root').within(() => {
          cy.get('[role=tab]').first().focus();
        });
        cy.wait(500);
        cy.compareSnapshot(`${testName} (Scroll start)`);
      }
    });
  });
});

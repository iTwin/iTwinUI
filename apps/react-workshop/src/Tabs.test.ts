/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Tabs', () => {
  const storyPath = 'Tabs';
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
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(300);

      cy.wait(1000); // wait for resize observer to be done
      cy.compareSnapshot(testName);

      if (testName === 'Horizontal Overflow') {
        cy.get('#ladle-root').within(() => {
          cy.get('[role=tab]').last().click();
        });
        cy.wait(500);
        cy.compareSnapshot(`${testName} (Scroll end)`);

        // cy somehow loses tabs list and does not focus on first element so getting it again.
        cy.focused().blur();
        cy.get('#ladle-root').within(() => {
          cy.get('[role=tab]').first().click();
        });
        cy.wait(500);
        cy.compareSnapshot(`${testName} (Scroll start)`);
      }
    });
  });
});

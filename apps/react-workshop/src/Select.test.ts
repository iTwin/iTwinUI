/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Select', () => {
  const storyPath = 'Select';
  const tests = [
    'Basic',
    'Custom',
    'Disabled',
    'Disabled With Selected Value',
    'Many Items',
    'Multi',
    'Multi Custom Renderer',
    'Sublabels',
    'Truncate Middle Text',
    'With Icons',
    'With Selected Value',
    'Native',
    'Borderless',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });

      if (
        testName.includes('Disabled') ||
        testName === 'Native' ||
        testName === 'Borderless'
      ) {
        cy.compareSnapshot(testName);
        return;
      }

      if (testName.includes('With Selected Value')) {
        cy.compareSnapshot(`${testName} (Open)`);
        return;
      }

      cy.compareSnapshot(`${testName} (Closed)`);
      cy.get('[role=combobox]').click();
      cy.compareSnapshot(`${testName} (Open)`);

      if (testName.includes('Multi')) {
        cy.get('[role=option]').first().click();
        cy.get('[role=option]').eq(1).click();
        cy.compareSnapshot(`${testName} (Multi selected)`);
      }

      if (testName === 'Custom') {
        cy.get('[role=option]').first().click();
        cy.compareSnapshot(`${testName} (Closed With Value)`);
      }
    });
  });
});

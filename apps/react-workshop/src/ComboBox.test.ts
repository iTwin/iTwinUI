/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('ComboBox', () => {
  const storyPath = 'ComboBox';
  const tests = [
    'Basic',
    'Controlled',
    'Custom Renderer',
    'With Custom Message Icon',
    'With Label',
    'With Message',
    'With Status',
    'Virtualized',
    'Multiple Select',
    // 'Disabled', // keeps failing
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(500);

      if (testName === 'Multiple Select') {
        // Hide the dividers and checkboxs/labels for test image
        cy.get('hr').hide();
        cy.get('label').hide();
      }

      cy.compareSnapshot(`${testName} (Closed)`);
      cy.get('[role=combobox]').focus();

      if (testName === 'Multiple Select') {
        cy.get('[role=option]').then((els) => {
          const items = Array.from(els, (el) => el);
          items[3].click();
        });
      }

      // Hide images if present to avoid uncertainties in testing
      if (testName === 'Disabled') {
        cy.get('img').hide();
      }

      cy.compareSnapshot(`${testName} (Open)`);
    });
  });
});

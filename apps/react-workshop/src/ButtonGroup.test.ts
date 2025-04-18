/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('ButtonGroup', () => {
  const storyPath = 'ButtonGroup';
  const tests = [
    'With Icons',
    'Overflow',
    'Vertical',
    'Vertical Overflow',
    'Input Button Combo',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(500); // TODO: Investigate

      if (testName.includes('Overflow')) {
        cy.get('small').hide();
        cy.viewport(800, 600);
      }

      cy.compareSnapshot(testName);
    });
  });
});

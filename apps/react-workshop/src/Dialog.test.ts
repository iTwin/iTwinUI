/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Dialog', () => {
  const storyPath = 'Dialog';
  const tests = [
    'Basic',
    'Modal',
    'Draggable And Resizable',
    'Draggable Relative To Container',
    'Placement',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(500);

      cy.get('#ladle-root').within(() => {
        cy.get('button').first().click();
      });
      cy.compareSnapshot(testName);
    });
  });
});

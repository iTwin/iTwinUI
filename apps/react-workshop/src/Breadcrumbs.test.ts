/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Breadcrumbs', () => {
  const storyPath = 'Breadcrumbs';
  const tests = [
    'Basic',
    'Custom Separator',
    'Folder Navigation',
    'Links',
    'Overflow',
    'Custom Overflow Dropdown',
    'Custom Overflow Back Button',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(500);

      if (testName.includes('Overflow')) {
        cy.get('small').hide();
      }

      if (testName === 'Custom Overflow Dropdown') {
        cy.get('button').eq(1).click();
      } else if (testName === 'Custom Overflow Back Button') {
        cy.get('button').eq(1).trigger('mouseenter');
        cy.wait(100);
      }

      cy.compareSnapshot(testName);
    });
  });
});

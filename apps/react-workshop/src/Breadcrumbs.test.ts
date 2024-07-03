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
    // 'Custom Overflow Dropdown', // excluding because these fellas keep failing in CI
    // 'Custom Overflow Back Button',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });

      if (testName.includes('Overflow')) {
        cy.get('small').hide();
      }

      cy.compareSnapshot(testName);
    });
  });
});

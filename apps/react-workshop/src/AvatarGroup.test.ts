/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('AvatarGroup', () => {
  const storyPath = 'AvatarGroup';
  const tests = [
    'Basic',
    'Animated',
    'Many Avatars',
    'Non Stacked',
    'With Tooltip',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(500); // TODO: Investigate

      if (testName.includes('Tooltip')) {
        cy.get('div').contains('3').trigger('mouseenter');
        cy.wait(100);
      }

      cy.compareSnapshot(testName);
    });
  });
});

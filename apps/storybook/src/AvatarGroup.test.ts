/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('AvatarGroup', () => {
  const storyPath = 'Core/AvatarGroup';
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
      cy.visit('iframe', { qs: { id } });

      if (testName.includes('Tooltip')) {
        cy.get('abbr').contains('3').parent().trigger('mouseenter');
      }

      cy.compareSnapshot(testName);
    });
  });
});

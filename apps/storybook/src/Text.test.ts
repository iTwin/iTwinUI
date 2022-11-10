/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Text', () => {
  const storyPath = 'Typography/Text';
  const tests = [
    'Basic',
    'Body',
    'Small',
    'Leading',
    'Subheading',
    'Title',
    'Headline',
    'Polymorphic',
    'Skeleton',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.compareSnapshot(testName);
    });
  });
});

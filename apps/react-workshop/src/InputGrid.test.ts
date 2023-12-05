/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('InputGrid', () => {
  const storyPath = 'InputGrid';

  const tests = [
    'With Input',
    'With Input With Decorations',
    'With Select',
    'With Search',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.compareSnapshot(testName);
    });
  });
});

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('LabeledInput', () => {
  const storyPath = 'LabeledInput';
  const tests = [
    'Basic',
    'Disabled',
    'Inline',
    'Hybrid Layout',
    'Negative',
    'Positive',
    'Warning',
    'With Custom Icon',

    // Used to test that status color is applied to the svg icon too.
    'With Svg Icon',

    'With Message',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(500);

      cy.compareSnapshot(testName);
    });
  });

  // To also test that the correct status outline is applied
  ['Positive', 'Warning', 'Negative'].forEach((testName) => {
    const newTestName = `${testName} - Focused`;

    it(newTestName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(500);

      // Click the input to show the status outline
      cy.get('input').first().click();

      cy.compareSnapshot(newTestName);
    });
  });
});

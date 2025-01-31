/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('ToggleSwitch', () => {
  const storyPath = 'ToggleSwitch';
  const tests = [
    'Basic',
    'Small',
    'Disabled Checked',
    'Disabled Unchecked',
    'Label Left',
    'Label Right',
    'With Custom Icon',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(300);

      cy.compareSnapshot(testName);
    });
  });
});

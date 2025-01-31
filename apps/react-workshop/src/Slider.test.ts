/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Slider', () => {
  const storyPath = 'Slider';
  const tests = [
    'Basic',
    'Custom Tick No Tooltip',
    'Custom Tooltip',
    'Decimal Increment',
    'Disabled',
    'Multi Thumbs Allow Crossing',
    'Range',
    'With Custom Thumb',
    'Vertical',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(300);

      if (testName === 'Custom Tooltip') {
        cy.get('[role=slider').focus();
      }
      cy.compareSnapshot(testName);
    });
  });
});

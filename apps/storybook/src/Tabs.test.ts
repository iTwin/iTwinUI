/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Tabs', () => {
  const storyPath = 'Core/Tabs';
  const tests = [
    'Default Tabs',
    'Borderless Tabs',
    'Pill Tabs',
    'Sublabels And Icons',
    'Vertical',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.wait(1000); // wait for resize observer to be done
      cy.compareSnapshot(testName);
    });
  });
});

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Kbd', () => {
  const storyPath = 'Typography/Keyboard Key';
  const tests = ['Basic', 'Predefined Key'];

  tests.forEach((testName) => {
    const id = `${storyPath
      .replace('/', '-')
      .replace(' ', '-')
      .toLowerCase()}--${testName.replaceAll(' ', '-').toLowerCase()}`;

    it(testName, () => {
      cy.visit('iframe', { qs: { id } });
      cy.compareSnapshot(testName);
    });
  });
});

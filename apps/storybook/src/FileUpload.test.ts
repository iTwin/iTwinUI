/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('FileUpload', () => {
  const storyPath = 'Core/FileUpload';
  const tests = [
    'Default',
    'Wrapping Input',
    'Single File Upload',
    'Single File Upload Custom',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.compareSnapshot(testName);
      if (
        testName === 'Single File Upload' ||
        testName === 'Single File Upload Custom'
      ) {
        cy.get('.iui-visually-hidden').selectFile(
          {
            contents: Cypress.Buffer.from('file contents'),
            fileName: 'file.txt',
            mimeType: 'text/plain',
            lastModified: new Date(2023).valueOf(),
          },
          { force: true },
        );
        cy.compareSnapshot(`${testName} (Uploaded)`);
      }
    });
  });
});

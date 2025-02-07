/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('FileUpload', () => {
  const storyPath = 'FileUpload';
  const tests = [
    'Wrapping Input',
    'Default File Upload Card',
    'Custom File Upload Card',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(500); // TODO: Investigate

      cy.compareSnapshot(testName);
      if (
        testName === 'Default File Upload Card' ||
        testName === 'Custom File Upload Card'
      ) {
        cy.get('input').selectFile(
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

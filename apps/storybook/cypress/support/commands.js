/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Adds the compareSnapshot command
require('cypress-image-diff-js/dist/command')();

Cypress.Commands.add('hide', { prevSubject: 'optional' }, (subject) => {
  return cy.get(subject).invoke('attr', 'style', `visibility: hidden;`);
});

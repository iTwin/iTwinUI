/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { RecurseDefaults } from 'cypress-recurse';

/// <reference types="cypress" />
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * @param name The name of the snapshots that will be generated
       * @param testThreshold @default 0 A number between 0 and 1 that represents the allowed percentage of pixels that can be different between the two snapshots
       * @param retryOptions @default { limit: 0, timeout: Cypress.config('defaultCommandTimeout'), delay: Cypress.config('defaultCommandTimeout') / 5 }
       * @example cy.compareSnapshot('empty-canvas', 0.1)
       */
      compareSnapshot(
        name: string,
        testThreshold?: number,
        retryOptions?: typeof RecurseDefaults,
      ): Chainable<Element>;

      /**
       * Hides the element by setting `visibility: hidden`.
       */
      hide(): Cypress.Chainable<Element>;
    }

    interface Cypress {
      /**
       * Helper function to get the story id from its base path and name.
       */
      storyId(storyPath: string, storyName: string): string;
    }
  }
}

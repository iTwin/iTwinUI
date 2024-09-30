/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

// @ts-expect-error -- jest is not used in iTwinUI but may be used in consuming apps
const isJest = typeof jest !== 'undefined';

const isCypress = typeof (globalThis as any).Cypress !== 'undefined';
const isMocha =
  typeof (globalThis as any).beforeEach !== 'undefined' &&
  `${(globalThis as any).beforeEach}`.replace(/\s/g, '') ===
    'function(name,fn){suites[0].beforeEach(name,fn);}' &&
  !isCypress;
const isVitest = typeof (globalThis as any).__vitest_index__ !== 'undefined';

const isUnitTest = isJest || isVitest || isMocha;

export { isUnitTest };

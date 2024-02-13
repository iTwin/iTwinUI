/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import '@testing-library/jest-dom/vitest';

window.HTMLElement.prototype.scrollIntoView = () => {};
window.HTMLElement.prototype.scrollTo = () => {};
window.HTMLElement.prototype.inert = false;

if (window.PointerEvent) {
  console.error('ERROR: patching PointerEvent is no longer necessary');
} else {
  // @ts-expect-error // eslint-disable-line @typescript-eslint/ban-ts-comment
  window.PointerEvent = window.MouseEvent;
}

vi.mock('./src/core/utils/hooks/useGlobals.js', () => {
  return {
    // noop because we don't want to spam the terminal with warnings during tests
    useGlobals: () => {},
  };
});

afterEach(() => {
  vi.useRealTimers();
});

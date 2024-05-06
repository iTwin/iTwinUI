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

vi.mock('./src/utils/hooks/useGlobals.js', () => {
  return {
    // noop because we don't want to spam the terminal with warnings during tests
    useGlobals: () => {},
  };
});

vi.mock('@testing-library/react', async () => {
  const originalRtl = await vi.importActual<
    typeof import('@testing-library/react')
  >('@testing-library/react');

  return {
    ...originalRtl,
    /**
     * Wrapper over `@testing-library/react`'s `render()` that also waits for all
     * microtasks to be flushed. This is necessary for ShadowRoot to be tested properly.
     */
    render: (...args: Parameters<typeof originalRtl.render>) => {
      if (!vi.isFakeTimers()) {
        vi.useFakeTimers({ toFake: ['queueMicrotask'] });
      }
      const result = originalRtl.render(...args);
      originalRtl.act(() => vi.runAllTicks());
      return result;
    },
  };
});

afterEach(() => {
  vi.useRealTimers();
});

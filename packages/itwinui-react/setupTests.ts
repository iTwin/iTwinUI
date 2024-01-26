/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import '@testing-library/jest-dom/vitest';
import { TextEncoder } from 'util';

window.HTMLElement.prototype.scrollIntoView = () => {};
window.HTMLElement.prototype.scrollTo = () => {};
window.HTMLElement.prototype.inert = false;

if (window.PointerEvent) {
  console.error('ERROR: patching PointerEvent is no longer necessary');
} else {
  // @ts-expect-error // eslint-disable-line @typescript-eslint/ban-ts-comment
  window.PointerEvent = window.MouseEvent;
}

global.TextEncoder = TextEncoder;

vi.mock('./src/styles.js', () => {
  return {
    default: new Proxy(
      {},
      {
        get: (target, prop) => {
          // instead of returning scoped css modules, we will preserve the original classes
          if (typeof prop === 'string' && prop.startsWith('iui')) {
            return prop;
          }
          return Reflect.get(target, prop);
        },
      },
    ),
  };
});

vi.mock('./src/useGlobals.js', () => {
  return {
    // noop because we don't want to spam the terminal with warnings during tests
    useGlobals: () => {},
  };
});

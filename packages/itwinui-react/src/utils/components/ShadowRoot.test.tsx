/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render, act } from '@testing-library/react';
import { ShadowRoot } from './ShadowRoot.js';

it('works', async () => {
  vi.useFakeTimers({ toFake: ['queueMicrotask'] });

  const { container } = render(
    <div>
      <ShadowRoot>
        <button>hello</button>
      </ShadowRoot>
    </div>,
  );

  act(() => vi.runAllTicks());

  const host = container.querySelector('div');
  expect(host?.shadowRoot).toBeTruthy();
  expect(host?.shadowRoot?.querySelector('button')).toBeTruthy();
});

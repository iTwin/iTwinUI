/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, act } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import { ShadowRoot } from './ShadowRoot.js';
import { ProgressRadial } from '../../core/ProgressIndicators/ProgressRadial.js';

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

it('should not exceed maximum update depth when many ShadowRoots mount at once', async () => {
  // Outside `act`, React schedules work as it would in an app.
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', false);

  const errors: unknown[] = [];
  const originalQueueMicrotask = globalThis.queueMicrotask;
  vi.stubGlobal('queueMicrotask', (callback: () => void) =>
    originalQueueMicrotask(() => {
      try {
        callback();
      } catch (error) {
        errors.push(error);
      }
    }),
  );

  // ProgressRadial's flush mounts a VisuallyHidden whose effects schedule another update.
  const count = 100;
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(
    <>
      {Array.from({ length: count }, (_, index) => (
        <ProgressRadial key={index} indeterminate />
      ))}
    </>,
  );

  try {
    await vi.waitFor(() => {
      const hosts = container.querySelectorAll(
        '.iui-progress-indicator-radial',
      );
      expect(hosts).toHaveLength(count);
      hosts.forEach((host) => {
        const visuallyHidden = host.shadowRoot?.querySelector(
          '.iui-visually-hidden',
        );
        expect(visuallyHidden?.shadowRoot?.querySelector('slot')).toBeTruthy();
      });
    });

    expect(errors).toEqual([]);
  } finally {
    root.unmount();
    container.remove();
    vi.unstubAllGlobals();
  }
});

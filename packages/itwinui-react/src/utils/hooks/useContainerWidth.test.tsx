/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useContainerWidth } from './useContainerWidth.js';
import * as UseResizeObserver from './useResizeObserver.js';
import { act, renderHook } from '@testing-library/react';

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

const renderHookComponent = (watchResizes = true) => {
  const hook = renderHook(() => useContainerWidth(watchResizes));
  const element = document.createElement('div');
  Object.defineProperties(element, {
    getBoundingClientRect: { value: () => ({ width: 100 }) },
  });
  act(() => {
    hook.result.current[0](element);
  });
  return hook;
};

it('should set initial size', () => {
  const { result } = renderHookComponent();
  expect(result.current[1]).toEqual(100);
});

it('should update value when resized', () => {
  let triggerResize: (size: DOMRectReadOnly) => void = vi.fn();
  vi.spyOn(UseResizeObserver, 'useResizeObserver').mockImplementation(
    (onResize) => {
      triggerResize = onResize;
      return [vi.fn(), { disconnect: vi.fn() } as unknown as ResizeObserver];
    },
  );
  const { result } = renderHookComponent();

  expect(result.current[1]).toEqual(100);

  act(() => triggerResize({ width: 125 } as DOMRect));
  expect(result.current[1]).toEqual(125);

  act(() => triggerResize({ width: 150 } as DOMRect));
  expect(result.current[1]).toEqual(150);
});

it('should not update value when resized if disabled', () => {
  let triggerResize: (size: DOMRectReadOnly) => void = vi.fn();
  const disconnect = vi.fn(() => {
    triggerResize = vi.fn();
  });
  vi.spyOn(UseResizeObserver, 'useResizeObserver').mockImplementation(
    (onResize) => {
      triggerResize = onResize;
      return [vi.fn(), { disconnect } as unknown as ResizeObserver];
    },
  );
  const { result } = renderHookComponent(false);

  expect(result.current[1]).toEqual(100);

  act(() => triggerResize({ width: 125 } as DOMRect));
  expect(result.current[1]).toEqual(100);
  expect(disconnect).toHaveBeenCalled();
});

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { act, renderHook } from '@testing-library/react';
import { useResizeObserver } from './useResizeObserver.js';

const observe = vi.fn();
const disconnect = vi.fn();

/** gets set when ResizeObserver.observe is called */
let resizeCallback: (entries: { contentRect: Partial<DOMRect> }[]) => void;

/** calls resizeCallback with new dimensions */
const triggerResize = (e: Partial<DOMRect>) => {
  resizeCallback([{ contentRect: e }]);
};

beforeAll(() => {
  window.ResizeObserver = vi.fn((cb) => ({
    disconnect,
    unobserve: vi.fn(),
    observe: (el) => {
      // @ts-expect-error: Only testing contentRect from the callback
      resizeCallback = cb;
      observe(el);
    },
  }));
});

beforeEach(() => {
  vi.clearAllMocks();
});

const renderResizeObserver = ({
  onResize = vi.fn(),
  initialSize = { width: 50, height: 50 },
} = {}) => {
  const hook = renderHook(() => useResizeObserver(onResize));
  const element: HTMLDivElement = document.createElement('div');
  Object.defineProperties(element, {
    getBoundingClientRect: { value: () => initialSize },
  });
  act(() => {
    hook.result.current[0](element);
  });

  return { hook, element };
};

it('should initialize ResizeObserver correctly', () => {
  const mockSize = { width: 100, height: 100 };
  const { element } = renderResizeObserver({ initialSize: mockSize });
  expect(observe).toHaveBeenCalledWith(element);
  expect(element.getBoundingClientRect()).toMatchObject(mockSize);
});

it('should call onResize when element resizes', async () => {
  const onResizeMock = vi.fn();
  renderResizeObserver({ onResize: onResizeMock });
  expect(onResizeMock).not.toHaveBeenCalled();

  const newSize = { width: 101, height: 101 };
  act(() => triggerResize(newSize));

  // Wait for one frame
  await new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve(null);
    });
  });

  expect(onResizeMock).toHaveBeenCalledWith(newSize);
});

it('should not observe if element is null', () => {
  const { result } = renderHook(() => useResizeObserver(vi.fn()));
  act(() => result.current[0](null));
  expect(observe).not.toHaveBeenCalled();
});

it('should disconnect if element becomes null later', () => {
  const { hook } = renderResizeObserver();
  expect(observe).toHaveBeenCalled();
  expect(disconnect).not.toHaveBeenCalled();

  act(() => hook.result.current[0](null));
  expect(disconnect).toHaveBeenCalled();
});

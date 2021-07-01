/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { act, renderHook } from '@testing-library/react-hooks';
import { useResizeObserver } from './useResizeObserver';

const observe = jest.fn();
const disconnect = jest.fn();

/** gets set when ResizeObserver.observe is called */
let resizeCallback: (entries: { contentRect: Partial<DOMRect> }[]) => void;

/** calls resizeCallback with new dimensions */
const triggerResize = (e: Partial<DOMRect>) => {
  resizeCallback([{ contentRect: e }]);
};

beforeAll(() => {
  window.ResizeObserver = jest.fn((cb) => ({
    disconnect,
    unobserve: jest.fn(),
    observe: (el) => {
      // @ts-expect-error: Only testing contentRect from the callback
      resizeCallback = cb;
      observe(el);
    },
  }));
});

beforeEach(() => {
  jest.clearAllMocks();
});

const renderResizeObserver = (size = { width: 50, height: 50 }) => {
  const element: HTMLDivElement = document.createElement('div');
  Object.defineProperties(element, {
    getBoundingClientRect: { value: () => size },
  });
  const ref = { current: element };

  return renderHook(() => useResizeObserver(ref));
};

it('should initialize ResizeObserver correctly', () => {
  const mockSize = { width: 100, height: 100 };
  const { result } = renderResizeObserver(mockSize);
  expect(result.current).toMatchObject(mockSize);
  expect(observe).toHaveBeenCalled();
});

it('should return updated size when element resizes', () => {
  const { result } = renderResizeObserver();
  expect(result.current).toMatchObject({ width: 50, height: 50 });

  const newSize = { width: 101, height: 101 };
  act(() => triggerResize(newSize));
  expect(result.current).toMatchObject(newSize);
});

it('should not observe if elementRef is null', () => {
  renderHook(() => useResizeObserver({ current: null }));
  expect(observe).not.toHaveBeenCalled();
});

it('should disconnect if elementRef becomes null later', () => {
  const element: HTMLDivElement = document.createElement('div');
  const { rerender } = renderHook((r) => useResizeObserver(r), {
    initialProps: { current: element } as React.RefObject<HTMLDivElement>,
  });
  expect(observe).toHaveBeenCalledWith(element);

  rerender({ current: null });
  expect(disconnect).toHaveBeenCalled();
});

it('should disconnect before unmounting', () => {
  const { unmount } = renderResizeObserver();
  expect(disconnect).not.toHaveBeenCalled();
  unmount();
  expect(disconnect).toHaveBeenCalled();
});

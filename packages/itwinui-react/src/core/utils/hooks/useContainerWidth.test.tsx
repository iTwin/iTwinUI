/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useContainerWidth } from './useContainerWidth';
import * as UseResizeObserver from './useResizeObserver';
import { act, renderHook } from '@testing-library/react';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
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
  let triggerResize: (size: DOMRectReadOnly) => void = jest.fn();
  jest
    .spyOn(UseResizeObserver, 'useResizeObserver')
    .mockImplementation((onResize) => {
      triggerResize = onResize;
      return [
        jest.fn(),
        { disconnect: jest.fn() } as unknown as ResizeObserver,
      ];
    });
  const { result } = renderHookComponent();

  expect(result.current[1]).toEqual(100);

  act(() => triggerResize({ width: 125 } as DOMRect));
  expect(result.current[1]).toEqual(125);

  act(() => triggerResize({ width: 150 } as DOMRect));
  expect(result.current[1]).toEqual(150);
});

it('should not update value when resized if disabled', () => {
  let triggerResize: (size: DOMRectReadOnly) => void = jest.fn();
  const disconnect = jest.fn(() => {
    triggerResize = jest.fn();
  });
  jest
    .spyOn(UseResizeObserver, 'useResizeObserver')
    .mockImplementation((onResize) => {
      triggerResize = onResize;
      return [jest.fn(), { disconnect } as unknown as ResizeObserver];
    });
  const { result } = renderHookComponent(false);

  expect(result.current[1]).toEqual(100);

  act(() => triggerResize({ width: 125 } as DOMRect));
  expect(result.current[1]).toEqual(100);
  expect(disconnect).toHaveBeenCalled();
});

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, renderHook } from '@testing-library/react';
import { useIntersection } from './useIntersection';

const observers = new Map<
  Element,
  (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void
>();

const originalIntersectionObserver = window.IntersectionObserver;

const mockIntersection = (element: Element, isIntersecting = true) => {
  observers.get(element)?.([{ isIntersecting } as IntersectionObserverEntry], {
    disconnect: () => observers.delete(element),
  } as unknown as IntersectionObserver);
};

const mockedDisconnect = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  observers.clear();
  window.IntersectionObserver = jest.fn(
    (callback: IntersectionObserverCallback) => {
      return {
        observe: (el: Element) => observers.set(el, callback),
        disconnect: mockedDisconnect,
      } as unknown as IntersectionObserver;
    },
  );
});

afterAll(() => {
  window.IntersectionObserver = originalIntersectionObserver;
});

it('should create IntersectionObserver with options', () => {
  const mockedElement = {} as HTMLElement;
  const mockedRootElement = {} as HTMLElement;
  const onIntersect = jest.fn();
  const { result } = renderHook(() =>
    useIntersection(onIntersect, {
      root: mockedRootElement,
      rootMargin: '100px',
      threshold: 0.5,
    }),
  );

  act(() => {
    result.current(mockedElement);
  });

  expect(IntersectionObserver).toHaveBeenCalledWith(
    expect.any(Function),
    expect.objectContaining({
      root: mockedRootElement,
      rootMargin: '100px',
      threshold: 0.5,
    }),
  );
});

it('should trigger onIntersect', () => {
  const mockedElement = {} as HTMLElement;
  const onIntersect = jest.fn();
  const { result } = renderHook(() => useIntersection(onIntersect));

  act(() => {
    result.current(mockedElement);
  });

  expect(onIntersect).not.toHaveBeenCalled();
  mockIntersection(mockedElement);
  expect(onIntersect).toHaveBeenCalledTimes(1);
});

it('should trigger onIntersect when element ref changes', () => {
  const mockedElement1 = {} as HTMLElement;
  const mockedElement2 = {} as HTMLElement;
  const onIntersect = jest.fn();
  const { result } = renderHook(() => useIntersection(onIntersect));

  act(() => {
    result.current(mockedElement1);
  });
  expect(onIntersect).not.toHaveBeenCalled();
  expect(mockedDisconnect).not.toHaveBeenCalled();

  act(() => {
    result.current(mockedElement2);
  });
  expect(mockedDisconnect).toHaveBeenCalled();
  mockIntersection(mockedElement2);
  expect(onIntersect).toHaveBeenCalledTimes(1);
});

it('should not trigger onIntersect when entry is not intersecting', () => {
  const mockedElement = {} as HTMLElement;
  const onIntersect = jest.fn();
  const { result } = renderHook(() => useIntersection(onIntersect));

  act(() => {
    result.current(mockedElement);
  });

  expect(onIntersect).not.toHaveBeenCalled();
  mockIntersection(mockedElement, false);
  expect(onIntersect).not.toHaveBeenCalled();
});

it('should do nothing when IntersectionObserver is missing', () => {
  (window.IntersectionObserver as unknown) = undefined;
  const mockedElement = {} as HTMLElement;
  const onIntersect = jest.fn();
  const { result } = renderHook(() => useIntersection(onIntersect));

  act(() => {
    result.current(mockedElement);
  });
  expect(onIntersect).not.toHaveBeenCalled();
  mockIntersection(mockedElement);
  expect(onIntersect).not.toHaveBeenCalled();
});

it('should do nothing when element is missing', () => {
  (window.IntersectionObserver as unknown) = undefined;
  const onIntersect = jest.fn();
  const { result } = renderHook(() => useIntersection(onIntersect));

  act(() => {
    result.current(null);
  });
  expect(onIntersect).not.toHaveBeenCalled();
});

it.each([
  ['not', true],
  ['', false],
])(
  'should %s trigger onIntersect more than once if `once` is %s',
  (_, once) => {
    const mockedElement = {} as HTMLElement;
    const onIntersect = jest.fn();
    const { result } = renderHook(() => useIntersection(onIntersect, {}, once));

    act(() => {
      result.current(mockedElement);
    });

    expect(onIntersect).not.toHaveBeenCalled();
    mockIntersection(mockedElement);
    mockIntersection(mockedElement);
    mockIntersection(mockedElement);
    expect(onIntersect).toHaveBeenCalledTimes(once ? 1 : 3);
  },
);

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { renderHook } from '@testing-library/react';
import { useEventListener } from './useEventListener.js';

it('should handle event on Window', () => {
  const mouseClickEvent = new MouseEvent('click', { bubbles: true });
  const handler = vi.fn();
  const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
  renderHook(() => useEventListener('click', handler, document));
  expect(addEventListenerSpy).toBeCalled();
  document.dispatchEvent(mouseClickEvent);
  expect(handler).toHaveBeenCalledWith(mouseClickEvent);
  addEventListenerSpy.mockRestore();
});

it('should handle event on Element', () => {
  const element: HTMLDivElement = document.createElement('div');
  const mouseClickEvent = new MouseEvent('click', { bubbles: true });
  const handler = vi.fn();
  const addEventListenerSpy = vi.spyOn(element, 'addEventListener');
  renderHook(() => useEventListener('click', handler, element));
  expect(addEventListenerSpy).toBeCalled();
  element.dispatchEvent(mouseClickEvent);
  expect(handler).toHaveBeenCalledWith(mouseClickEvent);
  addEventListenerSpy.mockRestore();
});

it('should not re-add listener when handler is changed', () => {
  const element: HTMLDivElement = document.createElement('div');
  const handler1 = vi.fn();
  const handler2 = vi.fn();
  const addEventListenerSpy = vi.spyOn(element, 'addEventListener');
  const { rerender } = renderHook(() =>
    useEventListener('click', handler1, element),
  );
  const numberOfCalls = addEventListenerSpy.mock.calls.length;
  rerender(() => {
    useEventListener('click', handler2, element);
  });
  expect(addEventListenerSpy).toBeCalledTimes(numberOfCalls);
  addEventListenerSpy.mockRestore();
});

it('should do nothing if no element or document is defined', () => {
  const handler = vi.fn();
  const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
  renderHook(() => useEventListener('click', handler, undefined));
  expect(addEventListenerSpy).not.toBeCalled();
  expect(handler).not.toBeCalled();
  addEventListenerSpy.mockRestore();
});

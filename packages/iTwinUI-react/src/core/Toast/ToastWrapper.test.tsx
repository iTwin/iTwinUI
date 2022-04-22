/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { ToastWrapper } from './ToastWrapper';
import { ToastProps } from './Toast';
import { act } from 'react-dom/test-utils';

const mockToastObject1 = {
  category: 'informational',
  content: 'mockText1',
  id: 1,
  isVisible: true,
  hasCloseButton: true,
} as ToastProps;

const mockToastObject2 = {
  category: 'negative',
  content: 'mockText2',
  id: 2,
  isVisible: true,
} as ToastProps;

it('should render toasts', () => {
  const { container } = render(
    <ToastWrapper toasts={[mockToastObject1, mockToastObject2]} />,
  );

  expect(container.querySelector('.iui-toast-wrapper')).toBeTruthy();

  const toasts = container.querySelectorAll('.iui-toast');
  expect(toasts.length).toBe(2);
  expect(toasts.item(0).classList).toContain('iui-informational');
  expect(toasts.item(0).textContent).toBe('mockText1');
  expect(toasts.item(1).classList).toContain('iui-negative');
  expect(toasts.item(1).textContent).toBe('mockText2');
});

it('should remove toast with close icon click', () => {
  jest.useFakeTimers();
  const { container } = render(
    <ToastWrapper toasts={[mockToastObject1, mockToastObject2]} />,
  );

  expect(container.querySelector('.iui-toast-wrapper')).toBeTruthy();

  let toasts = container.querySelectorAll('.iui-toast');
  expect(toasts.length).toBe(2);
  act(() => {
    const closeIcon = container.querySelector(
      '.iui-button[aria-label="Close"]',
    ) as HTMLButtonElement;
    closeIcon.click();
  });
  jest.advanceTimersByTime(400);
  toasts = container.querySelectorAll('.iui-toast');
  expect(toasts.length).toBe(1);
  jest.useRealTimers();
});

it('should remove all toasts', () => {
  jest.useFakeTimers();
  const { container, rerender } = render(
    <ToastWrapper toasts={[mockToastObject1, mockToastObject2]} />,
  );

  expect(container.querySelector('.iui-toast-wrapper')).toBeTruthy();

  let toasts = container.querySelectorAll('.iui-toast');
  expect(toasts.length).toBe(2);
  act(() => {
    rerender(<ToastWrapper toasts={[]} />);
  });
  jest.advanceTimersByTime(400);
  toasts = container.querySelectorAll('.iui-toast');
  expect(toasts.length).toBe(0);
  jest.useRealTimers();
});

it.each([
  'top-start',
  'top',
  'top-end',
  'bottom-start',
  'bottom',
  'bottom-end',
] as const)('should change placement to %s', (placement) => {
  const { container } = render(
    <ToastWrapper
      toasts={[mockToastObject1, mockToastObject2]}
      placement={placement}
    />,
  );

  expect(container.querySelector('.iui-toast-wrapper')).toBeTruthy();
  expect(
    container.querySelector('.iui-toast-wrapper') as HTMLElement,
  ).toHaveClass(`iui-placement-${placement}`);
});

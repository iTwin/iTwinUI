/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { act, render } from '@testing-library/react';

import { ToastWrapper, ToastWrapperHandle } from './ToastWrapper';
import { ToastProps } from './Toast';
import userEvent from '@testing-library/user-event';

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

let ref: React.RefObject<ToastWrapperHandle>;

beforeEach(() => {
  ref = React.createRef<ToastWrapperHandle>();
});

it('should render toasts', () => {
  const { container } = render(<ToastWrapper ref={ref} />);
  expect(container.querySelector('.iui-toast-wrapper')).toBeTruthy();

  act(() => {
    ref.current?.setToasts([mockToastObject1, mockToastObject2]);
  });

  const toasts = container.querySelectorAll('.iui-toast');
  expect(toasts.length).toBe(2);
  expect(toasts.item(0).classList).toContain('iui-informational');
  expect(toasts.item(0).textContent).toBe('mockText1');
  expect(toasts.item(1).classList).toContain('iui-negative');
  expect(toasts.item(1).textContent).toBe('mockText2');
});

it('should remove toast with close icon click', async () => {
  jest.useFakeTimers();
  const { container } = render(<ToastWrapper ref={ref} />);
  act(() => {
    ref.current?.setToasts([mockToastObject1, mockToastObject2]);
  });

  expect(container.querySelector('.iui-toast-wrapper')).toBeTruthy();

  let toasts = container.querySelectorAll('.iui-toast');
  expect(toasts.length).toBe(2);
  await act(async () => {
    const closeIcon = container.querySelector(
      '.iui-button[aria-label="Close"]',
    ) as HTMLButtonElement;
    const user = userEvent.setup({ delay: null });
    await user.click(closeIcon);
  });
  act(() => {
    jest.advanceTimersByTime(400);
  });
  toasts = container.querySelectorAll('.iui-toast');
  expect(toasts.length).toBe(1);
  jest.useRealTimers();
});

it('should remove all toasts', () => {
  jest.useFakeTimers();
  const { container } = render(<ToastWrapper ref={ref} />);
  act(() => {
    ref.current?.setToasts([mockToastObject1, mockToastObject2]);
  });
  expect(container.querySelector('.iui-toast-wrapper')).toBeTruthy();

  let toasts = container.querySelectorAll('.iui-toast');
  expect(toasts.length).toBe(2);
  act(() => {
    ref.current?.setToasts([]);
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
  const { container } = render(<ToastWrapper ref={ref} />);

  act(() => {
    ref.current?.setToasts([mockToastObject1, mockToastObject2]);
    ref.current?.setPlacement(placement);
  });

  expect(container.querySelector('.iui-toast-wrapper')).toBeTruthy();
  expect(
    container.querySelector('.iui-toast-wrapper') as HTMLElement,
  ).toHaveClass(`iui-placement-${placement}`);
});

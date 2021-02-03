import React from 'react';
import { render, act } from '@testing-library/react';

import { ToastMaster, ToastSettings } from './ToastMaster';

const mockToastObject1 = {
  category: 'informational',
  duration: 7000,
  hasCloseButton: true,
  link: {
    title: 'mockTitle',
    onClick: () => {},
  },
  content: 'mockText',
  type: 'persisting',
} as ToastSettings;

const mockToastObject2 = {
  category: 'negative',
  link: {
    title: 'mockTitle',
    onClick: () => {},
  },
  content: 'mockText2',
  type: 'temporary',
} as ToastSettings;

it('should add two toasts and then close them', () => {
  jest.useFakeTimers();

  let addToast: (settings: ToastSettings) => void;
  let closeAll: () => void;
  const { container } = render(
    <ToastMaster
      addToastHandler={(handler) => (addToast = handler)}
      closeAllHandler={(handler) => (closeAll = handler)}
    />,
  );

  expect(container.querySelector('.iui-toast-wrapper')).toBeTruthy();

  act(() => {
    addToast(mockToastObject1);
  });
  act(() => {
    addToast(mockToastObject2);
  });
  expect(container.querySelector('.iui-toast-negative')).toBeTruthy();
  expect(container.querySelector('.iui-toast-informational')).toBeTruthy();

  act(() => {
    closeAll();
  });
  jest.runAllTimers();
  expect(container.querySelectorAll('.iui-toast-all').length).toBe(0);

  jest.useRealTimers();
});

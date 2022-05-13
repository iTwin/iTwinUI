/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act } from '@testing-library/react';
import toaster from '.';
import { ToastCategory, ToastProps } from './Toast';
import { ToastOptions } from './Toaster';

const mockOnClick = jest.fn();

function mockedOptions(): ToastOptions {
  return {
    duration: 2000,
    hasCloseButton: true,
    type: 'temporary',
    link: {
      title: 'mockTitle',
      onClick: mockOnClick,
    },
  };
}

function assertAddedToast(
  toast: ToastProps,
  category: ToastCategory,
  content: string,
  id: number,
  options = mockedOptions(),
) {
  expect(toast).toEqual(
    expect.objectContaining({
      ...options,
      id: id,
      content: content,
      isVisible: true,
      category: category,
    }),
  );
}

function assertRemovedToast(
  toast: ToastProps,
  category: ToastCategory,
  content: string,
  id: number,
  options = mockedOptions(),
) {
  expect(toast).toEqual(
    expect.objectContaining({
      ...options,
      id: id,
      content: content,
      isVisible: false,
      category: category,
    }),
  );
}

afterEach(() => {
  toaster['toasts'] = [];
  toaster['lastId'] = 0;
  jest.clearAllMocks();
});

it('should add toast with success', () => {
  act(() => {
    toaster.positive('mockContent', mockedOptions());
  });
  expect(toaster['toasts'].length).toBe(1);
  assertAddedToast(toaster['toasts'][0], 'positive', 'mockContent', 1);
});

it('should add toast with negative', () => {
  act(() => {
    toaster.negative('mockContent', mockedOptions());
  });
  assertAddedToast(toaster['toasts'][0], 'negative', 'mockContent', 1);
});

it('should add toast with informational', () => {
  act(() => {
    toaster.informational('mockContent', mockedOptions());
  });
  assertAddedToast(toaster['toasts'][0], 'informational', 'mockContent', 1);
});

it('should add toast with warning', () => {
  act(() => {
    toaster.warning('mockContent', mockedOptions());
  });
  assertAddedToast(toaster['toasts'][0], 'warning', 'mockContent', 1);
});

it('should add toasts and remove all', () => {
  act(() => {
    toaster.informational('mockContent', mockedOptions());
  });
  assertAddedToast(toaster['toasts'][0], 'informational', 'mockContent', 1);

  act(() => {
    toaster.positive('mockContent', mockedOptions());
  });
  assertAddedToast(toaster['toasts'][0], 'positive', 'mockContent', 2);

  act(() => {
    toaster.closeAll();
  });
  assertRemovedToast(toaster['toasts'][1], 'informational', 'mockContent', 1);
  assertRemovedToast(toaster['toasts'][0], 'positive', 'mockContent', 2);

  expect(
    document.querySelector('.iui-toast-wrapper.iui-placement-top'),
  ).toBeTruthy();
});

it('should add toast and remove using return function', () => {
  let close: () => void = () => {};
  act(() => {
    ({ close } = toaster.informational('mockContent', {
      ...mockedOptions(),
      type: 'persisting',
    }));
  });
  assertAddedToast(
    toaster['toasts'][0],
    'informational',
    'mockContent',

    1,
    {
      ...mockedOptions(),
      type: 'persisting',
    },
  );

  act(() => {
    close();
  });
  assertRemovedToast(
    toaster['toasts'][0],
    'informational',
    'mockContent',

    1,
    {
      ...mockedOptions(),
      type: 'persisting',
    },
  );

  expect(
    document.querySelector('.iui-toast-wrapper.iui-placement-top'),
  ).toBeTruthy();
});

it('should change order to bottom to top', () => {
  act(() => {
    toaster.setSettings({ placement: 'top', order: 'ascending' });
    toaster.informational('mockContent', mockedOptions());
  });
  assertAddedToast(toaster['toasts'][0], 'informational', 'mockContent', 1);

  act(() => {
    toaster.positive('mockContent', mockedOptions());
  });
  assertAddedToast(toaster['toasts'][1], 'positive', 'mockContent', 2);
});

it.each([
  'top-start',
  'top',
  'top-end',
  'bottom-start',
  'bottom',
  'bottom-end',
] as const)('should change placement to %s', (placement) => {
  act(() => {
    toaster.setSettings({
      placement: placement,
    });
    toaster.informational('mockContent', mockedOptions());
  });
  expect(document.querySelector('.iui-toast-wrapper')).toHaveClass(
    `iui-placement-${placement}`,
  );
});

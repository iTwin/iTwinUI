/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { ToastCategory, ToastProps } from './Toast';
import Toaster, { ToastOptions } from './Toaster';

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

let toaster: Toaster;

beforeEach(() => {
  toaster = new Toaster();
});

afterEach(() => {
  toaster['toasts'] = [];
  toaster['lastId'] = 0;
  jest.clearAllMocks();
  // This is the only thing I found to help with
  // warning for calling `createRoot` on element, which already had it.
  // Something is not fully reset in tests (this happens between multiple tests, not in single one)
  const container = document.querySelector('#iui-toasts-container');
  if (!!container) {
    container.remove();
  }
});

it.each(['positive', 'negative', 'informational', 'warning'] as const)(
  'should add toast with %s',
  async (status) => {
    act(() => {
      toaster[status]('mockContent', mockedOptions());
    });
    expect(await screen.findByText('mockContent')).toBeInTheDocument();
    expect(toaster['toasts'].length).toBe(1);
    assertAddedToast(toaster['toasts'][0], status, 'mockContent', 1);
  },
);

it('should add toasts and remove all', async () => {
  act(() => {
    toaster.informational('mockContent', mockedOptions());
  });
  expect(await screen.findByText('mockContent')).toBeInTheDocument();
  assertAddedToast(toaster['toasts'][0], 'informational', 'mockContent', 1);

  act(() => {
    toaster.positive('mockContentPositive', mockedOptions());
  });
  expect(await screen.findByText('mockContentPositive')).toBeInTheDocument();
  assertAddedToast(toaster['toasts'][0], 'positive', 'mockContentPositive', 2);

  toaster.closeAll();
  waitForElementToBeRemoved(screen.queryByText('mockContent'));
  assertRemovedToast(toaster['toasts'][1], 'informational', 'mockContent', 1);
  assertRemovedToast(
    toaster['toasts'][0],
    'positive',
    'mockContentPositive',
    2,
  );

  expect(
    document.querySelector('.iui-toast-wrapper.iui-placement-top'),
  ).toBeTruthy();
});

it('should add toast and remove using return function', async () => {
  let close: () => void = () => {};
  act(() => {
    ({ close } = toaster.informational('mockContent', {
      ...mockedOptions(),
      type: 'persisting',
    }));
  });
  expect(await screen.findByText('mockContent')).toBeInTheDocument();
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

  close();
  waitForElementToBeRemoved(screen.queryByText('mockContent'));
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

it('should change order to bottom to top', async () => {
  act(() => {
    toaster.setSettings({ placement: 'top', order: 'ascending' });
  });
  act(() => {
    toaster.informational('mockContent', mockedOptions());
  });
  expect(await screen.findByText('mockContent')).toBeInTheDocument();
  assertAddedToast(toaster['toasts'][0], 'informational', 'mockContent', 1);

  act(() => {
    toaster.positive('mockContentPositive', mockedOptions());
  });
  expect(await screen.findByText('mockContentPositive')).toBeInTheDocument();
  assertAddedToast(toaster['toasts'][1], 'positive', 'mockContentPositive', 2);
});

it.each([
  'top-start',
  'top',
  'top-end',
  'bottom-start',
  'bottom',
  'bottom-end',
] as const)('should change placement to %s', async (placement) => {
  act(() => {
    toaster.setSettings({
      placement: placement,
    });
  });
  act(() => {
    toaster.informational('mockContent', mockedOptions());
  });
  expect(await screen.findByText('mockContent'));
  expect(document.querySelector('.iui-toast-wrapper')).toHaveClass(
    `iui-placement-${placement}`,
  );
});

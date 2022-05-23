/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, screen } from '@testing-library/react';
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
});

it.each(['positive', 'negative', 'informational', 'warning'] as const)(
  'should add toast with %s',
  async (status) => {
    toaster[status]('mockContent', mockedOptions());
    expect(await screen.findByText('mockContent')).toBeInTheDocument();
    expect(toaster['toasts'].length).toBe(1);
    assertAddedToast(toaster['toasts'][0], status, 'mockContent', 1);
  },
);

it('should add toasts and remove all', async () => {
  toaster.informational('mockContent', mockedOptions());
  expect(await screen.findByText('mockContent')).toBeInTheDocument();
  assertAddedToast(toaster['toasts'][0], 'informational', 'mockContent', 1);

  toaster.positive('mockContentPositive', mockedOptions());
  expect(await screen.findByText('mockContentPositive')).toBeInTheDocument();
  assertAddedToast(toaster['toasts'][0], 'positive', 'mockContentPositive', 2);

  act(() => {
    toaster.closeAll();
  });
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
  ({ close } = toaster.informational('mockContent', {
    ...mockedOptions(),
    type: 'persisting',
  }));
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

it('should change order to bottom to top', async () => {
  toaster.setSettings({ placement: 'top', order: 'ascending' });
  toaster.informational('mockContent', mockedOptions());
  expect(await screen.findByText('mockContent')).toBeInTheDocument();
  assertAddedToast(toaster['toasts'][0], 'informational', 'mockContent', 1);

  toaster.positive('mockContentPositive', mockedOptions());
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
  toaster.setSettings({
    placement: placement,
  });
  toaster.informational('mockContent', mockedOptions());
  expect(await screen.findByText('mockContent'));
  expect(document.querySelector('.iui-toast-wrapper')).toHaveClass(
    `iui-placement-${placement}`,
  );
});

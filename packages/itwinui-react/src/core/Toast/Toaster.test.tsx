/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  act,
  fireEvent,
  renderHook,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import type { ToastCategory } from './Toast.js';
import {
  Toaster,
  ToastProvider,
  useToaster,
  type ToastOptions,
} from './Toaster.js';

const mockOnClick = vi.fn();

function toasterContraption() {
  const { result } = renderHook(() => useToaster(), {
    wrapper: ({ children }) => (
      <ToastProvider>
        {children}
        <Toaster />
      </ToastProvider>
    ),
  });
  return () => result.current;
}

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
  content: string,
  status: ToastCategory,
  options: ToastOptions,
) {
  const toast = screen.getByText(content).closest('.iui-toast');
  expect(toast).toBeInTheDocument();
  expect(toast).toHaveClass(`iui-${status}`);

  if (options.link) {
    const link = screen.getByText(options.link.title);
    expect(link).toBeInTheDocument();
    act(() => {
      fireEvent.click(link);
    });
    expect(mockOnClick).toHaveBeenCalled();
  }

  if (options.hasCloseButton) {
    const closeButton = screen.getByRole('button', { name: 'Close' });
    expect(closeButton).toBeInTheDocument();
  }
}

async function assertRemovedToast(content: string) {
  act(() => {
    vi.runAllTimers();
  });
  const maybeToast = screen.queryByText(content);
  if (maybeToast) {
    await waitForElementToBeRemoved(maybeToast);
  }
}

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
  mockOnClick.mockReset();
});

it.each(['positive', 'negative', 'informational', 'warning'] as const)(
  'should add toast with %s',
  (status) => {
    const toaster = toasterContraption();
    act(() => {
      toaster()[status]('mockContent', mockedOptions());
    });
    assertAddedToast('mockContent', status, mockedOptions());
    assertRemovedToast('mockContent');
  },
);

it('should add toasts and remove all', async () => {
  const toaster = toasterContraption();
  const options = {
    ...mockedOptions(),
    link: undefined,
    hasCloseButton: false,
  };
  act(() => {
    toaster().informational('mockContentInfo', options);
  });
  assertAddedToast('mockContentInfo', 'informational', options);

  act(() => {
    toaster().positive('mockContentPositive', options);
  });
  assertAddedToast('mockContentPositive', 'positive', options);

  act(() => {
    toaster().closeAll();
  });
  await assertRemovedToast('mockContentInfo');
  await assertRemovedToast('mockContentPositive');
});

it('should add toast and remove using return function', async () => {
  const toaster = toasterContraption();
  let close = () => {};
  act(() => {
    ({ close } = toaster().informational('mockContent', {
      ...mockedOptions(),
      type: 'persisting',
    }));
  });

  assertAddedToast('mockContent', 'informational', {
    ...mockedOptions(),
    type: 'persisting',
  });

  act(() => close());
  assertRemovedToast('mockContent');
});

it.each([
  ['descending', 'top'],
  ['ascending', 'top'],
  ['auto', 'top'],
  ['auto', 'bottom'],
] as const)(
  'should respect order (%s) and placement (%s)',
  async (order, placement) => {
    const toaster = toasterContraption();
    const options = {
      ...mockedOptions(),
      link: undefined,
      hasCloseButton: false,
    };
    act(() => {
      toaster().setSettings({ placement, order });
    });
    act(() => {
      toaster().informational('mockContentInfo', options);
    });
    act(() => {
      toaster().positive('mockContentPositive', options);
    });
    assertAddedToast('mockContentInfo', 'informational', options);
    assertAddedToast('mockContentPositive', 'positive', options);

    const toasts = screen.getAllByText(/mockContent/);

    if (order === 'descending' || (order === 'auto' && placement === 'top')) {
      expect(toasts[1]).toHaveTextContent('mockContentInfo');
      expect(toasts[0]).toHaveTextContent('mockContentPositive');
    } else {
      expect(toasts[0]).toHaveTextContent('mockContentInfo');
      expect(toasts[1]).toHaveTextContent('mockContentPositive');
    }
  },
);

it.each([
  'top-start',
  'top',
  'top-end',
  'bottom-start',
  'bottom',
  'bottom-end',
] as const)('should change placement to %s', async (placement) => {
  const toaster = toasterContraption();
  act(() => {
    toaster().setSettings({ placement });
  });
  act(() => {
    toaster().informational('mockContent', mockedOptions());
  });
  expect(screen.getByText('mockContent'));
  expect(document.querySelector('.iui-toast-wrapper')).toHaveClass(
    `iui-placement-${placement}`,
  );
});

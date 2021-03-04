// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import toaster from '.';
import { ToastCategory } from './Toast';
import { ToastOptions } from './Toaster';

const mockOnClick = jest.fn();
const mockAddToast = jest.fn();
toaster['_addHandler'](mockAddToast);

function mockedOptions(): ToastOptions {
  return {
    duration: 2000,
    hasCloseButton: true,
    type: 'temporary',
    onRemove: undefined,
    link: {
      title: 'mockTitle',
      onClick: mockOnClick,
    },
  };
}

function assertAddToast(category: ToastCategory) {
  expect(mockAddToast).toHaveBeenCalledWith({
    category: category,
    content: 'mockContent',
    duration: 2000,
    hasCloseButton: true,
    type: 'temporary',
    onRemove: undefined,
    link: {
      title: 'mockTitle',
      onClick: mockOnClick,
    },
  });
}

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  toaster['_addHandler'](() => {});
  toaster['_closeAllHandler'](() => {});
});

it('should add toast with succuss', () => {
  toaster.positive('mockContent', mockedOptions());
  assertAddToast('positive');
});

it('should add toast with negative', () => {
  toaster.negative('mockContent', mockedOptions());
  assertAddToast('negative');
});

it('should add toast with informational', () => {
  toaster.informational('mockContent', mockedOptions());
  assertAddToast('informational');
});

it('should call closeAll handler', () => {
  const mockCloseAllHandler = jest.fn();
  toaster['_closeAllHandler'](mockCloseAllHandler);

  toaster.closeAll();

  expect(mockCloseAllHandler).toHaveBeenCalled();
});

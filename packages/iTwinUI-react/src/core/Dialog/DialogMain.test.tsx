/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { DialogMain } from './DialogMain';

it('should render in its most basic state', () => {
  const { container } = render(<DialogMain isOpen>test-content</DialogMain>);

  const dialog = container.querySelector(
    '.iui-dialog.iui-dialog-visible',
  ) as HTMLElement;
  expect(dialog).toBeTruthy();
  expect(dialog).toHaveTextContent('test-content');
  expect(dialog.getAttribute('role')).toEqual('dialog');
});

it('should render full page dialog', () => {
  const { container } = render(
    <DialogMain isOpen styleType='fullPage'>
      test-content
    </DialogMain>,
  );

  const dialog = container.querySelector(
    '.iui-dialog.iui-dialog-full-page.iui-dialog-visible',
  ) as HTMLElement;
  expect(dialog).toBeTruthy();
  expect(dialog).toHaveTextContent('test-content');
  expect(dialog.getAttribute('role')).toEqual('dialog');
});

it('should render with custom style and className', () => {
  const { container } = render(
    <DialogMain isOpen style={{ color: 'red' }} className='test-class'>
      test-content
    </DialogMain>,
  );

  const dialog = container.querySelector(
    '.iui-dialog.iui-dialog-visible',
  ) as HTMLElement;
  expect(dialog).toBeTruthy();
  expect(dialog.classList.contains('test-class')).toBeTruthy();
  expect(dialog).toHaveStyle('color: red');
});

it('should close on Esc click and move focus back', () => {
  const { container: buttonContainer } = render(<button>button</button>);
  const button = buttonContainer.querySelector('button') as HTMLElement;
  button.focus();
  expect(document.activeElement).toEqual(button);

  const onClose = jest.fn();
  const { container, rerender } = render(
    <DialogMain isOpen onClose={onClose} isDismissible closeOnEsc>
      Here is my dialog content
    </DialogMain>,
  );

  const dialog = container.querySelector('.iui-dialog') as HTMLElement;
  expect(dialog).toBeTruthy();
  fireEvent.keyDown(dialog, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();
  // Focus dialog when opened
  expect(document.activeElement).toEqual(dialog);

  rerender(
    <DialogMain isOpen={false} onClose={onClose} isDismissible closeOnEsc>
      Here is my dialog content
    </DialogMain>,
  );
  // Bring back focus when dialog is closed
  expect(document.activeElement).toEqual(button);
});

it('should not close on Esc click when closeOnEsc is false', () => {
  const onClose = jest.fn();
  const { container } = render(
    <DialogMain isOpen onClose={onClose} closeOnEsc={false} isDismissible>
      Here is my dialog content
    </DialogMain>,
  );

  const dialog = container.querySelector('.iui-dialog') as HTMLElement;
  expect(dialog).toBeTruthy();
  fireEvent.keyDown(dialog, { key: 'Escape' });
  expect(onClose).not.toHaveBeenCalled();
});

it('should call onKeyDown when pressed any key inside dialog', () => {
  const onKeyDown = jest.fn();
  const { container } = render(
    <DialogMain isOpen onKeyDown={onKeyDown}>
      Here is my dialog content
    </DialogMain>,
  );

  const dialog = container.querySelector('.iui-dialog') as HTMLElement;
  expect(dialog).toBeTruthy();
  fireEvent.keyDown(dialog, {
    key: 'Enter',
  });

  expect(onKeyDown).toHaveBeenCalledWith(
    expect.objectContaining({ key: 'Enter' }),
  );
});

it('should reset body overflow on closing and unmounting', () => {
  const { rerender, unmount } = render(
    <DialogMain isOpen preventDocumentScroll>
      Here is my dialog content
    </DialogMain>,
  );
  expect(document.body.style.overflow).toEqual('hidden');

  // Closing by setting isOpen to false
  rerender(
    <DialogMain isOpen={false} preventDocumentScroll>
      Here is my dialog content
    </DialogMain>,
  );
  expect(document.body.style.overflow).not.toEqual('hidden');

  rerender(
    <DialogMain isOpen preventDocumentScroll>
      Here is my dialog content
    </DialogMain>,
  );
  expect(document.body.style.overflow).toEqual('hidden');

  // Closing by unmounting/destructing the Modal
  unmount();
  expect(document.body.style.overflow).not.toEqual('hidden');
});

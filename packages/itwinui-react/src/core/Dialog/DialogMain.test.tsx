/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DialogMain } from './DialogMain.js';
import { DialogTitleBar } from './DialogTitleBar.js';

const DOMMatrixMock = vi.fn(() => ({ m41: 0, m42: 0 }));
(window as any).DOMMatrix = DOMMatrixMock;

afterAll(() => {
  (window as any).DOMMatrix = undefined;
});

it('should render in its most basic state', () => {
  const { container } = render(<DialogMain isOpen>test-content</DialogMain>);

  const dialog = container.querySelector('.iui-dialog') as HTMLElement;
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
    '.iui-dialog.iui-dialog-full-page',
  ) as HTMLElement;
  expect(dialog).toBeTruthy();
  expect(dialog).toHaveTextContent('test-content');
  expect(dialog.getAttribute('role')).toEqual('dialog');
});

it('should render draggable dialog', () => {
  const { container } = render(
    <DialogMain isOpen isDraggable>
      test-content
    </DialogMain>,
  );

  const dialog = container.querySelector(
    '.iui-dialog.iui-dialog-draggable',
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

  const dialog = container.querySelector('.iui-dialog') as HTMLElement;
  expect(dialog).toBeTruthy();
  expect(dialog.classList.contains('test-class')).toBeTruthy();
  expect(dialog.style.color).toEqual('red');
});

it('should close on Esc click and move focus back', async () => {
  const { container: buttonContainer } = render(<button>button</button>);
  const button = buttonContainer.querySelector('button') as HTMLElement;
  button.focus();
  expect(document.activeElement).toEqual(button);

  const onClose = vi.fn();
  const { container, rerender } = render(
    <DialogMain isOpen onClose={onClose} isDismissible closeOnEsc setFocus>
      Here is my dialog content
    </DialogMain>,
  );

  const dialog = container.querySelector('.iui-dialog') as HTMLElement;
  expect(dialog).toBeTruthy();
  fireEvent.keyDown(dialog, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();
  // Focus dialog when opened
  waitFor(() => {
    expect(document.activeElement).toEqual(dialog);
  });

  rerender(
    <DialogMain
      isOpen={false}
      onClose={onClose}
      isDismissible
      closeOnEsc
      setFocus
    >
      Here is my dialog content
    </DialogMain>,
  );
  // Bring back focus when dialog is closed
  expect(document.activeElement).toEqual(button);
});

it('should not focus dialog when setFocus is false', () => {
  const { container: buttonContainer } = render(<button>button</button>);
  const button = buttonContainer.querySelector('button') as HTMLElement;
  button.focus();
  expect(document.activeElement).toEqual(button);

  const { container } = render(
    <DialogMain isOpen setFocus={false}>
      Here is my dialog content
    </DialogMain>,
  );

  const dialog = container.querySelector('.iui-dialog') as HTMLElement;
  expect(dialog).toBeTruthy();
  expect(document.activeElement).toEqual(button);
});

it('should not close on Esc click when closeOnEsc is false', () => {
  const onClose = vi.fn();
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
  const onKeyDown = vi.fn();
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

  // Closing by unmounting/destructing the dialog
  unmount();
  expect(document.body.style.overflow).not.toEqual('hidden');
});

it('should handle body overflow correctly when there is a dialog inside another dialog', () => {
  const { rerender, unmount } = render(
    <DialogMain isOpen preventDocumentScroll>
      Here is my dialog content
      <DialogMain isOpen={false} preventDocumentScroll>
        Here is my second dialog content
      </DialogMain>
    </DialogMain>,
  );
  expect(document.body.style.overflow).toEqual('hidden');

  // Open second dialog
  rerender(
    <DialogMain isOpen preventDocumentScroll>
      Here is my dialog content
      <DialogMain isOpen preventDocumentScroll>
        Here is my second dialog content
      </DialogMain>
    </DialogMain>,
  );
  expect(document.body.style.overflow).toEqual('hidden');

  // Closing second dialog by setting isOpen to false
  rerender(
    <DialogMain isOpen preventDocumentScroll>
      Here is my dialog content
      <DialogMain isOpen={false} preventDocumentScroll>
        Here is my second dialog content
      </DialogMain>
    </DialogMain>,
  );
  expect(document.body.style.overflow).toEqual('hidden');

  // Closing main dialog by unmounting/destructing it
  unmount();
  expect(document.body.style.overflow).not.toEqual('hidden');
});

it('should handle drag', () => {
  const { container } = render(
    <DialogMain isOpen isDraggable>
      <DialogTitleBar title='test title' isDraggable />
      test-content
    </DialogMain>,
  );

  const dialog = container.querySelector(
    '.iui-dialog.iui-dialog-draggable',
  ) as HTMLElement;
  expect(dialog).toBeTruthy();

  const titleBar = container.querySelector(
    '.iui-dialog-title-bar',
  ) as HTMLElement;
  expect(titleBar).toBeTruthy();
  fireEvent.pointerDown(titleBar, { clientX: 100, clientY: 100, button: 0 });
  DOMMatrixMock.mockReturnValue({ m41: 100, m42: 100 });
  fireEvent.pointerMove(titleBar, { clientX: 200, clientY: 200 });
  expect(dialog.style.transform).toBe('translate(100px, 100px)');
  fireEvent.pointerUp(titleBar);
  expect(dialog.style.transform).toBe('translate(100px, 100px)');
});

it('should not handle drag when dialog is not draggable', () => {
  const { container } = render(
    <DialogMain isOpen>
      <DialogTitleBar title='test title' />
      test-content
    </DialogMain>,
  );

  const dialog = container.querySelector('.iui-dialog') as HTMLElement;
  expect(dialog).toBeTruthy();

  const originalTransform = dialog.style.transform;

  const titleBar = container.querySelector(
    '.iui-dialog-title-bar',
  ) as HTMLElement;
  expect(titleBar).toBeTruthy();
  fireEvent.pointerDown(titleBar, { clientX: 100, clientY: 100, button: 0 });
  fireEvent.pointerMove(titleBar, { clientX: 200, clientY: 200 });
  expect(dialog.style.transform).toEqual(originalTransform);
  fireEvent.pointerUp(titleBar);
  expect(dialog.style.transform).toEqual(originalTransform);
});

it('should not add explicit size to draggable dialog', () => {
  render(
    <DialogMain isOpen isDraggable>
      <DialogTitleBar title='test title' />
      test-content
    </DialogMain>,
  );

  const dialog = screen.getByRole('dialog');
  expect(dialog.style.width).toBe('');
  expect(dialog.style.height).toBe('');
  expect(dialog.style.inlineSize).toBe('');
  expect(dialog.style.blockSize).toBe('');
});

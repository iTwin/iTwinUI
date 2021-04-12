/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { Modal, ModalProps } from './Modal';

function assertBaseElement(
  overlay: HTMLElement,
  { isDismissible = true } = {},
) {
  expect(overlay).toBeTruthy();
  const dialog = overlay.querySelector('.iui-modal-dialog') as HTMLElement;
  expect(dialog).toBeTruthy();

  const title = dialog.querySelector('.iui-modal-title-bar') as HTMLElement;
  expect(title).toBeTruthy();
  expect(title.textContent).toEqual('Modal Title');

  const closeButton = dialog.querySelector('.iui-modal-close');
  expect(!!closeButton).toBe(isDismissible);

  expect(dialog.textContent).toContain('Body');
}

function renderComponent(props?: Partial<ModalProps>) {
  return render(
    <Modal isOpen={true} title='Modal Title' {...props}>
      Body
    </Modal>,
  );
}

it('should render in basic form', () => {
  renderComponent();

  const overlay = document.querySelector(
    '.iui-modal.iui-modal-visible',
  ) as HTMLElement;
  assertBaseElement(overlay);
});

it('should not render modal when closed', () => {
  renderComponent({ isOpen: false });

  const overlay = document.querySelector('.iui-modal.iui-modal-visible');
  expect(overlay).toBeFalsy();
});

it('should close on overlay mouse down', () => {
  const onClose = jest.fn();
  renderComponent({ onClose });

  let overlay = document.querySelector(
    '.iui-modal.iui-modal-visible',
  ) as HTMLElement;
  assertBaseElement(overlay);

  fireEvent.mouseDown(overlay);
  expect(onClose).toHaveBeenCalled();
  overlay = document.querySelector(
    '.iui-modal.iui-modal-visible',
  ) as HTMLElement;
  assertBaseElement(overlay);
});

it('should not close on overlay mouse down when closeOnExternalClick is false', () => {
  const onClose = jest.fn();
  renderComponent({ onClose, closeOnExternalClick: false });

  let overlay = document.querySelector(
    '.iui-modal.iui-modal-visible',
  ) as HTMLElement;
  assertBaseElement(overlay);

  fireEvent.mouseDown(overlay);
  expect(onClose).not.toHaveBeenCalled();

  overlay = document.querySelector(
    '.iui-modal.iui-modal-visible',
  ) as HTMLElement;
  assertBaseElement(overlay);
});

it('should close on Esc click', () => {
  const onClose = jest.fn();
  renderComponent({ onClose });

  let overlay = document.querySelector(
    '.iui-modal.iui-modal-visible',
  ) as HTMLElement;
  assertBaseElement(overlay);

  fireEvent.keyDown(overlay, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();

  overlay = document.querySelector(
    '.iui-modal.iui-modal-visible',
  ) as HTMLElement;
  assertBaseElement(overlay);
});

it('should not close on Esc click when closeOnEsc is false', () => {
  const onClose = jest.fn();
  renderComponent({ onClose, closeOnEsc: false });

  let overlay = document.querySelector(
    '.iui-modal.iui-modal-visible',
  ) as HTMLElement;
  assertBaseElement(overlay);

  fireEvent.keyDown(overlay, { key: 'Escape' });
  expect(onClose).not.toHaveBeenCalled();

  overlay = document.querySelector(
    '.iui-modal.iui-modal-visible',
  ) as HTMLElement;
  assertBaseElement(overlay);
});

it('should not close when isDismissible is false', () => {
  const onClose = jest.fn();
  renderComponent({ onClose, isDismissible: false });

  let overlay = document.querySelector(
    '.iui-modal.iui-modal-visible',
  ) as HTMLElement;
  assertBaseElement(overlay, { isDismissible: false });

  fireEvent.keyDown(overlay, { key: 'Escape' });
  expect(onClose).not.toHaveBeenCalled();
  fireEvent.mouseDown(overlay);
  expect(onClose).not.toHaveBeenCalled();

  overlay = document.querySelector(
    '.iui-modal.iui-modal-visible',
  ) as HTMLElement;
  assertBaseElement(overlay, { isDismissible: false });
});

it('should call onKeyDown when pressed any key inside modal', () => {
  const onKeyDown = jest.fn();
  renderComponent({ onKeyDown });

  const overlay = document.querySelector(
    '.iui-modal.iui-modal-visible',
  ) as HTMLElement;
  assertBaseElement(overlay);

  fireEvent.keyDown(overlay, {
    key: 'Enter',
  });

  expect(onKeyDown).toHaveBeenCalledWith(
    expect.objectContaining({ key: 'Enter' }),
  );
});

it('should work with portal container properly', () => {
  renderComponent({ modalRootId: 'test-id' });

  let container = document.querySelector('body > #test-id') as HTMLElement;
  expect(container).toBeTruthy();
  expect(container.children.length).toBe(1);

  renderComponent({ modalRootId: 'test-id' });
  container = document.querySelector('body > #test-id') as HTMLElement;
  expect(container.children.length).toBe(2);
});

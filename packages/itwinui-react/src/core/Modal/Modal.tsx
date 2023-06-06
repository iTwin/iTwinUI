/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useGlobals, getDocument, useIsClient } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import '@itwin/itwinui-css/css/dialog.css';
import { Dialog } from '../Dialog/index.js';
import type { DialogMainProps } from '../Dialog/DialogMain.js';

type ModalProps = {
  /**
   * Modal title.
   */
  title: React.ReactNode;
  /**
   * Handler that is called when Modal is closed.
   */
  onClose?: (event?: React.SyntheticEvent) => void;
  /**
   * Flag whether modal is dismissible. If false, you can't close it.
   * @default true
   */
  isDismissible?: boolean;
  /**
   * Flag whether modal should be closed on background overlay press.
   * @default true
   */
  closeOnExternalClick?: boolean;
  /**
   * Flag whether modal should be closed on Escape key press.
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * Handle key press. Returns the keyboard event.
   */
  onKeyDown?: React.KeyboardEventHandler;
  /**
   * Element to render the modal into.
   * By default, a <div> in the nearest ThemeProvider will be used.
   */
  portalTo?: HTMLElement;
  /**
   * Content of the modal.
   */
  children: React.ReactNode;
} & Pick<DialogMainProps, 'isOpen' | 'styleType'>;

/**
 * Modal component which can wrap any content.
 * @example
 * <Modal
 *   isOpen={true}
 *   title='My modal'
 *   onClose={onClose}
 * >
 *   <ModalContent>
 *     Here is my modal content
 *   </ModalContent>
 *   <ModalButtonBar>
 *     <Button styleType='high-visibility'>
 *       Primary button
 *     </Button>
 *     <Button>
 *       Secondary button
 *     </Button>
 *   </ModalButtonBar>
 * </Modal>
 */
export const Modal = React.forwardRef((props, forwardedRef) => {
  const {
    isOpen = false,
    isDismissible = true,
    closeOnEsc = true,
    closeOnExternalClick = true,
    onClose,
    title,
    children,
    portalTo: portalToProp,
    ...rest
  } = props;

  const context = useGlobals();
  const isClient = useIsClient();

  const portalTo =
    portalToProp ?? context?.portalContainerRef?.current ?? getDocument()?.body;

  return isClient && portalTo ? (
    ReactDOM.createPortal(
      <Dialog
        isOpen={isOpen}
        closeOnEsc={closeOnEsc}
        closeOnExternalClick={closeOnExternalClick}
        isDismissible={isDismissible}
        onClose={onClose}
        preventDocumentScroll
        trapFocus
        setFocus
        ref={forwardedRef}
      >
        <Dialog.Backdrop />
        <Dialog.Main aria-modal {...rest}>
          <Dialog.TitleBar titleText={title} />
          {children}
        </Dialog.Main>
      </Dialog>,
      portalTo,
    )
  ) : (
    <></>
  );
}) as PolymorphicForwardRefComponent<'div', ModalProps>;

export default Modal;

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import ReactDOM from 'react-dom';
import { CommonProps, useTheme, getContainer, getDocument } from '../utils';
import '@itwin/itwinui-css/css/dialog.css';
import { Dialog, DialogMainProps } from '../Dialog';

export type ModalProps = {
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
   * Id of the root where the modal will be rendered in.
   * @default 'iui-react-portal-container'
   */
  modalRootId?: string;
  /**
   * Document where the modal will be rendered.
   * Can be specified to render in a different document (e.g. a popup window).
   * @default document
   */
  ownerDocument?: Document;
  /**
   * Content of the modal.
   */
  children: React.ReactNode;
} & Pick<DialogMainProps, 'isOpen' | 'styleType'> &
  Omit<CommonProps, 'title'>;

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
export const Modal = (props: ModalProps) => {
  const {
    isOpen = false,
    isDismissible = true,
    closeOnEsc = true,
    closeOnExternalClick = true,
    onClose,
    title,
    children,
    modalRootId = 'iui-react-portal-container',
    ownerDocument = getDocument(),
    ...rest
  } = props;

  useTheme();

  const [container, setContainer] = React.useState<HTMLElement>();
  React.useEffect(() => {
    setContainer(getContainer(modalRootId, ownerDocument));
    return () => setContainer(undefined);
  }, [ownerDocument, modalRootId]);

  return !!container ? (
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
      >
        <Dialog.Backdrop />
        <Dialog.Main aria-modal {...rest}>
          <Dialog.TitleBar titleText={title} />
          {children}
        </Dialog.Main>
      </Dialog>,
      container,
    )
  ) : (
    <></>
  );
};

export default Modal;

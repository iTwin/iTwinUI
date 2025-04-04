/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type {
  PolymorphicForwardRefComponent,
  PortalProps,
} from '../../utils/index.js';
import { Dialog } from '../Dialog/Dialog.js';
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
   * If true, the dialog will be portaled to the end of `<body>` or to the nearest popover.
   *
   * Can be set to an object with a `to` property to portal into a specific element.
   * If `to`/`to()` === `null`/`undefined`, the default behavior will be used (i.e. as if `portal` is not passed).
   *
   * @default true
   */
  portal?: PortalProps['portal'];
  /**
   * Content of the modal.
   */
  children: React.ReactNode;
  /**
   * Props for customizing the title bar element.
   */
  titleBarProps?: React.ComponentPropsWithRef<'div'>;
  /**
   * Props for customizing the dialog-wrapper element.
   */
  wrapperProps?: React.ComponentPropsWithoutRef<'div'>;
  /**
   * Props for customizing the backdrop element.
   */
  backdropProps?: React.ComponentPropsWithRef<'div'>;
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
    portal = true,
    wrapperProps,
    backdropProps,
    titleBarProps,
    ...rest
  } = props;

  return (
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
      portal={portal}
      {...wrapperProps}
    >
      <Dialog.Backdrop {...backdropProps} />
      <Dialog.Main aria-modal {...rest}>
        <Dialog.TitleBar titleText={title} {...titleBarProps} />
        {children}
      </Dialog.Main>
    </Dialog>
  );
}) as PolymorphicForwardRefComponent<'div', ModalProps>;
if (process.env.NODE_ENV === 'development') {
  Modal.displayName = 'Modal';
}

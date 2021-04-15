/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import SvgClose from '@itwin/itwinui-icons-react/cjs/icons/Close';
import { CommonProps } from '../utils/props';
import { useTheme } from '../utils/hooks/useTheme';
import '@itwin/itwinui-css/css/modal.css';

/**
 * Get the portal container, or create one if it doesn't exist.
 */
const getContainer = (containerId: string) => {
  let container = document.getElementById(containerId);
  if (container === null) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }
  return container;
};

export type ModalProps = {
  /**
   * Flag whether modal should be shown.
   * @default false
   */
  isOpen?: boolean;
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
   * Id of the modal.
   */
  id?: string;
  /**
   * Id of the root where the modal will be rendered in.
   * If nothing set, RootId will be the default value of the Portal Component.
   * @default 'iui-react-portal-container'
   */
  modalRootId?: string;
  /**
   * Content of the modal.
   */
  children: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * Modal component which can wrap any content.
 * @example
 * <Modal
 *   isOpen={true}
 *   title='My modal'
 *   onClose={onClose}
 * >
 *   <div>
 *     Here is my modal content
 *   </div>
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
    onKeyDown,
    id,
    className,
    style,
    children,
    modalRootId = 'iui-react-portal-container',
    ...rest
  } = props;

  useTheme();

  const container = getContainer(modalRootId);

  const overlayRef = React.useRef<HTMLDivElement>(null);

  const originalBodyOverflow = React.useRef('');

  // Give focus to overlay for key handling to work.
  React.useEffect(() => {
    if (isOpen) {
      overlayRef.current?.focus();
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen) {
      originalBodyOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalBodyOverflow.current;
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Prevents React from resetting its properties
    event.persist();
    if (isDismissible && closeOnEsc && event.key === 'Escape' && onClose) {
      onClose(event);
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    // Prevents React from resetting its properties
    event.persist();
    if (isDismissible && closeOnExternalClick && onClose) {
      onClose(event);
    }
  };

  return ReactDOM.createPortal(
    isOpen && (
      <div
        className={cx('iui-modal', 'iui-modal-visible', className)}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        ref={overlayRef}
        onMouseDown={handleMouseDown}
        {...rest}
      >
        <div
          className='iui-modal-dialog'
          id={id}
          style={style}
          role='dialog'
          aria-modal='true'
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className='iui-modal-title-bar'>
            <div className='iui-modal-title'>{title}</div>
            {isDismissible && (
              <div className='iui-modal-close' onClick={onClose} tabIndex={0}>
                <SvgClose />
              </div>
            )}
          </div>
          {children}
        </div>
      </div>
    ),
    container,
  );
};

export default Modal;

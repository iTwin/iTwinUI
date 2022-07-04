/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import SvgClose from '@itwin/itwinui-icons-react/cjs/icons/Close';
import {
  CommonProps,
  useTheme,
  getContainer,
  getDocument,
  FocusTrap,
} from '../utils';
import '@itwin/itwinui-css/css/dialog.css';
import '@itwin/itwinui-css/css/backdrop.css';
import { IconButton } from '../Buttons/IconButton';
import { CSSTransition } from 'react-transition-group';

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
   * Type of the modal.
   * @default 'default'
   */
  styleType?: 'default' | 'fullPage';
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
    styleType = 'default',
    modalRootId = 'iui-react-portal-container',
    ownerDocument = getDocument(),
    ...rest
  } = props;

  useTheme();

  const container = getContainer(modalRootId, ownerDocument);

  const overlayRef = React.useRef<HTMLDivElement>(null);

  const originalBodyOverflow = React.useRef('');

  const previousFocusedElement = React.useRef<HTMLElement | null>();

  // Give focus to overlay for key handling to work.
  React.useLayoutEffect(() => {
    if (isOpen) {
      previousFocusedElement.current = document.activeElement as HTMLElement;
      overlayRef.current?.focus();
    } else {
      previousFocusedElement.current?.focus();
    }
    const modalOverlayRef = overlayRef.current;
    return () => {
      modalOverlayRef?.contains(document.activeElement) &&
        previousFocusedElement.current?.focus();
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!ownerDocument) {
      return;
    }

    if (isOpen) {
      originalBodyOverflow.current = ownerDocument.body.style.overflow;
      ownerDocument.body.style.overflow = 'hidden';
    } else {
      ownerDocument.body.style.overflow = originalBodyOverflow.current;
    }
    return () => {
      ownerDocument.body.style.overflow = originalBodyOverflow.current;
    };
  }, [isOpen, ownerDocument]);

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
    if (event.target !== overlayRef.current) {
      return;
    }
    if (isDismissible && closeOnExternalClick && onClose) {
      onClose(event);
    }
  };

  return !!container ? (
    ReactDOM.createPortal(
      <>
        <div
          className={cx('iui-backdrop', { 'iui-backdrop-visible': isOpen })}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          ref={overlayRef}
          onMouseDown={handleMouseDown}
        />
        <FocusTrap>
          <div>
            <CSSTransition
              in={isOpen}
              classNames='iui-dialog-animation'
              timeout={{ exit: 600 }}
              unmountOnExit={true}
            >
              <div
                className={cx(
                  'iui-dialog',
                  { 'iui-dialog-default': styleType === 'default' },
                  { 'iui-dialog-full-page': styleType === 'fullPage' },
                  { 'iui-dialog-visible': isOpen },
                  className,
                )}
                id={id}
                style={style}
                role='dialog'
                aria-modal='true'
                {...rest}
              >
                <div className='iui-dialog-title-bar'>
                  <div className='iui-dialog-title'>{title}</div>
                  {isDismissible && (
                    <IconButton
                      size='small'
                      styleType='borderless'
                      onClick={onClose}
                      aria-label='Close'
                    >
                      <SvgClose />
                    </IconButton>
                  )}
                </div>
                {children}
              </div>
            </CSSTransition>
          </div>
        </FocusTrap>
      </>,
      container,
    )
  ) : (
    <></>
  );
};

export default Modal;

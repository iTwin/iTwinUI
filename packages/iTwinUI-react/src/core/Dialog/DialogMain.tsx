/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { FocusTrap, useLatestRef, useMergedRefs, useTheme } from '../utils';
import '@itwin/itwinui-css/css/dialog.css';
import { DialogContextProps, useDialogContext } from './DialogContext';
import { CSSTransition } from 'react-transition-group';
import { DialogDragContext } from './DialogDragContext';
import useDragAndDrop from '../utils/hooks/useDragAndDrop';

export type DialogMainProps = {
  /**
   * Type of the dialog.
   * @default 'default'
   */
  styleType?: 'default' | 'fullPage';
  /**
   * Content of the dialog.
   */
  children: React.ReactNode;
} & Omit<DialogContextProps, 'closeOnExternalClick' | 'dialogRootRef'> &
  React.ComponentPropsWithRef<'div'>;

/**
 * Dialog component which can wrap any content.
 * @example
 * <Dialog.Main>
 *   <Dialog.TitleBar>
 *     My dialog title
 *   </Dialog.TitleBar>
 *   <Dialog.Content>
 *     Here is my dialog content
 *   </Dialog.Content>
 *   <Dialog.ButtonBar>
 *     <Button styleType='high-visibility'>
 *       Primary button
 *     </Button>
 *     <Button>
 *       Secondary button
 *     </Button>
 *   </Dialog.ButtonBar>
 * </Dialog.Main>
 */
export const DialogMain = React.forwardRef<HTMLDivElement, DialogMainProps>(
  (props, ref) => {
    const dialogContext = useDialogContext();
    const {
      className,
      children,
      styleType = 'default',
      isOpen = dialogContext.isOpen,
      isDismissible = dialogContext.isDismissible,
      onClose = dialogContext.onClose,
      closeOnEsc = dialogContext.closeOnEsc,
      trapFocus = dialogContext.trapFocus,
      setFocus = dialogContext.setFocus,
      preventDocumentScroll = dialogContext.preventDocumentScroll,
      onKeyDown,
      isDraggable = dialogContext.isDraggable,
      style,
      ...rest
    } = props;

    useTheme();

    const dialogRef = React.useRef<HTMLDivElement>(null);
    const refs = useMergedRefs(dialogRef, ref);

    // Focuses dialog when opened and brings back focus to the previously focused element when closed.
    const previousFocusedElement = React.useRef<HTMLElement | null>();
    const setFocusRef = useLatestRef(setFocus);
    React.useEffect(() => {
      if (!setFocusRef.current) {
        return;
      }

      if (isOpen) {
        previousFocusedElement.current = dialogRef.current?.ownerDocument
          .activeElement as HTMLElement;
        dialogRef.current?.focus();
      } else {
        previousFocusedElement.current?.focus();
      }
      const ref = dialogRef.current;
      return () => {
        ref?.contains(document.activeElement) &&
          previousFocusedElement.current?.focus();
      };
    }, [isOpen, setFocusRef]);

    // Prevents document from scrolling when the dialog is open.
    const originalBodyOverflow = React.useRef('');
    React.useEffect(() => {
      const ownerDocument = dialogRef.current?.ownerDocument;
      if (!ownerDocument || !preventDocumentScroll) {
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
    }, [isOpen, preventDocumentScroll]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      // Prevents React from resetting its properties
      event.persist();
      if (isDismissible && closeOnEsc && event.key === 'Escape' && onClose) {
        onClose(event);
      }
      onKeyDown?.(event);
    };

    const { onPointerDown, transform } = useDragAndDrop(
      dialogRef,
      dialogContext.dialogRootRef,
    );
    const handlePointerDown = React.useCallback(
      (event: React.PointerEvent<HTMLElement>) => {
        if (isDraggable) {
          onPointerDown(event);
        }
      },
      [isDraggable, onPointerDown],
    );

    const content = (
      <div
        className={cx(
          'iui-dialog',
          {
            'iui-dialog-default': styleType === 'default',
            'iui-dialog-full-page': styleType === 'fullPage',
            'iui-dialog-visible': isOpen,
            'iui-dialog-draggable': isDraggable,
          },
          className,
        )}
        role='dialog'
        ref={refs}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        style={{
          transform,
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );

    return (
      <CSSTransition
        in={isOpen}
        classNames='iui-dialog-animation'
        timeout={{ exit: 600 }}
        unmountOnExit={true}
        nodeRef={dialogRef}
      >
        <DialogDragContext.Provider
          value={{ onPointerDown: handlePointerDown }}
        >
          {trapFocus && <FocusTrap>{content}</FocusTrap>}
          {!trapFocus && content}
        </DialogDragContext.Provider>
      </CSSTransition>
    );
  },
);

export default DialogMain;

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  FocusTrap,
  getTranslateValues,
  useLatestRef,
  Resizer,
  useMergedRefs,
  useTheme,
  useIsomorphicLayoutEffect,
} from '../utils';
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
      isResizable = dialogContext.isResizable,
      style: propStyle,
      ...rest
    } = props;

    useTheme();

    const [style, setStyle] = React.useState<React.CSSProperties>();

    const dialogRef = React.useRef<HTMLDivElement>(null);
    const refs = useMergedRefs(dialogRef, ref);
    const hasBeenResized = React.useRef(false);

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

    const originalBodyOverflow = React.useRef('');
    React.useEffect(() => {
      if (isOpen) {
        originalBodyOverflow.current = document.body.style.overflow;
      }
    }, [isOpen]);

    // Prevents document from scrolling when the dialog is open.
    React.useEffect(() => {
      const ownerDocument = dialogRef.current?.ownerDocument;
      // If there is no `ownerDocument` or `preventDocumentScroll` is false or
      // document body originally has `overflow: hidden` (possibly from other/parent dialog), then do nothing.
      if (
        !ownerDocument ||
        !preventDocumentScroll ||
        originalBodyOverflow.current === 'hidden'
      ) {
        return;
      }

      if (isOpen) {
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
      isDraggable,
    );
    const handlePointerDown = React.useCallback(
      (event: React.PointerEvent<HTMLElement>) => {
        if (isDraggable) {
          onPointerDown(event);
        }
      },
      [isDraggable, onPointerDown],
    );

    // Prevents dialog from moving when window is being resized
    useIsomorphicLayoutEffect(() => {
      if (!isDraggable || !isOpen) {
        return;
      }
      const rect = dialogRef.current?.getBoundingClientRect();
      const [translateX, translateY] = getTranslateValues(dialogRef.current);
      setStyle((oldStyle) => ({
        ...oldStyle,
        width: rect?.width,
        height: rect?.height,
        left: dialogRef.current?.offsetLeft,
        top: dialogRef.current?.offsetTop,
        transform: `translate(${translateX}px,${translateY}px)`,
      }));
    }, [isDraggable, isOpen]);

    const setResizeStyle = React.useCallback(
      (newStyle: React.CSSProperties) => {
        setStyle((oldStyle) => ({
          ...oldStyle,
          ...newStyle,
        }));
      },
      [],
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
          overflow: 'unset',
          ...style,
          ...propStyle,
        }}
        {...rest}
      >
        {isResizable && (
          <Resizer
            elementRef={dialogRef}
            containerRef={dialogContext.dialogRootRef}
            onResizeStart={() => {
              if (!hasBeenResized.current) {
                hasBeenResized.current = true;
                setResizeStyle({ maxWidth: '100%' });
              }
            }}
            onResizeEnd={setResizeStyle}
          />
        )}
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

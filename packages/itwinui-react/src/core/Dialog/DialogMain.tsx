/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import {
  FocusTrap,
  getTranslateValuesFromElement,
  Resizer,
  useMergedRefs,
  useLayoutEffect,
  Box,
  ShadowRoot,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { useDialogContext } from './DialogContext.js';
import type { DialogContextProps } from './DialogContext.js';
import { DialogDragContext } from './DialogDragContext.js';
import { useDragAndDrop } from '../../utils/hooks/useDragAndDrop.js';
import { DialogMainContext } from './DialogMainContext.js';

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
} & Omit<DialogContextProps, 'closeOnExternalClick' | 'dialogRootRef'>;

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
export const DialogMain = React.forwardRef((props, ref) => {
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
    placement = dialogContext.placement,
    ...rest
  } = props;

  const { dialogRootRef } = dialogContext;

  const dialogRef = React.useRef<HTMLDivElement>(null);
  const previousFocusedElement = React.useRef<HTMLElement | null>(null);

  const [style, setStyle] = React.useState<React.CSSProperties>();
  const hasBeenResized = React.useRef(false);

  const originalBodyOverflow = React.useRef('');
  useLayoutEffect(() => {
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
  }, [dialogRef, isOpen, preventDocumentScroll]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey) {
      return;
    }
    // Prevents React from resetting its properties
    event.persist();
    if (isDismissible && closeOnEsc && event.key === 'Escape' && onClose) {
      beforeClose();
      onClose(event);
    }
    onKeyDown?.(event);
  };

  const { onPointerDown, transform } = useDragAndDrop(
    dialogRef,
    dialogRootRef,
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
  useLayoutEffect(() => {
    if (!isDraggable || !isOpen) {
      return;
    }
    const [translateX, translateY] = getTranslateValuesFromElement(
      dialogRef.current,
    );
    setStyle((oldStyle) => ({
      ...oldStyle,
      insetInlineStart: dialogRef.current?.offsetLeft,
      insetBlockStart: dialogRef.current?.offsetTop,
      transform: `translate(${translateX}px,${translateY}px)`,
    }));
  }, [dialogRef, isDraggable, isOpen]);

  const setResizeStyle = React.useCallback((newStyle: React.CSSProperties) => {
    setStyle((oldStyle) => ({
      ...oldStyle,
      ...newStyle,
    }));
  }, []);

  /** Focuses dialog when opened. */
  const onEnter = React.useCallback(() => {
    previousFocusedElement.current = dialogRef.current?.ownerDocument
      .activeElement as HTMLElement;
    if (setFocus) {
      dialogRef.current?.focus({ preventScroll: true });
    }
  }, [setFocus]);

  /** Brings back focus to the previously focused element when closed. */
  const beforeClose = React.useCallback(() => {
    if (
      dialogRef.current?.contains(
        dialogRef.current?.ownerDocument.activeElement,
      )
    ) {
      previousFocusedElement.current?.focus();
    }
  }, [dialogRef, previousFocusedElement]);

  const mountRef = React.useCallback(
    (element: HTMLElement | null) => {
      if (element) {
        onEnter();
      }
    },
    [onEnter],
  );

  const content = (
    <Box
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
      ref={useMergedRefs(dialogRef, mountRef, ref)}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      data-iui-placement={placement}
      style={{
        transform,
        ...style,
        ...propStyle,
      }}
      {...rest}
    >
      <ShadowRoot>
        <slot />
        {isResizable && (
          <Resizer
            elementRef={dialogRef}
            containerRef={dialogRootRef}
            onResizeStart={() => {
              if (!hasBeenResized.current) {
                hasBeenResized.current = true;
                setResizeStyle({ maxInlineSize: '100%' });
              }
            }}
            onResizeEnd={setResizeStyle}
          />
        )}
      </ShadowRoot>

      {children}
    </Box>
  );

  return (
    <DialogMainContext.Provider
      value={React.useMemo(() => ({ beforeClose }), [beforeClose])}
    >
      <DialogDragContext.Provider value={{ onPointerDown: handlePointerDown }}>
        {trapFocus && <FocusTrap>{content}</FocusTrap>}
        {!trapFocus && content}
      </DialogDragContext.Provider>
    </DialogMainContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', DialogMainProps>;
if (process.env.NODE_ENV === 'development') {
  DialogMain.displayName = 'Dialog.Main';
}

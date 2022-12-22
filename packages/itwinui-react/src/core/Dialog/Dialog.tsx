/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import '@itwin/itwinui-css/css/dialog.css';
import { DialogTitleBar } from './DialogTitleBar';
import { DialogContent } from './DialogContent';
import { DialogBackdrop } from './DialogBackdrop';
import { DialogContext, DialogContextProps } from './DialogContext';
import { DialogButtonBar } from './DialogButtonBar';
import { DialogMain } from './DialogMain';
import { useMergedRefs } from '../utils';

export type DialogProps = {
  /**
   * Dialog content.
   */
  children: React.ReactNode;
} & Omit<DialogContextProps, 'dialogRootRef'> &
  React.ComponentPropsWithRef<'div'>;

/**
 * Dialog component.
 * @example
 * <Dialog
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   trapFocus
 *   preventDocumentScroll
 * >
 *   <Dialog.Backdrop />
 *   <Dialog.Main aria-modal>
 *    <Dialog.TitleBar>My dialog title</Dialog.TitleBar>
 *    <Dialog.Content>
 *      Here is my dialog content
 *    </Dialog.Content>
 *    <Dialog.ButtonBar>
 *      <Button styleType='high-visibility'>Confirm</Button>
 *      <Button>Close</Button>
 *    </Dialog.ButtonBar>
 *   </Dialog.Main>
 * </Dialog>
 */
export const Dialog = Object.assign(
  React.forwardRef(
    (props: DialogProps, ref: React.RefObject<HTMLDivElement>) => {
      const {
        children,
        trapFocus = false,
        setFocus = false,
        preventDocumentScroll = false,
        isOpen = false,
        isDismissible = true,
        closeOnEsc = true,
        closeOnExternalClick = false,
        onClose,
        isDraggable = false,
        isResizable = false,
        relativeTo = 'viewport',
        className,
        style,
        ...rest
      } = props;

      const dialogRootRef = React.useRef<HTMLDivElement>(null);
      const refs = useMergedRefs(ref, dialogRootRef);

      return (
        <DialogContext.Provider
          value={{
            isOpen,
            onClose,
            closeOnEsc,
            closeOnExternalClick,
            isDismissible,
            preventDocumentScroll,
            trapFocus,
            setFocus,
            isDraggable,
            isResizable,
            relativeTo,
            dialogRootRef,
          }}
        >
          <div
            className={cx('iui-dialog-wrapper', className)}
            data-iui-relative={relativeTo === 'container'}
            ref={refs}
            style={{
              ...style,
            }}
            {...rest}
          >
            {children}
          </div>
        </DialogContext.Provider>
      );
    },
  ),
  {
    Backdrop: DialogBackdrop,
    Main: DialogMain,
    TitleBar: DialogTitleBar,
    Content: DialogContent,
    ButtonBar: DialogButtonBar,
  },
);

export default Dialog;

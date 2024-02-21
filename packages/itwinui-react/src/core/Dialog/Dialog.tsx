/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { DialogTitleBar } from './DialogTitleBar.js';
import { DialogContent } from './DialogContent.js';
import { DialogBackdrop } from './DialogBackdrop.js';
import { DialogContext } from './DialogContext.js';
import type { DialogContextProps } from './DialogContext.js';
import { DialogButtonBar } from './DialogButtonBar.js';
import { DialogMain } from './DialogMain.js';
import { useMergedRefs, Box, Portal } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { Transition } from 'react-transition-group';

type DialogProps = {
  /**
   * Dialog content.
   */
  children: React.ReactNode;
  /**
   * By default, the dialog wrapper is always rendered regardless of `isOpen`.
   *
   * Pass `false` to avoid rendering the dialog wrapper when `isOpen=false`.
   *
   * @default true
   */
  renderWrapperWhenClosed?: boolean;
} & Omit<DialogContextProps, 'dialogRootRef'>;

const DialogComponent = React.forwardRef((props, ref) => {
  const {
    trapFocus = false,
    setFocus = false,
    preventDocumentScroll = false,
    isOpen: isOpenProp = false,
    isDismissible = true,
    closeOnEsc = true,
    closeOnExternalClick = false,
    onClose,
    isDraggable = false,
    isResizable = false,
    relativeTo = 'viewport',
    placement,
    className,
    portal = false,
    renderWrapperWhenClosed = true,
    ...rest
  } = props;

  // When user can/should see the dialog wrapper's children (e.g. when opacity!=0)
  const [
    shouldDialogWrapperChildrenBeVisible,
    setShouldDialogWrapperChildrenBeVisible,
  ] = React.useState(false);
  // Internal state for subcomponents
  const isOpen = renderWrapperWhenClosed
    ? isOpenProp
    : isOpenProp && shouldDialogWrapperChildrenBeVisible;

  const isDialogWrapperRendered =
    renderWrapperWhenClosed ||
    isOpenProp ||
    shouldDialogWrapperChildrenBeVisible;
  const dialogRootRef = React.useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRefs(ref, dialogRootRef);

  console.log('isOpen: ', {
    isDialogWrapperChildrenVisible: shouldDialogWrapperChildrenBeVisible,
    isOpenProp,
  });

  // When the user first passes `isOpenProp=true`, first render the dialog wrapper with `isOpen=false`
  // Only after the first render with isOpen=false, pass `isOpen=true` down the tree so the dialog subcomponents can do
  // the correct CSS transitions.
  React.useEffect(() => {
    if (isOpenProp) {
      setShouldDialogWrapperChildrenBeVisible(true);
    }
  }, [isOpenProp]);

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
        placement,
      }}
    >
      <Portal portal={portal}>
        {/* <Box
          className={cx('iui-dialog-wrapper', className)}
          data-iui-relative={relativeTo === 'container'}
          ref={mergedRef}
          {...rest}
        /> */}
        {isDialogWrapperRendered && (
          <Transition
            in={isOpen}
            onExited={() => setShouldDialogWrapperChildrenBeVisible(false)}
            timeout={{ enter: 0, exit: 600 }}
          >
            {(state) =>
              // <div
              //   style={
              //     {
              //       // ...defaultStyle,
              //       // ...transitionStyles[state]
              //     }
              //   }
              // >
              //   I'm A fade Transition!
              // </div>
              {
                console.log('state: ', state);

                /* <div*/
                /*   style={*/
                /*     {*/
                /*       // ...defaultStyle,*/
                /*       // ...transitionStyles[state]*/
                /*     }*/
                /*   }*/
                /* >*/
                /*   I'm A fade Transition!*/
                /* </div>*/
                // <div
                //   style={
                //     {
                //       // ...defaultStyle,
                //       // ...transitionStyles[state]
                //     }
                //   }
                // >
                //   I'm A fade Transition!
                // </div>

                // return state === 'exited' ? null : (
                //   // return !shouldShow ? null : (
                //   <Box
                //     className={cx('iui-dialog-wrapper', className)}
                //     data-iui-relative={relativeTo === 'container'}
                //     ref={mergedRef}
                //     {...rest}
                //   />
                // );
                return (
                  <Box
                    className={cx('iui-dialog-wrapper', className)}
                    data-iui-relative={relativeTo === 'container'}
                    ref={mergedRef}
                    {...rest}
                  />
                );
              }
            }
            {/* <Box
            className={cx('iui-dialog-wrapper', className)}
            data-iui-relative={relativeTo === 'container'}
            ref={mergedRef}
            {...rest}
          /> */}
          </Transition>
        )}
      </Portal>
    </DialogContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', DialogProps>;

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
export const Dialog = Object.assign(DialogComponent, {
  Backdrop: DialogBackdrop,
  Main: DialogMain,
  TitleBar: DialogTitleBar,
  Content: DialogContent,
  ButtonBar: DialogButtonBar,
});

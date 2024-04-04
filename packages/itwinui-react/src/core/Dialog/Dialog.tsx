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
import {
  Box,
  Portal,
  useControlledState,
  useMergedRefs,
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { Transition } from 'react-transition-group';

// ----------------------------------------------------------------------------

const internals = Symbol('_');

class Instance {
  [internals] = new Map();
  show() {
    this[internals].get('setIsOpen')(true);
  }
  close() {
    this[internals].get('setIsOpen')(false);
  }
}

const useInstance = () => {
  return React.useMemo(() => new Instance(), []);
};

const setupInstance = (instance: any, properties: Record<string, unknown>) => {
  if (instance?.[internals]?.created) {
    return instance;
  }

  instance ||= new Instance();

  // Copy all properties into instance internals.
  // This needs to be done here rather than inside the constructor or an instance method,
  // in order to maintain referential stability.
  for (const [key, value] of Object.entries(properties)) {
    instance[internals].set(key, value);
  }
  instance[internals].set('created', true);

  return instance;
};

// ----------------------------------------------------------------------------

type DialogProps = {
  /**
   * Dialog content.
   */
  children: React.ReactNode;
  instance?: Instance;
} & Omit<DialogContextProps, 'dialogRootRef' | 'setIsOpen'>;

const DialogComponent = React.forwardRef((props, forwardedRef) => {
  const {
    trapFocus = false,
    setFocus = false,
    preventDocumentScroll = false,
    isOpen: isOpenProp,
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
    instance: instanceProp,
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useControlledState(false, isOpenProp);
  setupInstance(instanceProp, { setIsOpen });

  const dialogRootRef = React.useRef<HTMLDivElement>(null);

  return (
    <Transition in={isOpen} timeout={{ exit: 600 }} mountOnEnter unmountOnExit>
      <DialogContext.Provider
        value={{
          isOpen,
          setIsOpen,
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
          <Box
            className={cx('iui-dialog-wrapper', className)}
            data-iui-relative={relativeTo === 'container'}
            ref={useMergedRefs(dialogRootRef, forwardedRef)}
            {...rest}
          />
        </Portal>
      </DialogContext.Provider>
    </Transition>
  );
}) as PolymorphicForwardRefComponent<'div', DialogProps>;

// ----------------------------------------------------------------------------

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
  useInstance,
});

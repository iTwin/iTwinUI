/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { useGlobals, SvgClose, mergeEventHandlers } from '../utils/index.js';
import { IconButton } from '../Buttons/index.js';
import '@itwin/itwinui-css/css/dialog.css';
import { useDialogContext } from './DialogContext.js';
import type { DialogContextProps } from './DialogContext.js';
import { DialogTitleBarTitle } from './DialogTitleBarTitle.js';
import { useDialogDragContext } from './DialogDragContext.js';

export type DialogTitleBarProps = {
  /**
   * Dialog title bar content. If passed, then `title` prop is ignored.
   */
  children?: React.ReactNode;
  /**
   * Dialog title.
   */
  titleText?: React.ReactNode;
} & Pick<DialogContextProps, 'isDismissible' | 'onClose' | 'isDraggable'> &
  React.ComponentPropsWithRef<'div'>;

/**
 * Dialog title bar. Recommended to be used as a child of `Dialog`.
 * @example
 * <Dialog.TitleBar title='My dialog title' />
 * @example
 * <Dialog.TitleBar>
 *   <Dialog.TitleBar.Title>My dialog title</Dialog.TitleBar.Title>
 *   <IconButton
 *     size='small'
 *     styleType='borderless'
 *     onClick={onClose}
 *     aria-label='Close'
 *   >
 *     <SvgClose />
 *   </IconButton>
 * </Dialog.TitleBar>
 */
export const DialogTitleBar = Object.assign(
  React.forwardRef<HTMLDivElement, DialogTitleBarProps>((props, ref) => {
    const dialogContext = useDialogContext();
    const {
      children,
      titleText,
      isDismissible = dialogContext.isDismissible,
      onClose = dialogContext.onClose,
      isDraggable = dialogContext.isDraggable,
      className,
      onPointerDown: onPointerDownProp,
      ...rest
    } = props;

    const { onPointerDown } = useDialogDragContext();

    useGlobals();

    return (
      <div
        className={cx('iui-dialog-title-bar', className, {
          'iui-dialog-title-bar-filled': isDraggable,
        })}
        ref={ref}
        onPointerDown={mergeEventHandlers(onPointerDownProp, onPointerDown)}
        {...rest}
      >
        {children ? (
          children
        ) : (
          <>
            <DialogTitleBarTitle>{titleText}</DialogTitleBarTitle>
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
          </>
        )}
      </div>
    );
  }),
  {
    Title: DialogTitleBarTitle,
  },
);

export default DialogTitleBar;

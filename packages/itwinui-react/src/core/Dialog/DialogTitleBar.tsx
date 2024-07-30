/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { SvgClose, mergeEventHandlers, Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { IconButton } from '../Buttons/IconButton.js';
import { useDialogContext } from './DialogContext.js';
import type { DialogContextProps } from './DialogContext.js';
import { DialogTitleBarTitle } from './DialogTitleBarTitle.js';
import { useDialogDragContext } from './DialogDragContext.js';

type DialogTitleBarProps = {
  /**
   * Dialog title bar content. If passed, then `title` prop is ignored.
   */
  children?: React.ReactNode;
  /**
   * Dialog title.
   */
  titleText?: React.ReactNode;
} & Pick<DialogContextProps, 'isDismissible' | 'onClose' | 'isDraggable'>;

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
  React.forwardRef((props, ref) => {
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

    return (
      <Box
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
                data-iui-shift='right'
              >
                <SvgClose />
              </IconButton>
            )}
          </>
        )}
      </Box>
    );
  }) as PolymorphicForwardRefComponent<'div', DialogTitleBarProps>,
  {
    Title: DialogTitleBarTitle,
  },
);
if (process.env.NODE_ENV === 'development') {
  DialogTitleBar.displayName = 'Dialog.TitleBar';
}

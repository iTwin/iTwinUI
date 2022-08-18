/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import SvgClose from '@itwin/itwinui-icons-react/cjs/icons/Close';
import { useTheme } from '../utils';
import { IconButton } from '../Buttons';
import '@itwin/itwinui-css/css/dialog.css';
import { DialogContextProps, useDialogContext } from './DialogContext';
import { DialogTitleBarTitle } from './DialogTitleBarTitle';

export type DialogTitleBarProps = {
  /**
   * Dialog title bar content. If passed, then `title` prop is ignored.
   */
  children?: React.ReactNode;
  /**
   * Dialog title.
   */
  titleText?: React.ReactNode;
} & Pick<DialogContextProps, 'isDismissible' | 'onClose'> &
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
      className,
      ...rest
    } = props;
    useTheme();
    return (
      <div
        className={cx('iui-dialog-title-bar', className)}
        ref={ref}
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

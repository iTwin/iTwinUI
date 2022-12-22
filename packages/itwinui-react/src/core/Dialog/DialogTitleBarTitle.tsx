/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme } from '../utils';
import '@itwin/itwinui-css/css/dialog.css';

export type DialogTitleBarTitleProps = {
  /**
   * Dialog title content.
   */
  children: React.ReactNode;
} & React.ComponentPropsWithRef<'div'>;

/**
 * Dialog title bar. Recommended to be used as a child of `Dialog`.
 * @example
 * <Dialog.TitleBar>My dialog title</Dialog.TitleBar>
 */
export const DialogTitleBarTitle = React.forwardRef<
  HTMLDivElement,
  DialogTitleBarTitleProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  useTheme();
  return (
    <div className={cx('iui-dialog-title', className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});

export default DialogTitleBarTitle;

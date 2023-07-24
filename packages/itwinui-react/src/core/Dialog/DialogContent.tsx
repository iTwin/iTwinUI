/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { supportsHas, useMergedRefs, useTheme } from '../utils/index.js';

export type DialogContentProps = {
  /**
   * Main content in the `Dialog`.
   */
  children: React.ReactNode;
} & React.ComponentPropsWithRef<'div'>;

/**
 * Container for content in `Dialog`. Recommended to be used as a child of `Dialog`.
 * @example
 * <Dialog.Content>
 *   My dialog content
 * </Dialog.Content>
 */
export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  const contentRef = React.useRef<HTMLDivElement>(null);

  useTheme();

  React.useEffect(() => {
    // firefox hack for adding data-iui-flex in absence of :has
    if (!supportsHas()) {
      const dialog = contentRef.current?.closest('[role=dialog]');
      if (dialog instanceof HTMLElement) {
        dialog.dataset.iuiFlex = 'true';
      }
    }
  }, []);

  return (
    <div
      className={cx('iui-dialog-content', className)}
      ref={useMergedRefs(contentRef, ref)}
      {...rest}
    >
      {children}
    </div>
  );
});

export default DialogContent;

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { supportsHas, useMergedRefs, Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

/**
 * Container for content in `Dialog`. Recommended to be used as a child of `Dialog`.
 * @example
 * <Dialog.Content>
 *   My dialog content
 * </Dialog.Content>
 */
export const DialogContent = React.forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const contentRef = React.useRef<HTMLDivElement>(null);

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
    <Box
      className={cx('iui-dialog-content', className)}
      ref={useMergedRefs(contentRef, ref)}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;

export default DialogContent;

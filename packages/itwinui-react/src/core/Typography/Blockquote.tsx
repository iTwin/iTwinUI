/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type BlockquoteProps = {
  /**
   * Optional footer for any attribution/source.
   */
  footer?: React.ReactNode;
};

/**
 * Basic blockquote component
 * @example
 * <Blockquote>This is a quote</Blockquote>
 * <Blockquote footer='— Someone'>
 *  <p>This is a quote from someone</p>
 * </Blockquote>
 */
export const Blockquote = React.forwardRef((props, ref) => {
  const { className, children, footer, ...rest } = props;

  return (
    <Box
      as='blockquote'
      className={cx('iui-blockquote', className)}
      ref={ref}
      {...rest}
    >
      {children}
      {footer && <footer>{footer}</footer>}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'blockquote', BlockquoteProps>;
if (process.env.NODE_ENV === 'development') {
  Blockquote.displayName = 'Blockquote';
}

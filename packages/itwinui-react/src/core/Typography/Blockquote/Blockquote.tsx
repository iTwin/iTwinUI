/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useTheme } from '../../utils';
import '@itwin/itwinui-css/css/blockquote.css';

export type BlockquoteProps = {
  /**
   * Optional footer for any attribution/source.
   */
  footer?: React.ReactNode;
} & React.BlockquoteHTMLAttributes<HTMLQuoteElement>;

/**
 * Basic blockquote component
 * @example
 * <Blockquote>This is a quote</Blockquote>
 * <Blockquote footer='— Someone'>
 *  <p>This is a quote from someone</p>
 * </Blockquote>
 */
export const Blockquote = React.forwardRef(
  (props: BlockquoteProps, ref: React.RefObject<HTMLQuoteElement>) => {
    const { className, children, footer, ...rest } = props;

    useTheme();

    return (
      <blockquote
        className={cx('iui-blockquote', className)}
        ref={ref}
        {...rest}
      >
        {children}
        {footer && <footer>{footer}</footer>}
      </blockquote>
    );
  },
);

export default Blockquote;

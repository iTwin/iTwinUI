/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useTheme, CommonProps } from '../../utils';
import '@itwin/itwinui-css/css/code.css';

export type CodeProps = {
  /**
   * A piece of inline code.
   */
  children: React.ReactNode;
} & CommonProps;

/**
 * Inline code element.
 * @example
 * <p>Some <Code>inline code</Code> in a paragraph</p>
 */
export const Code = (props: CodeProps) => {
  const { className, children, ...rest } = props;

  useTheme();

  return (
    <code className={cx('iui-code', className)} {...rest}>
      {children}
    </code>
  );
};

export default Code;

// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import '@bentley/itwinui/css/code.css';
import cx from 'classnames';
import React from 'react';
import { CommonProps } from '../../utils/props';

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
export const Code: React.FC<CodeProps> = (props) => {
  const { className, children, ...rest } = props;
  return (
    <code className={cx('iui-code', className)} {...rest}>
      {children}
    </code>
  );
};

export default Code;

// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import cx from 'classnames';
import React from 'react';
import { useTheme } from '../../utils/hooks/useTheme';
import { CommonProps } from '../../utils/props';
import '@bentley/itwinui/css/code.css';

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

  useTheme();

  return (
    <code className={cx('iui-code', className)} {...rest}>
      {children}
    </code>
  );
};

export default Code;

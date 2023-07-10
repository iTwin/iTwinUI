/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { useMergedRefs, Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

export type InputProps = {
  /**
   * Set focus on input element.
   * @default false
   */
  setFocus?: boolean;
  /**
   * Modify size of the input.
   */
  size?: 'small' | 'large';
  /**
   * Status of input.
   */
  status?: 'positive' | 'warning' | 'negative';
};

/**
 * Basic input component
 * @example
 * <Input setFocus />
 * <Input disabled />
 * <Input size='small' />
 */
export const Input = React.forwardRef((props, ref) => {
  const { setFocus = false, size, className, status, ...rest } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const refs = useMergedRefs<HTMLInputElement>(inputRef, ref);

  React.useEffect(() => {
    if (inputRef.current && setFocus) {
      inputRef.current.focus();
    }
  }, [setFocus]);

  return (
    <Box
      as='input'
      className={cx('iui-input', { 'iui-input-status': !!status }, className)}
      data-iui-size={size}
      data-iui-status={status}
      ref={refs}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'input', InputProps>;

export default Input;

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
   * Modify size of the input.
   */
  localSize?: 'small' | 'large';
};

/**
 * Basic input component
 * @example
 * <Input setFocus />
 * <Input disabled />
 * <Input localSize='small' />
 */
export const Input = React.forwardRef((props, ref) => {
  const { localSize, className, ...rest } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const refs = useMergedRefs<HTMLInputElement>(inputRef, ref);

  return (
    <Box
      as='input'
      className={cx('iui-input', className)}
      data-iui-size={localSize}
      ref={refs}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'input', InputProps>;

export default Input;

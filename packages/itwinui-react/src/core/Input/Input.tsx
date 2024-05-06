/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { useMergedRefs, Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

export type InputProps = {
  /**
   * Modify size of the input.
   */
  size?: 'small' | 'large';
  /**
   * Status of input.
   */
  status?: 'positive' | 'warning' | 'negative';
  /**
   * Modify the native `size` attribute of the `<input>` element.
   * The `width` or `inline-size` property must be unset in order to use this prop.
   */
  htmlSize?: number;
};

/**
 * Basic input component
 * @example
 * <Input disabled />
 * <Input size='small' />
 */
export const Input = React.forwardRef((props, ref) => {
  const { size, htmlSize, status, className, ...rest } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const refs = useMergedRefs<HTMLInputElement>(inputRef, ref);

  return (
    <Box
      as='input'
      className={cx('iui-input', 'iui-field', className)}
      data-iui-size={size}
      data-iui-status={status}
      size={htmlSize}
      ref={refs}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'input', InputProps>;

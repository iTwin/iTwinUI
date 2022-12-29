/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useMergedRefs, useTheme } from '../utils';
import '@itwin/itwinui-css/css/input.css';

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
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

/**
 * Basic input component
 * @example
 * <Input setFocus />
 * <Input disabled />
 * <Input size='small' />
 */
export const Input = React.forwardRef(
  (props: InputProps, ref: React.RefObject<HTMLInputElement>) => {
    const { setFocus = false, size, className, ...rest } = props;
    useTheme();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const refs = useMergedRefs<HTMLInputElement>(inputRef, ref);

    React.useEffect(() => {
      if (inputRef.current && setFocus) {
        inputRef.current.focus();
      }
    }, [setFocus]);

    return (
      <input
        className={cx('iui-input', className)}
        data-iui-size={size}
        ref={refs}
        {...rest}
      />
    );
  },
);

export default Input;

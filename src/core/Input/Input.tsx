/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useMergedRefs } from '../utils/hooks/useMergedRefs';
import { useTheme } from '../utils/hooks/useTheme';
import '@bentley/itwinui/css/inputs.css';

export type InputProps = {
  /**
   * Set focus on input element.
   * @default false
   */
  setFocus?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Basic input component
 * @example
 * <Input setFocus />
 * <Input disabled />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { setFocus = false, className, ...rest } = props;
    useTheme();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const refs = useMergedRefs<HTMLInputElement>(inputRef, ref);

    React.useEffect(() => {
      if (inputRef.current && setFocus) {
        inputRef.current.focus();
      }
    }, [setFocus]);

    return (
      <input className={cx('iui-input', className)} ref={refs} {...rest} />
    );
  },
);

export default Input;

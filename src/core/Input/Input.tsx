import '@bentley/itwinui/css/inputs.css';
import cx from 'classnames';
import React from 'react';
import { useRefs } from '../utils/hooks/useRefs';

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
    const inputRef = React.useRef<HTMLInputElement>(null);
    const refs = useRefs<HTMLInputElement>(inputRef, ref);

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

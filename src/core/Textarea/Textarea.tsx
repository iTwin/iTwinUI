// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import '@bentley/itwinui/css/inputs.css';
import cx from 'classnames';
import React from 'react';

import { useRefs } from '../utils/hooks/useRefs';
import { useTheme } from '../utils/hooks/useTheme';

export type TextareaProps = {
  /**
   * Set focus on textarea element.
   * @default false
   */
  setFocus?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * Basic textarea component
 * @example
 * <Textarea setFocus={true} placeholder='This is a textarea' />
 * <Textarea disabled={true} placeholder='This is a disabled textarea' />
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { className, rows = 3, setFocus = false, ...rest } = props;

    useTheme();

    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
    const refs = useRefs<HTMLTextAreaElement>(ref, textAreaRef);

    React.useEffect(() => {
      if (textAreaRef.current && setFocus) {
        textAreaRef.current.focus();
      }
    }, [setFocus]);

    return (
      <textarea
        className={cx('iui-textarea', className)}
        rows={rows}
        ref={refs}
        {...rest}
      />
    );
  },
);

export default Textarea;

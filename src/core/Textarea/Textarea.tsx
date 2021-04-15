/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';

import { useMergedRefs } from '../utils/hooks/useMergedRefs';
import { useTheme } from '../utils/hooks/useTheme';
import '@itwin/itwinui-css/css/inputs.css';

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
    const refs = useMergedRefs<HTMLTextAreaElement>(ref, textAreaRef);

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

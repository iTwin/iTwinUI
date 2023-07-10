/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { useMergedRefs, Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

export type TextareaProps = {
  /**
   * Set focus on textarea element.
   * @default false
   */
  setFocus?: boolean;
  /**
   * Status of textarea.
   */
  status?: 'positive' | 'warning' | 'negative';
};

/**
 * Basic textarea component
 * @example
 * <Textarea setFocus={true} placeholder='This is a textarea' />
 * <Textarea disabled={true} placeholder='This is a disabled textarea' />
 */
export const Textarea = React.forwardRef((props, ref) => {
  const { className, rows = 3, setFocus = false, status, ...rest } = props;

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const refs = useMergedRefs<HTMLTextAreaElement>(ref, textAreaRef);

  React.useEffect(() => {
    if (textAreaRef.current && setFocus) {
      textAreaRef.current.focus();
    }
  }, [setFocus]);

  return (
    <Box
      as='textarea'
      className={cx('iui-input', { 'iui-input-status': !!status }, className)}
      data-iui-status={status}
      rows={rows}
      ref={refs}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'textarea', TextareaProps>;

export default Textarea;

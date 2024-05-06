/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Input } from '../Input/Input.js';

export type TextareaProps = {
  /**
   * Status of textarea.
   */
  status?: 'positive' | 'warning' | 'negative';
};

/**
 * Basic textarea component
 * @example
 * <Textarea placeholder='This is a textarea' />
 * <Textarea disabled={true} placeholder='This is a disabled textarea' />
 */
export const Textarea = React.forwardRef((props, forwardedRef) => {
  return <Input as='textarea' rows={3} ref={forwardedRef} {...props} />;
}) as PolymorphicForwardRefComponent<'textarea', TextareaProps>;

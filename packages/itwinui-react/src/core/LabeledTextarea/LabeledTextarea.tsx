/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Icon } from '../Icon/Icon.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import type { LabeledInputProps } from '../LabeledInput/LabeledInput.js';
import { InputGrid } from '../InputGrid/InputGrid.js';
import { LabeledInput } from '../LabeledInput/LabeledInput.js';

type LabeledTextareaProps = {
  /**
   * Label for the textarea.
   */
  label: React.ReactNode;
  /**
   * Message below the textarea. Does not apply to 'inline' textarea.
   */
  message?: React.ReactNode;
  /**
   * Status of text area.
   */
  status?: 'positive' | 'warning' | 'negative';
  /**
   * Pass props to wrapper element.
   */
  wrapperProps?: React.ComponentProps<typeof InputGrid>;
  /**
   * Passes properties for label.
   */
  labelProps?: React.ComponentProps<'label'>;
  /**
   * Passes properties for message content.
   */
  messageContentProps?: React.ComponentPropsWithRef<'div'>;
  /**
   * Passes properties for svgIcon.
   */
  iconProps?: React.ComponentProps<typeof Icon>;
} & Pick<LabeledInputProps, 'svgIcon' | 'displayStyle'>;

/**
 * Textarea wrapper that allows for additional styling and labelling
 * @example
 * <LabeledTextarea
 *  label='Textarea Label'
 *  message='Help Message'
 *  placeholder='This is a textarea'
 * />
 * <LabeledTextarea
 *  label='Disabled Textarea Label'
 *  message='Help Message'
 *  placeholder='This is a textarea'
 *  disabled={true}
 * />
 * <LabeledTextarea
 *  label='Textarea Label'
 *  message='Negative Message'
 *  placeholder='This is a textarea'
 *  status='negative'
 * />
 */
export const LabeledTextarea = React.forwardRef((props, forwardedRef) => {
  return (
    // ref types don't match but it's internal, so ts-ignore is ok here
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <LabeledInput as='textarea' rows={3} ref={forwardedRef} {...props} />
  );
}) as PolymorphicForwardRefComponent<'textarea', LabeledTextareaProps>;
if (process.env.NODE_ENV === 'development') {
  LabeledTextarea.displayName = 'LabeledTextarea';
}
